import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResponse } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

// Define schema for structured JSON output
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    hazards: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            description: "One of: THERMAL, SHARP, SELF_HARM, PRESSURE, REPETITIVE, FALL_RISK, NONE"
          },
          severity: {
            type: Type.STRING,
            description: "One of: HIGH, MEDIUM, LOW"
          },
          description: {
            type: Type.STRING,
            description: "Short, clear description of the hazard for accessibility."
          }
        },
        required: ["type", "severity", "description"]
      }
    },
    isSafe: {
      type: Type.BOOLEAN,
      description: "True if no immediate threats are detected."
    }
  },
  required: ["hazards", "isSafe"]
};

export const analyzeFrameForHazards = async (base64Image: string): Promise<DetectionResponse> => {
  if (!apiKey) {
    console.error("No API Key found");
    return { hazards: [], isSafe: true };
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this image as a safety assistant for a user with Congenital Insensitivity to Pain (CIP). 
            They cannot feel heat, cuts, or pain, leading to unintentional injury.
            
            Detect the following specific categories:

            1. THERMAL (Environmental & Behavioral): 
               - Fire, boiling water, hot stoves.
               - *Crucial:* Is the user touching/holding something hot (e.g., hot cup, lightbulb, leaning on radiator) without reaction?

            2. SHARP: Knives, broken glass, exposed nails.

            3. PRESSURE (Force Detection):
               - Look for "white knuckles" or skin deformation.
               - Excessive squeezing of objects (glass, pens).
               - Banging hands/limbs against hard surfaces.

            4. REPETITIVE (Compulsive Behaviors):
               - Excessive scratching or rubbing of skin/eyes.
               - Repetitive picking at scabs or injuries.
               - Constant tapping or rubbing that could cause abrasion.

            5. SELF_HARM (Overt):
               - Biting lips, tongue, or inside of cheeks (oral self-injury).
               - Chewing on fingers/hands.
               - Visible wounds/bleeding that the user is ignoring.

            6. FALL_RISK: Trip hazards.

            If unsure, assume SAFE unless a specific hazard matches.
            For "Behavioral" risks (User touching fire/sharp/pressure), mark Severity as HIGH.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a guardian system for someone who feels no pain. Be extremely sensitive to behavioral indicators like grip strength (pressure), repetitive scratching, and thermal contact. Immediate feedback on physical interaction is critical.",
      }
    });

    const text = response.text;
    if (!text) return { hazards: [], isSafe: true };

    const data = JSON.parse(text) as DetectionResponse;
    return data;

  } catch (error) {
    console.error("Gemini Detection Error:", error);
    return { hazards: [], isSafe: true };
  }
};