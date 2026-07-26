import { useState, useMemo } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
import { getReports, getDashboardStats } from '../api/mockData';
import { Card, Button, Skeleton } from '../components/ui';
import { StatCard } from '../components/StatCard';
import { 
  FileText, Download, Heart, Droplet, Activity, Pill, 
  ChevronDown, LayoutDashboard, ActivitySquare, AlertCircle
} from 'lucide-react';
import { HoverGradientTabs } from '../components/ui/HoverGradientTabs';
import type { HoverGradientTabItem } from '../components/ui/HoverGradientTabs';
import { Shuffle } from '../components/ui/Shuffle';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { useDiseaseStore } from '../features/disease-management/store/useDiseaseStore';

export function Reports() {
  const { data: reports, isLoading: reportsLoading } = useDataFetch(getReports);
  const { data: stats, isLoading: statsLoading } = useDataFetch(getDashboardStats);
  const [activeTab, setActiveTab] = useState('Overview');

  const { primaryDisease, activeLogs } = useDiseaseStore();

  const tabs: HoverGradientTabItem[] = useMemo(() => {
    const baseTabs = [
      { icon: <LayoutDashboard className="h-4 w-4" />, label: "Overview", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
    ];

    if (primaryDisease === 'hypertension') {
      baseTabs.push({ icon: <Heart className="h-4 w-4" />, label: "Hypertension (BP)", gradient: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.06) 50%, rgba(4,120,87,0) 100%)", iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400" });
    } else if (primaryDisease === 'diabetes') {
      baseTabs.push({ icon: <Activity className="h-4 w-4" />, label: "Diabetes (Glucose)", gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400" });
    }

    baseTabs.push({ icon: <ActivitySquare className="h-4 w-4" />, label: "General Progress", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" });

    return baseTabs;
  }, [primaryDisease]);

  const pieData = stats?.weeklyProgress.breakdown.map(item => ({
    name: item.label,
    value: item.completed
  })) || [];
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Health Reports"
            tag="h1"
            className="text-4xl font-extrabold tracking-tight text-slate-900"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
          />
        </div>
      </div>

      <div className="no-print">
        <HoverGradientTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>

      {statsLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      ) : stats ? (
        <>
          {activeTab === 'Overview' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row gap-4 items-end mb-6 no-print">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Date Range</label>
                  <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-sm font-medium cursor-pointer hover:bg-slate-50 transition-colors">
                    <span>May 1 - May 24, 2025</span>
                    <ChevronDown size={16} className="text-slate-400 ml-auto" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Report Type</label>
                  <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-sm font-medium cursor-pointer hover:bg-slate-50 transition-colors">
                    <span>All Types</span>
                    <ChevronDown size={16} className="text-slate-400 ml-auto" />
                  </div>
                </div>
                <Button 
                  className="shrink-0 h-[46px] rounded-xl font-medium w-full sm:w-auto shadow-md"
                  onClick={() => window.print()}
                >
                  <Download size={18} className="mr-2" /> Download PDF
                </Button>
              </div>

              <Card className="rounded-3xl border-0 shadow-sm p-8 bg-white">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900">Health Summary Overview</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">May 1 - May 24, 2025</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard data={stats.healthScore} icon={Heart} iconColor="#3B82F6" iconBg="#EFF6FF" sparklineColor="#3B82F6" />
                  <StatCard data={stats.bloodPressure} icon={Droplet} iconColor="#10B981" iconBg="#ECFDF5" sparklineColor="#10B981" />
                  <StatCard data={stats.bloodSugar} icon={Activity} iconColor="#8B5CF6" iconBg="#F5F3FF" sparklineColor="#8B5CF6" />
                  <StatCard data={stats.adherence} icon={Pill} iconColor="#F59E0B" iconBg="#FFFBEB" sparklineColor="#F59E0B" />
                </div>
              </Card>

              <Card className="p-0 overflow-hidden rounded-3xl border-0 shadow-sm bg-white">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Health Log History</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 no-print">View All</Button>
                </div>
                {activeLogs.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No logs yet</h3>
                    <p className="text-slate-500">Your logged health data will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4 font-bold">Date & Time</th>
                          {Array.from(new Set(activeLogs.flatMap(log => Object.keys(log.data)))).map(key => (
                            <th key={key} className="px-6 py-4 font-bold capitalize">{key.replace(/_/g, ' ')}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">
                              {new Date(log.timestamp).toLocaleString(undefined, {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </td>
                            {Array.from(new Set(activeLogs.flatMap(l => Object.keys(l.data)))).map(key => (
                              <td key={`${log.id}-${key}`} className="px-6 py-4 text-slate-600 font-medium">
                                {log.data[key] !== undefined ? String(log.data[key]) : '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === 'Hypertension (BP)' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="rounded-3xl border-0 shadow-sm bg-white p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <Heart size={16} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Hypertension Analytics</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Blood Pressure trends over the last 7 days.</p>
                  </div>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-sm">
                    <AlertCircle size={16} className="mr-2" />
                    Normal Range
                  </div>
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.bpTrend} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                      <YAxis tickLine={false} axisLine={false} domain={[0, 150]} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dx={-10} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px 16px', fontWeight: 600 }}
                      />
                      <Legend iconType="circle" verticalAlign="top" height={60} wrapperStyle={{ fontWeight: 600, color: '#64748b' }} />
                      <Line type="monotone" dataKey="systolic" name="Systolic (mmHg)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8, fill: '#3B82F6', stroke: '#fff', strokeWidth: 3 }} />
                      <Line type="monotone" dataKey="diastolic" name="Diastolic (mmHg)" stroke="#10B981" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8, fill: '#10B981', stroke: '#fff', strokeWidth: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'Diabetes (Glucose)' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="rounded-3xl border-0 shadow-sm bg-white p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Activity size={16} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Diabetes Management</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Glucose levels over the last 7 days.</p>
                  </div>
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.glucoseTrend} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                      <YAxis tickLine={false} axisLine={false} domain={[0, 200]} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dx={-10} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px 16px', fontWeight: 600 }}
                      />
                      <Area type="monotone" dataKey="value" name="Glucose (mg/dL)" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorGlucose)" activeDot={{ r: 8, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 3 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'General Progress' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="rounded-3xl border-0 shadow-sm bg-white p-8">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                        <ActivitySquare size={16} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Weekly Health Goals</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-8">May 18 - May 24, 2025</p>
                    
                    <div className="space-y-6">
                      {stats.weeklyProgress.breakdown.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-3 shadow-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                              <span className="font-bold text-slate-700">{item.label}</span>
                            </div>
                            <span className="font-bold text-slate-900">{item.completed}<span className="text-slate-400">/{item.target}</span></span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000 ease-out" 
                              style={{ 
                                width: `${(item.completed / item.target) * 100}%`,
                                backgroundColor: COLORS[i % COLORS.length]
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="h-[350px] w-full max-w-[350px] relative flex justify-center items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={110}
                            outerRadius={140}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={8}
                          >
                            {pieData.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px 16px', fontWeight: 600 }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute flex flex-col items-center justify-center bg-white w-[200px] h-[200px] rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                        <span className="text-5xl font-black text-slate-900 mb-1">{stats.weeklyProgress.percentage}%</span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Goals Met</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
