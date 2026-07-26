import type {
  DashboardStats,
  AiCompanionData,
  VitalReading,
  Report,
  HospitalFacility,
  UserProfile
} from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getDashboardStats = async (): Promise<DashboardStats> => {
  await delay(800);
  return {
    healthScore: {
      label: 'Health Score',
      value: 82,
      unit: '/100',
      status: 'Good',
      trend: [{ date: 'Mon', value: 78 }, { date: 'Tue', value: 80 }, { date: 'Wed', value: 82 }]
    },
    bloodPressure: {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'Normal',
      trend: [{ date: 'Mon', value: 118 }, { date: 'Tue', value: 120 }, { date: 'Wed', value: 120 }]
    },
    bloodSugar: {
      label: 'Blood Sugar',
      value: 98,
      unit: 'mg/dL',
      status: 'Normal',
      trend: [{ date: 'Mon', value: 102 }, { date: 'Tue', value: 95 }, { date: 'Wed', value: 98 }]
    },
    adherence: {
      label: 'Medication Adherence',
      value: 92,
      unit: '%',
      status: 'On Track',
      trend: [{ date: 'Mon', value: 80 }, { date: 'Tue', value: 90 }, { date: 'Wed', value: 92 }]
    },
    nextReminder: {
      id: 'rem1',
      name: 'Take Metformin 500mg',
      dosage: '500mg',
      timing: 'After Breakfast • 8:00 AM',
      status: 'Upcoming'
    },
    bpTrend: [
      { date: 'May 18', systolic: 110, diastolic: 75 },
      { date: 'May 19', systolic: 115, diastolic: 78 },
      { date: 'May 20', systolic: 112, diastolic: 76 },
      { date: 'May 21', systolic: 118, diastolic: 79 },
      { date: 'May 22', systolic: 120, diastolic: 80 },
      { date: 'May 23', systolic: 119, diastolic: 81 },
      { date: 'May 24', systolic: 120, diastolic: 80 }
    ],
    glucoseTrend: [
      { date: 'May 18', value: 105 },
      { date: 'May 19', value: 110 },
      { date: 'May 20', value: 95 },
      { date: 'May 21', value: 98 },
      { date: 'May 22', value: 92 },
      { date: 'May 23', value: 100 },
      { date: 'May 24', value: 98 }
    ],
    weeklyProgress: {
      percentage: 75,
      goalsMet: 5,
      totalGoals: 7,
      breakdown: [
        { label: 'Vitals Logged', completed: 5, target: 7 },
        { label: 'Medication', completed: 6, target: 7 },
        { label: 'Walk Goal', completed: 4, target: 7 }
      ]
    }
  };
};

export const getAiCompanionData = async (): Promise<AiCompanionData> => {
  await delay(600);
  return {
    messages: [
      { id: '1', role: 'ai', text: 'Hi Rohan! How can I help you today?' },
      { id: '2', role: 'user', text: 'I have been feeling tired and having headaches lately.' },
      { id: '3', role: 'ai', text: 'I\'m sorry to hear that. I can help you understand what might be going on.' }
    ],
    suggestions: [
      'How long have you had this?',
      'Do you have any other symptoms?',
      'Is your sleep or stress affected?'
    ],
    assessment: {
      priority: 'Low Priority',
      summary: 'Your symptoms do not indicate an emergency.',
      reasoning: 'Based on your symptoms, this could be related to stress, dehydration, or irregular sleep.',
      redFlagsDetected: false,
      symptoms: ['Fatigue', 'Headache', 'Stress']
    }
  };
};

export const getVitalsHistory = async (): Promise<VitalReading[]> => {
  await delay(700);
  return [
    { id: 'v1', timestamp: 'May 24, 8:30 AM', bloodPressure: '120/80', bloodSugar: 98, heartRate: 72, weight: 68.5 },
    { id: 'v2', timestamp: 'May 23, 8:15 AM', bloodPressure: '118/78', bloodSugar: 100, heartRate: 70, weight: 68.6 },
    { id: 'v3', timestamp: 'May 22, 8:10 AM', bloodPressure: '122/82', bloodSugar: 105, heartRate: 75, weight: 68.7 },
  ];
};

export const getReports = async (): Promise<Report[]> => {
  await delay(500);
  return [
    { id: 'r1', name: 'Health Summary Report', date: 'May 24, 2025', size: '1.2 MB' },
    { id: 'r2', name: 'Blood Work Report', date: 'May 10, 2025', size: '850 KB' },
    { id: 'r3', name: 'Prescription Report', date: 'May 01, 2025', size: '540 KB' },
  ];
};

export const getHospitals = async (): Promise<HospitalFacility[]> => {
  await delay(800);
  return [
    { id: 'h1', name: 'City Care Hospital', type: 'Multi-speciality Hospital', distance: '1.2km away', rating: 4.8, image: '' },
    { id: 'h2', name: 'Sunrise Medical Center', type: 'General Clinic', distance: '2.4km away', rating: 4.5, image: '' },
    { id: 'h3', name: 'Health Plus Clinic', type: 'Pharmacy & Clinic', distance: '3.1km away', rating: 4.3, image: '' },
  ];
};

export const getUserProfile = async (): Promise<UserProfile> => {
  await delay(400);
  return {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://i.pravatar.cc/150?u=rohan',
    dob: 'May 12, 1990',
    gender: 'Male',
    height: '175 cm',
    weight: '68.5 kg',
    bloodGroup: 'O+',
    location: 'Mumbai, India'
  };
};
