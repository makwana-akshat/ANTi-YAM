import { useState } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
import { getAiCompanionData, getUserProfile } from '../api/mockData';
import { Card, Badge, Skeleton } from '../components/ui';
import { Send, CheckCircle2 } from 'lucide-react';

export function AiCompanion() {
  const { data, isLoading } = useDataFetch(getAiCompanionData);
  const { data: profile } = useDataFetch(getUserProfile);
  const [inputText, setInputText] = useState('');

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
        <Skeleton className="flex-1 rounded-2xl" />
        <Skeleton className="w-full lg:w-80 rounded-2xl shrink-0" />
      </div>
    );
  }

  if (!data || !profile) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      
      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-[var(--color-bg-card)]">
        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="font-bold text-lg">AI Health Companion <Badge variant="success" className="ml-2">BETA</Badge></h2>
          <p className="text-sm text-[var(--color-text-muted)]">Your personal AI health assistant</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {data.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden
                  ${msg.role === 'user' ? 'ml-3 bg-slate-200' : 'mr-3 bg-blue-100'}`}
                >
                  {msg.role === 'user' ? (
                    <img src={profile.avatar} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">✨</span>
                  )}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[var(--color-primary)] text-white rounded-tr-none' 
                    : 'bg-slate-100 text-[var(--color-text-main)] rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {/* Suggested Follow-ups */}
          <div className="pl-11 pr-4">
            <div className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">Suggested Follow-up</div>
            <div className="flex flex-wrap gap-2">
              {data.suggestions.map((sug, i) => (
                <button 
                  key={i} 
                  className="px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 text-xs hover:bg-blue-50 transition-colors bg-white"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[var(--color-border)] bg-slate-50">
          <div className="relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..." 
              className="w-full pl-4 pr-12 py-3 bg-white border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-primary)] text-white rounded-lg flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-colors">
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-3 text-[10px] text-[var(--color-text-muted)]">
            AI suggestions are not a substitute for professional medical advice.
          </div>
        </div>
      </Card>

      {/* Side Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        
        <div>
          <h3 className="text-sm font-semibold mb-3">Symptom Summary</h3>
          <div className="flex flex-wrap gap-2">
            {data.assessment.symptoms.map((s, i) => (
              <Badge key={i} className="bg-blue-50 text-blue-700 hover:bg-blue-100">{s}</Badge>
            ))}
            <Badge className="bg-slate-100 text-slate-600">+2 more</Badge>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-3">Assessment</h3>
          <Card className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm">Triage Result</h4>
              <Badge variant={data.assessment.priority === 'Low Priority' ? 'success' : 'warning'}>
                {data.assessment.priority}
              </Badge>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
              {data.assessment.summary}
            </p>

            <h4 className="font-semibold text-sm mb-2">AI Reasoning</h4>
            <p className="text-sm text-[var(--color-text-muted)] mb-5 pb-5 border-b border-[var(--color-border)]">
              {data.assessment.reasoning}
            </p>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-sm mb-1">Red Flag Indicators</h4>
                <p className="text-sm text-[var(--color-status-good)] flex items-center">
                  None detected
                </p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[var(--color-status-good-bg)] text-[var(--color-status-good)] flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
