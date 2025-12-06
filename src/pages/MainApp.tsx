/**
 * MainApp.tsx
 * Main application component: sets up the main app.
 */

import React, { useState, useCallback, useRef } from 'react';
import { AppSettings, Hazard, HazardType, Severity, DetectionResponse } from '../types';
import CameraFeed from '../../components/CameraFeed';
import SafetyLog from '../../components/SafetyLog';
import ControlPanel from '../../components/ControlPanel';
import { analyzeFrameForHazards } from '../../services/geminiService';
import { ShieldCheck, BrainCircuit } from 'lucide-react';

const MainApp: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    highContrast: false,
    audioAlerts: true,
    monitoringActive: true,
    detectionInterval: 1500,
  });

  const [currentHazard, setCurrentHazard] = useState<Hazard | null>(null);
  const [hazardHistory, setHazardHistory] = useState<Hazard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleFrameCapture = useCallback(async (base64Image: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const result: DetectionResponse = await analyzeFrameForHazards(base64Image);

      if (!result.isSafe && result.hazards.length > 0) {
        const priorityOrder = { [Severity.HIGH]: 3, [Severity.MEDIUM]: 2, [Severity.LOW]: 1, [Severity.SAFE]: 0 };
        const topHazard = result.hazards.reduce((prev, current) => {
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
        setHazardHistory(prev => [newHazard, ...prev].slice(0, 50));
      } else {
        if (currentHazard) {
          const timeSinceLastHazard = Date.now() - currentHazard.timestamp;
          if (timeSinceLastHazard > 3000) setCurrentHazard(null);
        }
      }
    } catch (e) {
      console.error("Processing error", e);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, currentHazard]);

  return (
    <div className={`flex flex-col h-full min-h-[calc(100vh-4rem)] ${settings.highContrast ? 'bg-black' : 'bg-gray-950'} transition-colors duration-300`}>
      
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

        <div className="flex items-center gap-2">
          <BrainCircuit className={`w-5 h-5 ${isProcessing ? 'text-green-400 animate-pulse' : 'text-gray-600'}`} />
          <span className="text-xs font-mono text-gray-500 hidden sm:block">
            NEURAL ENGINE {isProcessing ? 'ANALYZING' : 'IDLE'}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex gap-6 p-4">
        
        {/* Left Column: Camera + Controls */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Camera */}
          <div className="flex-none relative rounded-2xl shadow-2xl border-2 border-gray-800 overflow-hidden" style={{ height: '110vh', minHeight: '300px', maxHeight: '500px' }}>
            <CameraFeed 
              isActive={settings.monitoringActive} 
              onFrameCapture={handleFrameCapture} 
              intervalMs={settings.detectionInterval} 
            />

            {!currentHazard && settings.monitoringActive && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-green-900/80 text-green-200 px-4 py-2 rounded-lg backdrop-blur border border-green-500/30">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold tracking-widest text-sm">ENVIRONMENT SAFE</span>
              </div>
            )}
          </div>

          {/* Buttons below camera */}
          <div className="flex-none mt-2">
            <ControlPanel settings={settings} updateSettings={updateSettings} isLoading={isProcessing} />
          </div>
        </div>

        {/* Right Column: Safety Log */}
        <div className="w-96 flex flex-col rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-800/50">
            <h2 className="font-bold text-gray-300 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              DETECTION LOG
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(50vh + 60px)' }}>
            <SafetyLog history={hazardHistory} highContrast={settings.highContrast} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainApp;