import { useState } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
import { getVitalsHistory } from '../api/mockData';
import { Card, Button, Skeleton } from '../components/ui';
import { Activity, Droplet, Heart, Scale, Plus, Edit2, Trash2, Pill, AlertCircle, Coffee } from 'lucide-react';
import { HoverGradientTabs } from '../components/ui/HoverGradientTabs';
import type { HoverGradientTabItem } from '../components/ui/HoverGradientTabs';
import { Shuffle } from '../components/ui/Shuffle';
export function HealthLogs() {
  const { data: vitals, isLoading } = useDataFetch(getVitalsHistory);
  const [activeTab, setActiveTab] = useState('Vitals');

  const tabs: HoverGradientTabItem[] = [
    { icon: <Activity className="h-4 w-4" />, label: "Vitals", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
    { icon: <Pill className="h-4 w-4" />, label: "Medications", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
    { icon: <AlertCircle className="h-4 w-4" />, label: "Symptoms", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
        <Button>
          <Plus size={16} className="mr-2" /> Log New Metric
        </Button>
      </div>

      <HoverGradientTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'Vitals' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2 text-[var(--stat-green)] mb-2">
                <div className="w-8 h-8 rounded-full bg-[var(--stat-green-bg)] flex items-center justify-center">
                  <Droplet size={16} />
                </div>
                <span className="font-semibold text-sm">Blood Pressure</span>
              </div>
              <div className="text-2xl font-bold">120/80 <span className="text-sm font-normal text-[var(--color-text-muted)]">mmHg</span></div>
              <div className="text-xs text-[var(--color-text-muted)] mt-2">May 24, 8:30 AM</div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-2 text-[var(--stat-purple)] mb-2">
                <div className="w-8 h-8 rounded-full bg-[var(--stat-purple-bg)] flex items-center justify-center">
                  <Activity size={16} />
                </div>
                <span className="font-semibold text-sm">Blood Sugar</span>
              </div>
              <div className="text-2xl font-bold">98 <span className="text-sm font-normal text-[var(--color-text-muted)]">mg/dL</span></div>
              <div className="text-xs text-[var(--color-text-muted)] mt-2">May 24, 8:30 AM</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 text-rose-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                  <Heart size={16} />
                </div>
                <span className="font-semibold text-sm">Heart Rate</span>
              </div>
              <div className="text-2xl font-bold">72 <span className="text-sm font-normal text-[var(--color-text-muted)]">bpm</span></div>
              <div className="text-xs text-[var(--color-text-muted)] mt-2">May 24, 8:30 AM</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 text-indigo-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Scale size={16} />
                </div>
                <span className="font-semibold text-sm">Weight</span>
              </div>
              <div className="text-2xl font-bold">68.5 <span className="text-sm font-normal text-[var(--color-text-muted)]">kg</span></div>
              <div className="text-xs text-[var(--color-text-muted)] mt-2">May 24, 8:30 AM</div>
            </Card>
          </div>

          {/* Table */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-[var(--color-border)]">
              <h3 className="font-semibold">All Vitals</h3>
            </div>
            
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-[var(--color-text-muted)] bg-slate-50 uppercase border-b border-[var(--color-border)]">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date & Time</th>
                      <th className="px-6 py-4 font-medium">Blood Pressure</th>
                      <th className="px-6 py-4 font-medium">Blood Sugar</th>
                      <th className="px-6 py-4 font-medium">Heart Rate</th>
                      <th className="px-6 py-4 font-medium">Weight</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {vitals?.map((vital) => (
                      <tr key={vital.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{vital.timestamp}</td>
                        <td className="px-6 py-4">{vital.bloodPressure} mmHg</td>
                        <td className="px-6 py-4">{vital.bloodSugar} mg/dL</td>
                        <td className="px-6 py-4">{vital.heartRate} bpm</td>
                        <td className="px-6 py-4">{vital.weight} kg</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3 text-[var(--color-text-muted)]">
                            <button className="hover:text-[var(--color-primary)]"><Edit2 size={16} /></button>
                            <button className="hover:text-red-500"><Trash2 size={16} /></button>
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

      {activeTab !== 'Vitals' && (
        <Card className="p-12 text-center text-[var(--color-text-muted)]">
          <Activity className="mx-auto mb-4 opacity-50" size={48} />
          <h3 className="text-lg font-semibold mb-2">No {activeTab} Logged</h3>
          <p>Click "Add New" to start tracking your {activeTab.toLowerCase()}.</p>
        </Card>
      )}
    </div>
  );
}
