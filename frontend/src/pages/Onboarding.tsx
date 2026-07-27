import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useDiseaseStore } from '../features/disease-management/store/useDiseaseStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';

const diseases = [
  { id: 'diabetes', name: 'Type 2 Diabetes', icon: 'Activity' },
  { id: 'hypertension', name: 'Hypertension (High BP)', icon: 'HeartPulse' },
  { id: 'asthma', name: 'Asthma', icon: 'Wind' },
  { id: 'migraine', name: 'Migraines', icon: 'Brain' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setPrimaryDisease } = useDiseaseStore();
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [otherDisease, setOtherDisease] = useState('');
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleComplete = () => {
    if (selectedDisease === 'other') {
      setIsGenerating(true);
      // Simulate verifying condition and generating layout
      setTimeout(() => {
        setIsGenerating(false);
        const finalDisease = otherDisease.toLowerCase().replace(/\s+/g, '-');
        if (finalDisease) {
          setPrimaryDisease(finalDisease);
          navigate('/');
        }
      }, 2500);
    } else if (selectedDisease) {
      setPrimaryDisease(selectedDisease);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-10">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
              <Icons.ShieldPlus className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
              {step === 1 && 'Welcome to ANTi-YAM'}
              {step === 2 && 'How can we help?'}
              {step === 3 && 'What should we track?'}
            </h1>
            <p className="text-slate-500 text-lg">
              {step === 1 && 'We need a few details to set up your profile.'}
              {step === 2 && 'What brings you here today?'}
              {step === 3 && 'Select the primary chronic condition you want to manage daily.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                    <Input type="number" placeholder="Years" defaultValue={32} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                    <select className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
                    <Input type="number" placeholder="cm" defaultValue={175} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
                    <Input type="number" placeholder="kg" defaultValue={70} />
                  </div>
                </div>
                <div className="pt-4">
                  <Button 
                    className="w-full h-14 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
                    onClick={() => setStep(2)}
                  >
                    Continue <Icons.ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div 
                  onClick={() => navigate('/ai')}
                  className="cursor-pointer group relative p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-red-200 hover:bg-red-50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icons.AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-red-900">I have an Acute Symptom</h3>
                      <p className="text-slate-500 text-sm">I'm feeling unwell and need immediate guidance or triage right now.</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  onClick={() => setStep(3)}
                  className="cursor-pointer group relative p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icons.Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-900">I have a Chronic Condition</h3>
                      <p className="text-slate-500 text-sm">I want to track a daily health metric long-term and get personalized insights.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="outline"
                    className="w-full h-14 rounded-xl text-lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 relative"
              >
                {isGenerating ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center text-center rounded-2xl"
                    style={{ minHeight: '300px' }}
                  >
                    <Icons.Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing condition...</h3>
                    <p className="text-slate-500">Generating a personalized AI tracking layout for {otherDisease}.</p>
                  </motion.div>
                ) : null}

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isGenerating ? 'opacity-20 pointer-events-none' : ''}`}>
                  {diseases.map((d) => {
                    const Icon = (Icons as any)[d.icon];
                    return (
                      <div 
                        key={d.id}
                        onClick={() => setSelectedDisease(d.id)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
                          selectedDisease === d.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mb-4 ${selectedDisease === d.id ? 'text-blue-600' : 'text-slate-400'}`} />
                        <h3 className={`font-bold text-lg ${selectedDisease === d.id ? 'text-blue-900' : 'text-slate-700'}`}>{d.name}</h3>
                      </div>
                    );
                  })}
                  
                  <div 
                    onClick={() => setSelectedDisease('other')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
                      selectedDisease === 'other'
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icons.PlusCircle className={`w-8 h-8 mb-4 ${selectedDisease === 'other' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <h3 className={`font-bold text-lg ${selectedDisease === 'other' ? 'text-blue-900' : 'text-slate-700'}`}>Other Condition</h3>
                  </div>
                </div>

                {selectedDisease === 'other' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`pt-4 ${isGenerating ? 'opacity-20 pointer-events-none' : ''}`}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">What condition would you like to track?</label>
                    <Input 
                      placeholder="e.g. Arthritis, IBS, Chronic Fatigue..." 
                      value={otherDisease}
                      onChange={(e) => setOtherDisease(e.target.value)}
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      <Icons.Sparkles className="inline w-4 h-4 mr-1 text-blue-500" />
                      Our AI will generate a custom daily tracking form for this condition.
                    </p>
                  </motion.div>
                )}

                <div className={`flex space-x-4 pt-8 ${isGenerating ? 'opacity-20 pointer-events-none' : ''}`}>
                  <Button 
                    variant="outline"
                    className="w-1/3 h-14 rounded-xl text-lg"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="w-2/3 h-14 rounded-xl text-lg shadow-md hover:shadow-lg transition-all"
                    disabled={!selectedDisease || (selectedDisease === 'other' && !otherDisease)}
                    onClick={handleComplete}
                  >
                    Finish Setup
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
