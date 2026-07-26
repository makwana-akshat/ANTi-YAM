import { useState, useEffect } from 'react';
import { useDiseaseStore } from '../features/disease-management/store/useDiseaseStore';
import { Card, Button } from '../components/ui';
import { Activity, Plus, Edit2, Trash2, Pill, AlertCircle, Sparkles } from 'lucide-react';
import { HoverGradientTabs } from '../components/ui/HoverGradientTabs';
import type { HoverGradientTabItem } from '../components/ui/HoverGradientTabs';
import { Shuffle } from '../components/ui/Shuffle';
import type { DiseaseTemplate } from '../features/disease-management/types/schema';

export function HealthLogs() {
  const { activeLogs, primaryDisease, openModal } = useDiseaseStore();
  const [activeTab, setActiveTab] = useState('Daily Logs');
  const [template, setTemplate] = useState<DiseaseTemplate | null>(null);

  useEffect(() => {
    if (primaryDisease) {
      import(`../features/disease-management/templates/${primaryDisease}.json`)
        .then((module) => {
          setTemplate(module.default);
        })
        .catch((err) => {
          console.error("Failed to load schema for logs", err);
          setTemplate(null);
        });
    }
  }, [primaryDisease]);

  const tabs: HoverGradientTabItem[] = [
    { icon: <Activity className="h-4 w-4" />, label: "Daily Logs", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
    { icon: <Pill className="h-4 w-4" />, label: "Medications", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
    { icon: <AlertCircle className="h-4 w-4" />, label: "Symptoms", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400" },
  ];

  const fields = template?.sections[0]?.fields || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 font-['Figtree',sans-serif]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Health Logs"
            tag="h1"
            className="text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: '"Press Start 2P", system-ui' }}
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
          />
          <p className="text-[var(--color-text-muted)] mt-1">Track and monitor your daily health metrics</p>
        </div>
        <Button onClick={() => openModal(primaryDisease || 'diabetes')}>
          <Plus size={16} className="mr-2" /> Log New Metric
        </Button>
      </div>

      <HoverGradientTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'Daily Logs' && (
        <div className="space-y-6">
          {/* AI Health Insight */}
          <Card className="bg-[#ECFEFF] border-0 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10 text-[#0891B2]">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0891B2] shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#164E63] mb-1">AI Trend Analysis</h3>
                <p className="text-[#164E63]/80 leading-relaxed mb-3 text-[16px]">
                  Your readings are <strong>12% more stable</strong> than last week. The AI indicates a <span className="text-[#059669] font-bold bg-[#10B981]/20 px-2 py-0.5 rounded-md inline-flex items-center">🟩 Good Trend</span> in your recent logs. Keep maintaining your current routine!
                </p>
              </div>
            </div>
          </Card>

          {/* Dynamic Table from JSON Store */}
          <Card className="p-0 overflow-hidden shadow-sm border-0 ring-1 ring-slate-200">
            <div className="p-4 border-b border-slate-200 bg-white">
              <h3 className="font-semibold text-slate-900 text-lg">
                Recent {primaryDisease ? primaryDisease.replace('-', ' ') : ''} Logs
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              {!template ? (
                <div className="p-12 text-center text-slate-500 animate-pulse">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-slate-200 w-48 mx-auto rounded"></div>
                </div>
              ) : activeLogs.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <Activity className="mx-auto mb-4 opacity-50 text-slate-400" size={48} />
                  <p className="text-lg font-medium mb-1">No logs found</p>
                  <p className="text-sm">Click "Log New Metric" to create your first entry.</p>
                </div>
              ) : (
                <table className="w-full text-[16px] text-left">
                  <thead className="text-xs text-[#0891B2] bg-[#ECFEFF] uppercase border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-bold whitespace-nowrap">Date & Time</th>
                      {fields.map(field => (
                        <th key={field.id} className="px-6 py-4 font-bold">{field.label}</th>
                      ))}
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors bg-white group">
                        <td className="px-6 py-5 font-medium whitespace-nowrap text-slate-900">
                          {new Date(log.timestamp).toLocaleString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        {fields.map(field => {
                          const value = log.data[field.id];
                          let displayValue = '-';
                          
                          if (value !== undefined && value !== null && value !== '') {
                            if (typeof value === 'boolean') {
                              displayValue = value ? 'Yes' : 'No';
                            } else if (Array.isArray(value)) {
                              displayValue = value.length > 0 ? value.join(', ') : '-';
                            } else {
                              displayValue = String(value);
                            }
                          }
                          
                          return (
                            <td key={field.id} className="px-6 py-5 text-slate-700">
                              {displayValue}
                            </td>
                          );
                        })}
                        <td className="px-6 py-5">
                          <div className="flex justify-end space-x-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">
                              <Edit2 size={18} />
                            </button>
                            <button className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-500 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      )}

      {activeTab !== 'Daily Logs' && (
        <Card className="p-12 text-center text-[var(--color-text-muted)]">
          <Activity className="mx-auto mb-4 opacity-50" size={48} />
          <h3 className="text-lg font-semibold mb-2">No {activeTab} Logged</h3>
          <p>This section is under construction.</p>
        </Card>
      )}
    </div>
  );
}
