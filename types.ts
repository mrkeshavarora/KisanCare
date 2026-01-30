
export interface SensorData {
  soilHumidity: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soilPH: number;
  temperature: number;
  externalHumidity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  farmName: string;
}

export interface AnalysisResult {
  leafMoisture: 'Low' | 'Moderate' | 'High';
  estimatedMoisturePercent: number;
  healthStatus: string;
  severity: 'Low' | 'Medium' | 'High';
  detectedIssues: string[];
  pestsAndDiseases: string[];
  treatmentPlan: string[];
  precautions: string[];
  recommendations: string[];
}

export interface SavedAnalysis extends AnalysisResult {
  id: string;
  timestamp: number;
  image: string;
}

export interface MarketItem {
  id: string;
  name: string;
  farmerName: string;
  price: number;
  unit: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Tubers' | 'Other';
  image: string;
  description: string;
  location: string;
  isVerified: boolean;
}

export type ViewType = 'dashboard' | 'analyzer' | 'marketplace' | 'settings';
