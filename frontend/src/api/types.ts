export interface TrendPoint {
  date: string;
  value?: number; // Generic single value
  systolic?: number;
  diastolic?: number;
}

export interface MetricSummary {
  label: string;
  value: string | number;
  unit: string;
  status: 'Good' | 'Normal' | 'On Track' | 'Warning';
  trend: TrendPoint[];
}

export interface MedicationReminder {
  id: string;
  name: string;
  dosage: string;
  timing: string;
  status: 'Upcoming' | 'Taken' | 'Missed';
}

export interface WeeklyProgress {
  percentage: number;
  goalsMet: number;
  totalGoals: number;
  breakdown: {
    label: string;
    completed: number;
    target: number;
  }[];
}

export interface DashboardStats {
  healthScore: MetricSummary;
  bloodPressure: MetricSummary;
  bloodSugar: MetricSummary;
  adherence: MetricSummary;
  nextReminder: MedicationReminder;
  bpTrend: TrendPoint[];
  glucoseTrend: TrendPoint[];
  weeklyProgress: WeeklyProgress;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export interface TriageAssessment {
  priority: 'Low Priority' | 'Medium Priority' | 'High Priority';
  summary: string;
  reasoning: string;
  redFlagsDetected: boolean;
  symptoms: string[];
}

export interface AiCompanionData {
  messages: ChatMessage[];
  suggestions: string[];
  assessment: TriageAssessment;
}

export interface VitalReading {
  id: string;
  timestamp: string;
  bloodPressure: string; // e.g. "120/80"
  bloodSugar: number;
  heartRate: number;
  weight: number;
}

export interface Report {
  id: string;
  name: string;
  date: string;
  size: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  image: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  dob: string;
  gender: string;
  height: string;
  weight: string;
  bloodGroup: string;
  location: string;
}
