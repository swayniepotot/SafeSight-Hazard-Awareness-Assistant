import React from 'react';
import { Volume2, VolumeX, Eye, Power, Activity } from 'lucide-react';
import { AppSettings } from '../src/types';

interface ControlPanelProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, updateSettings, isLoading }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <button
        onClick={() => updateSettings({ monitoringActive: !settings.monitoringActive })}
        className={`col-span-2 md:col-span-1 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all font-bold ${
          settings.monitoringActive 
            ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
            : 'bg-green-600 text-white'
        }`}
      >
        <Power className="w-8 h-8" />
        {settings.monitoringActive ? 'STOP MONITORING' : 'START MONITORING'}
      </button>

      <button
        onClick={() => updateSettings({ audioAlerts: !settings.audioAlerts })}
        className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
          settings.audioAlerts ? 'bg-gray-700 text-blue-400' : 'bg-gray-800 text-gray-500'
        }`}
      >
        {settings.audioAlerts ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        <span className="text-xs font-bold uppercase">Audio Alerts</span>
      </button>

      <button
        onClick={() => updateSettings({ highContrast: !settings.highContrast })}
        className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
          settings.highContrast ? 'bg-white text-black border-4 border-black' : 'bg-gray-800 text-gray-300'
        }`}
      >
        <Eye className="w-6 h-6" />
        <span className="text-xs font-bold uppercase">High Contrast</span>
      </button>

      <div className="p-4 rounded-xl bg-gray-800 flex flex-col items-center justify-center gap-2 text-gray-400">
        <Activity className={`w-6 h-6 ${isLoading ? 'animate-spin text-green-400' : ''}`} />
        <span className="text-xs font-bold uppercase">AI Status: {isLoading ? 'Processing' : 'Standby'}</span>
      </div>
    </div>
  );
};

export default ControlPanel;