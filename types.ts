export enum HazardType {
  THERMAL = 'THERMAL',
  SHARP = 'SHARP',
  SELF_HARM = 'SELF_HARM',
  FALL_RISK = 'FALL_RISK',
  PRESSURE = 'PRESSURE',
  REPETITIVE = 'REPETITIVE',
  NONE = 'NONE'
}

export enum Severity {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  SAFE = 'SAFE'
}

export interface Hazard {
  id: string;
  type: HazardType;
  severity: Severity;
  description: string;
  timestamp: number;
}

export interface DetectionResponse {
  hazards: {
    type: string; // Will map to HazardType
    severity: string; // Will map to Severity
    description: string;
  }[];
  isSafe: boolean;
}

export interface AppSettings {
  highContrast: boolean;
  audioAlerts: boolean;
  monitoringActive: boolean;
  detectionInterval: number; // in ms
}