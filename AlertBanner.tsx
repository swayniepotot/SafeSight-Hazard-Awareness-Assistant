import React, { useEffect } from 'react';
import { Hazard, HazardType, Severity } from '../types';
import { AlertTriangle, Flame, ShieldAlert, Scissors, Activity, Hand, Repeat } from 'lucide-react';

interface AlertBannerProps {
  currentHazard: Hazard | null;
  highContrast: boolean;
  audioEnabled: boolean;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ currentHazard, highContrast, audioEnabled }) => {
  
  useEffect(() => {
    if (currentHazard && audioEnabled) {
      // Basic text-to-speech for accessibility
      const utterance = new SpeechSynthesisUtterance(`Warning: ${currentHazard.description}`);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.cancel(); // Stop previous
      window.speechSynthesis.speak(utterance);
    }
  }, [currentHazard, audioEnabled]);

  if (!currentHazard) return null;

  const getIcon = (type: HazardType) => {
    switch (type) {
      case HazardType.THERMAL: return <Flame className="w-16 h-16 animate-pulse" />;
      case HazardType.SHARP: return <Scissors className="w-16 h-16" />;
      case HazardType.SELF_HARM: return <Activity className="w-16 h-16" />;
      case HazardType.PRESSURE: return <Hand className="w-16 h-16 animate-pulse" />;
      case HazardType.REPETITIVE: return <Repeat className="w-16 h-16 animate-spin-slow" />;
      default: return <AlertTriangle className="w-16 h-16" />;
    }
  };

  const getColors = (severity: Severity) => {
    if (highContrast) {
      return 'bg-white text-black border-4 border-black';
    }
    switch (severity) {
      case Severity.HIGH: return 'bg-danger-red text-white animate-pulse-fast';
      case Severity.MEDIUM: return 'bg-warning-yellow text-black';
      default: return 'bg-blue-600 text-white';
    }
  };

  const getTitle = (type: HazardType) => {
    switch(type) {
        case HazardType.SELF_HARM: return 'INJURY RISK';
        case HazardType.PRESSURE: return 'EXCESSIVE FORCE';
        case HazardType.REPETITIVE: return 'REPETITIVE MOTION';
        default: return 'HAZARD DETECTED';
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 p-6 shadow-2xl flex flex-col items-center justify-center text-center ${getColors(currentHazard.severity)}`}>
      <div className="flex items-center gap-4 mb-2">
        {getIcon(currentHazard.type)}
        <h2 className="text-4xl font-black uppercase tracking-widest">
          {getTitle(currentHazard.type)}
        </h2>
        {getIcon(currentHazard.type)}
      </div>
      <p className="text-2xl font-bold md:text-3xl max-w-2xl">
        {currentHazard.description}
      </p>
    </div>
  );
};

export default AlertBanner;