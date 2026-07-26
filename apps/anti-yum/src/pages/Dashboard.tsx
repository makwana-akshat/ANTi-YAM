import { useDataFetch } from '../hooks/useDataFetch';
import { getDashboardStats, getUserProfile } from '../api/mockData';
import { Card, Button, StatusPill, Skeleton } from '../components/ui';
import { StatCard } from '../components/StatCard';
import { 
  Heart, Droplet, Activity, Pill, Calendar as CalendarIcon, ChevronDown, 
  ClipboardCheck, ActivitySquare, FileText, AlertTriangle, Bell
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Shuffle } from '../components/ui/Shuffle';
import { QuickActionButton } from '../components/ui/QuickActionButton';

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDataFetch(getDashboardStats);
  const { data: profile, isLoading: profileLoading } = useDataFetch(getUserProfile);

  if (statsLoading || profileLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      </div>
    );
  }

  if (!stats || !profile) return <div>Error loading data</div>;

  const pieData = stats.weeklyProgress.breakdown.map(item => ({
    name: item.label,
    value: item.completed
  }));
  const COLORS = ['var(--stat-blue)', 'var(--stat-green)', 'var(--stat-orange)'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Greeting Row */}
      <div className="flex justify-between items-start">
        <div>
          <Shuffle
            text={`Good Morning, ${profile.name.split(' ')[0]}`}
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
          <p className="text-[var(--color-text-muted)] mt-1">Here's your health overview for today.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-[var(--color-border)] rounded-lg px-3 py-2 shadow-sm text-sm font-medium">
          <CalendarIcon size={16} className="text-[var(--color-text-muted)]" />
          <span className="hidden sm:inline">May 24, 2025</span>
          <ChevronDown size={16} className="text-[var(--color-text-muted)] sm:ml-2" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 mt-4 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] opacity-80 mr-1">Quick Actions</span>
        <div className="flex gap-3">
          <QuickActionButton icon={ClipboardCheck} label="Assessment" iconColor="#3b82f6" />
          <QuickActionButton icon={Activity} label="Log Vitals" iconColor="#22c55e" />
          <QuickActionButton icon={AlertTriangle} label="Emergency" iconColor="#ef4444" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          data={stats.healthScore} 
          icon={Heart} 
          iconColor="var(--stat-blue)" 
          iconBg="var(--stat-blue-bg)" 
          sparklineColor="var(--stat-blue)" 
        />
        <StatCard 
          data={stats.bloodPressure} 
          icon={Droplet} 
          iconColor="var(--stat-green)" 
          iconBg="var(--stat-green-bg)" 
          sparklineColor="var(--stat-green)" 
        />
        <StatCard 
          data={stats.bloodSugar} 
          icon={Activity} 
          iconColor="var(--stat-purple)" 
          iconBg="var(--stat-purple-bg)" 
          sparklineColor="var(--stat-purple)" 
        />
        <StatCard 
          data={stats.adherence} 
          icon={Pill} 
          iconColor="var(--stat-orange)" 
          iconBg="var(--stat-orange-bg)" 
          sparklineColor="var(--stat-orange)" 
        />
      </div>

      {/* Today's Reminder */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
            <Bell size={24} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-text-muted)] mb-1">Today's Reminder</div>
            <div className="font-bold text-lg">{stats.nextReminder.name}</div>
            <div className="text-sm text-[var(--color-text-muted)]">{stats.nextReminder.timing}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <StatusPill status="Upcoming" />
          <Button variant="outline">Mark as Taken</Button>
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold">Blood Pressure Trend</h3>
              <p className="text-xs text-[var(--color-text-muted)]">Last 7 Days</p>
            </div>
            <div className="text-xs font-medium border rounded px-2 py-1 flex items-center">
              7D <ChevronDown size={14} className="ml-1" />
            </div>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.bpTrend} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 150]} />
                <Tooltip />
                <Legend iconType="plainline" verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="systolic" name="Systolic" stroke="var(--stat-blue)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="var(--stat-green)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold">Glucose Trend</h3>
              <p className="text-xs text-[var(--color-text-muted)]">Last 7 Days</p>
            </div>
            <div className="text-xs font-medium border rounded px-2 py-1 flex items-center">
              7D <ChevronDown size={14} className="ml-1" />
            </div>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.glucoseTrend} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--stat-blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--stat-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 200]} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="var(--stat-blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorGlucose)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="font-bold">Weekly Progress</h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">May 18 - May 24</p>
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-[160px] relative flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{stats.weeklyProgress.percentage}%</span>
                <span className="text-xs text-[var(--color-text-muted)]">Goals Met</span>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {stats.weeklyProgress.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[var(--color-text-muted)]">{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.completed}/{item.target}</span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">View Details</Button>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold">Weekly Health Report</h3>
              <p className="text-xs text-[var(--color-text-muted)]">May 18 - May 24, 2025</p>
            </div>
            <Button variant="outline" size="sm">View Full Report</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-[var(--color-border)] rounded-xl">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-2"><Heart size={16} /></div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Vitals Logged</div>
              <div className="font-bold">6/7 <span className="text-xs font-normal text-[var(--color-text-muted)]">Days</span></div>
            </div>
            <div className="text-center p-4 border border-[var(--color-border)] rounded-xl">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-2"><Droplet size={16} /></div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Avg. Blood Pressure</div>
              <div className="font-bold">118/78 <span className="text-xs font-normal text-[var(--color-text-muted)]">mmHg</span></div>
            </div>
            <div className="text-center p-4 border border-[var(--color-border)] rounded-xl">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mx-auto mb-2"><Activity size={16} /></div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Avg. Blood Sugar</div>
              <div className="font-bold">102 <span className="text-xs font-normal text-[var(--color-text-muted)]">mg/dL</span></div>
            </div>
            <div className="text-center p-4 border border-[var(--color-border)] rounded-xl">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-2"><ActivitySquare size={16} /></div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Steps</div>
              <div className="font-bold">45,231 <span className="text-xs font-normal text-[var(--color-text-muted)]">Steps</span></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Add a dummy Bell component if not imported from lucide-react above. Oh wait, I forgot to import Bell at the top? Let me check.
// I imported Bell in AppShell but I need to make sure I import it here too. Oh, I did import it? Wait, I didn't import Bell. I'll need to fix the import.
