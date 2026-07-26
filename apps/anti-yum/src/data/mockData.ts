export interface Symptom {
  id: string;
  label: string;
  icon: string;
}

export const commonSymptoms: Symptom[] = [
  { id: 'fever', label: 'Fever', icon: '🌡️' },
  { id: 'cough', label: 'Cough', icon: '🗣️' },
  { id: 'pain', label: 'Pain', icon: '🤕' },
  { id: 'sob', label: 'Shortness of Breath', icon: '🫁' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
  { id: 'fatigue', label: 'Fatigue', icon: '🥱' },
];

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: Date;
}

// Generate an initial mock history so the sidebar isn't empty
export const initialMockSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Migraine Analysis',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    messages: [
      { id: 'msg-1', role: 'user', content: 'I have had a throbbing headache for 3 days straight.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
      { id: 'msg-2', role: 'assistant', content: 'Based on your description of a throbbing headache lasting 3 days, this could be indicative of a migraine. Are you experiencing any sensitivity to light or nausea?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47) }
    ]
  },
  {
    id: 'session-2',
    title: 'Post-Workout Fatigue',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    messages: [
      { id: 'msg-3', role: 'user', content: 'I feel extremely tired after my morning runs, more than usual.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120) },
      { id: 'msg-4', role: 'assistant', content: 'Increased post-workout fatigue can be related to several factors including inadequate recovery, sleep quality, or nutritional deficits. Have you changed your diet or sleep schedule recently?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 119) }
    ]
  }
];

export const simulateChatResponse = async (userMessage: string, _history: ChatMessage[]): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = userMessage.toLowerCase();
      
      if (text.includes('chest') || text.includes('sob') || text.includes('shortness')) {
        resolve('Your reported symptoms of chest discomfort and shortness of breath are red flags for potential cardiovascular events. I strongly recommend proceeding to the nearest emergency facility immediately.');
      } else if (text.includes('fever') || text.includes('pain')) {
        resolve('Persistent fever and pain may indicate a spreading infection or acute inflammation. I advise consulting a primary care physician within the next 48 hours. Are you experiencing any other localized symptoms?');
      } else if (text.includes('diet') || text.includes('eat')) {
        resolve('Nutrition plays a major role in how you feel. A balanced intake of macronutrients tailored to your activity level can drastically improve your symptoms. Could you describe a typical day of meals for you?');
      } else {
        resolve('Thank you for sharing that. Your symptoms appear mild for now. Rest, hydrate, and monitor your vitals closely. Let me know if anything changes or if you have specific questions about your health data.');
      }
    }, 1500); // 1.5s delay to simulate typing
  });
};

export const mockHeartData = {
  bloodPressure: [
    { day: 'Mon', systolic: 120, diastolic: 80 },
    { day: 'Tue', systolic: 122, diastolic: 81 },
    { day: 'Wed', systolic: 118, diastolic: 79 },
    { day: 'Thu', systolic: 135, diastolic: 88 }, // Spike
    { day: 'Fri', systolic: 140, diastolic: 90 }, // Spike
    { day: 'Sat', systolic: 125, diastolic: 82 },
    { day: 'Sun', systolic: 121, diastolic: 79 },
  ],
  averageRestingHR: 62,
  nudge: {
    message: "Your blood pressure was elevated on Thursday and Friday. Did you miss your medication or experience high stress?",
    type: "warning" // warning | positive | neutral
  }
};

export const mockMetabolicData = {
  glucoseLevels: [
    { time: '8am', level: 95 },
    { time: '11am', level: 110 },
    { time: '2pm', level: 145 }, // Post-meal spike
    { time: '5pm', level: 105 },
    { time: '8pm', level: 130 },
  ],
  hba1c: 5.6,
  nudge: {
    message: "Your post-lunch glucose spike was larger than usual. Consider taking a 10-minute walk after meals.",
    type: "neutral"
  }
};
