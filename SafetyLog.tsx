import React from 'react';
import { Hazard, HazardType } from '../types';
import { Clock, AlertTriangle, CheckCircle, Hand, Repeat, Activity } from 'lucide-react';

interface SafetyLogProps {
  history: Hazard[];
  highContrast: boolean;
}

const SafetyLog: React.FC<SafetyLogProps> = ({ history, highContrast }) => {
  if (history.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-full text-center p-8 opacity-50 ${highContrast ? 'text-white' : 'text-gray-400'}`}>
        <CheckCircle className="w-12 h-12 mb-2" />
        <p>No recent hazards detected.</p>
      </div>
    );
  }

  const renderIcon = (type: HazardType) => {
    switch(type) {
        case HazardType.THERMAL: return <span className="text-xl">🔥</span>;
        case HazardType.SHARP: return <span className="text-xl">🔪</span>;
        case HazardType.PRESSURE: return <Hand className="w-5 h-5 text-orange-500" />;
        case HazardType.REPETITIVE: return <Repeat className="w-5 h-5 text-blue-400" />;
        case HazardType.SELF_HARM: return <Activity className="w-5 h-5 text-red-500" />;
        default: return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3">
      <h3 className={`font-bold mb-4 uppercase tracking-wider ${highContrast ? 'text-white' : 'text-gray-400'}`}>Event Log</h3>
      {history.map((hazard) => (
        <div 
          key={hazard.id} 
          className={`p-4 rounded-lg flex items-start gap-3 transition-all ${
            highContrast 
              ? 'bg-white text-black border-2 border-white' 
              : 'bg-gray-800 border-l-4 border-l-red-500'
          }`}
        >
          <div className="mt-1">
            {renderIcon(hazard.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold uppercase text-sm">{hazard.type.replace('_', ' ')}</span>
              <div className="flex items-center gap-1 text-xs opacity-70">
                <Clock className="w-3 h-3" />
                {new Date(hazard.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
            <p className="text-sm font-medium leading-snug">{hazard.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafetyLog;