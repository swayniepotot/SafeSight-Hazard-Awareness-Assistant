import React, { useState, useCallback, useRef } from 'react';
import { AppSettings, Hazard, HazardType, Severity, DetectionResponse } from './types';
import CameraFeed from './components/CameraFeed';
import AlertBanner from './components/AlertBanner';
import SafetyLog from './components/SafetyLog';
import ControlPanel from './components/ControlPanel';
import { analyzeFrameForHazards } from './services/geminiService';
import { ShieldCheck, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    highContrast: false,
    audioAlerts: true,
    monitoringActive: true,
    detectionInterval: 2500, // Check every 2.5 seconds
  });

  const [currentHazard, setCurrentHazard] = useState<Hazard | null>(null);
  const [hazardHistory, setHazardHistory] = useState<Hazard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Audio queue ref to prevent overlapping too much
  const lastAudioTime = useRef<number>(0);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleFrameCapture = useCallback(async (base64Image: string) => {
    if (isProcessing) return; // Drop frame if still processing previous
    setIsProcessing(true);

    try {
      const result: DetectionResponse = await analyzeFrameForHazards(base64Image);

      if (!result.isSafe && result.hazards.length > 0) {
        // Find highest severity hazard
        const priorityOrder = { [Severity.HIGH]: 3, [Severity.MEDIUM]: 2, [Severity.LOW]: 1, [Severity.SAFE]: 0 };
        const topHazard = result.hazards.reduce((prev, current) => {
           // Safely map string severity to enum or default to LOW
           const currentSev = (current.severity as Severity) || Severity.LOW;
           const prevSev = (prev.severity as Severity) || Severity.LOW;
           return priorityOrder[currentSev] > priorityOrder[prevSev] ? current : prev;
        });

        const newHazard: Hazard = {
          id: Date.now().toString(),
          type: topHazard.type as HazardType || HazardType.NONE,
          severity: topHazard.severity as Severity || Severity.LOW,
          description: topHazard.description,
          timestamp: Date.now(),
        };

        setCurrentHazard(newHazard);
        setHazardHistory(prev => [newHazard, ...prev].slice(0, 50)); // Keep last 50
      } else {
        // If safe, clear current hazard after a small delay to avoid flickering
        // Or keep it for a few seconds? Let's clear it if strictly safe.
        // To make it less jittery, we only clear if it was previously set.
        if (currentHazard) {
            // Optional: debounce this clearing in a real app
            const timeSinceLastHazard = Date.now() - currentHazard.timestamp;
            if (timeSinceLastHazard > 3000) {
                setCurrentHazard(null);
            }
        }
      }
    } catch (e) {
      console.error("Processing error", e);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, currentHazard]);

  return (
    <div className={`min-h-screen flex flex-col ${settings.highContrast ? 'bg-black' : 'bg-gray-950'} transition-colors duration-300`}>
      {/* Alert Overlay */}
      <AlertBanner 
        currentHazard={currentHazard} 
        highContrast={settings.highContrast} 
        audioEnabled={settings.audioAlerts} 
      />

      {/* Header */}
      <header className="flex-none p-4 flex justify-between items-center border-b border-gray-800 bg-gray-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`font-bold text-xl tracking-wide ${settings.highContrast ? 'text-white' : 'text-gray-100'}`}>
              SafeSight
            </h1>
            <p className="text-xs text-gray-400 font-mono">Hazard Awareness Assistant</p>
          </div>
        </div>
        
        {/* Connection Status Indicator */}
        <div className="flex items-center gap-2">
            <BrainCircuit className={`w-5 h-5 ${isProcessing ? 'text-green-400 animate-pulse' : 'text-gray-600'}`} />
            <span className="text-xs font-mono text-gray-500 hidden sm:block">
                NEURAL ENGINE {isProcessing ? 'ANALYZING' : 'IDLE'}
            </span>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        
        {/* Left Column: Camera Feed (Takes up 2/3 space on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-[50vh]">
          <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800">
             <CameraFeed 
               isActive={settings.monitoringActive} 
               onFrameCapture={handleFrameCapture}
               intervalMs={settings.detectionInterval}
             />
             
             {/* Simulated Thermal Overlay UI elements (visual fluff) */}
             <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay"></div>
             
             {/* Safe state indicator if no hazard */}
             {!currentHazard && settings.monitoringActive && (
               <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-green-900/80 text-green-200 px-4 py-2 rounded-lg backdrop-blur border border-green-500/30">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="font-bold tracking-widest text-sm">ENVIRONMENT SAFE</span>
               </div>
             )}
          </div>

          <ControlPanel 
            settings={settings} 
            updateSettings={updateSettings} 
            isLoading={isProcessing}
          />
        </div>

        {/* Right Column: Safety Log */}
        <div className={`rounded-2xl overflow-hidden flex flex-col shadow-xl border border-gray-800 ${settings.highContrast ? 'bg-black' : 'bg-gray-900'}`}>
           <div className="p-4 border-b border-gray-800 bg-gray-800/50">
             <h2 className="font-bold text-gray-300 flex items-center gap-2">
               <BrainCircuit className="w-4 h-4" />
               DETECTION LOG
             </h2>
           </div>
           <SafetyLog history={hazardHistory} highContrast={settings.highContrast} />
        </div>
      </main>
    </div>
  );
};

export default App;