import React, { useEffect } from 'react';
import { Hazard, HazardType, Severity } from '../types';
import { AlertTriangle, Flame, ShieldAlert, Scissors, Activity, Hand, Repeat } from 'lucide-react';

interface AlertBannerProps {
  currentHazard: Hazard | null;
  highContrast: boolean;
  audioEnabled: boolean;
}

// AlertBanner
const AlertBanner: React.FC<AlertBannerProps> = ({ currentHazard, highContrast, audioEnabled }) => {
  
  // Trigger text-to-speech whenever a new hazard is detected
  useEffect(() => {
    if (currentHazard && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(`Warning: ${currentHazard.description}`);
      utterance.rate = 1.1; // Slightly faster than default for urgency
      utterance.pitch = 1.0; // Neutral pitch
      window.speechSynthesis.speak(utterance); // Queue speech (do not cancel previous)
    }
  }, [currentHazard, audioEnabled]);

  // If there is no hazard, do not render the banner
  if (!currentHazard) return null;

  /** Returns the icon associated with the hazard type */
  const getIcon = (type: HazardType) => {
    const sizeClass = "w-16 h-16"; // Standardize icon size
    switch (type) {
      case HazardType.THERMAL: return <Flame className={`${sizeClass} animate-pulse`} />;
      case HazardType.SHARP: return <Scissors className={sizeClass} />;
      case HazardType.SELF_HARM: return <Activity className={sizeClass} />;
      case HazardType.PRESSURE: return <Hand className={`${sizeClass} animate-pulse`} />;
      case HazardType.REPETITIVE: return <Repeat className={`${sizeClass} animate-spin-slow`} />;
      default: return <AlertTriangle className={sizeClass} />;
    }
  };

  /** Returns CSS classes based on severity and high contrast mode */
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

  /** Returns a readable title for the hazard */
  const getTitle = (type: HazardType) => {
    switch(type) {
      case HazardType.SELF_HARM: return 'INJURY RISK';
      case HazardType.PRESSURE: return 'EXCESSIVE FORCE';
      case HazardType.REPETITIVE: return 'REPETITIVE MOTION';
      case HazardType.SHARP: return 'SHARP OBJECT';
      case HazardType.THERMAL: return 'HOT SURFACE';
      default: return 'HAZARD DETECTED';
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 p-6 shadow-2xl flex flex-col items-center justify-center text-center ${getColors(currentHazard.severity)}`}
      role="alert" // Accessibility: announce alerts
      aria-live="assertive" // Screen readers will read immediately
    >
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
