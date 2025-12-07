# SafeSight Hazard Awareness Assistant

SafeSight is an AI-powered hazard monitoring application designed to help individuals with **Congenital Insensitivity to Pain (CIP)** stay safe in their environment. Using real-time webcam analysis and AI detection, SafeSight alerts users to environmental and behavioral hazards that might otherwise go unnoticed.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-time hazard detection**: Monitors for thermal, sharp, pressure, repetitive, self-harm, and fall-risk hazards.
- **Behavioral analysis**: Detects risky actions like excessive force, repetitive scratching, or contact with hot surfaces.
- **Audio alerts**: Immediate text-to-speech notifications for detected hazards.
- **Dashboard and logs**: View current hazards and history of detected events.
- **Responsive UI**: Works on both desktop and mobile devices.

---

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router
- **AI Integration**: Google Gemini AI API
- **Build Tools**: Vite
- **Deployment**: Vercel


Project Structure
.
├── components/       # React components (CameraFeed, ControlPanel, SafetyLog, etc.)
├── pages/            # Page components (App.tsx, Home.tsx, Contact.tsx, MainApp.tsx)
├── services/         # AI service integrations (geminiService.ts)
├── src/              # Main source folder
├── assets/           # Images, logos, static assets
├── index.html        # Entry HTML
├── index.tsx         # React entry point
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
├── .env              # Environment variables
├── package.json
└── README.md


License

© 2025 SafeSight
