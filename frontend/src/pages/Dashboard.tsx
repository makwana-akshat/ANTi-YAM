import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataFetch } from '../hooks/useDataFetch';
import { getDashboardStats, getUserProfile } from '../api/mockData';
import { Card, Button, StatusPill, Skeleton } from '../components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/Dialog';
import { StatCard } from '../components/StatCard';
import { 
  Heart, Droplet, Activity, Pill, Calendar as CalendarIcon, ChevronDown, 
  ClipboardCheck, ActivitySquare, AlertTriangle, Bell, Clock, Calendar
} from 'lucide-react';
import { Shuffle } from '../components/ui/Shuffle';
import { QuickActionButton } from '../components/ui/QuickActionButton';
import { useDiseaseStore } from '../features/disease-management/store/useDiseaseStore';

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState('2025-05-24');
  const fetchStats = useCallback(() => getDashboardStats(selectedDate), [selectedDate]);
  
  const { data: stats, isLoading: statsLoading } = useDataFetch(fetchStats);
  const { data: profile, isLoading: profileLoading } = useDataFetch(getUserProfile);
  const { primaryDisease, openModal } = useDiseaseStore();
  const navigate = useNavigate();
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [medsLogged, setMedsLogged] = useState(false);

  if ((!stats && statsLoading) || (!profile && profileLoading) || !primaryDisease) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
        </div>
        <Skeleton className="h-48 w-full rounded-3xl" />
      </div>
    );
  }

  if (!stats || !profile) return <div>Error loading data</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text={`Good Morning, ${profile.name.split(' ')[0]}!`}
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
        <div 
          className="relative flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden group"
          onClick={() => {
            try {
              (document.getElementById('dashboard-date-picker') as HTMLInputElement)?.showPicker();
            } catch (e) {
              // Fallback for older browsers
              document.getElementById('dashboard-date-picker')?.focus();
            }
          }}
        >
          <CalendarIcon size={18} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
          <span>
            {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <ChevronDown size={16} className="text-slate-400 ml-1" />
          <input 
            id="dashboard-date-picker"
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            style={{ colorScheme: 'light' }}
          />
        </div>
      </div>

      {/* Stat Cards - The Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          data={stats.healthScore} 
          icon={Heart} 
          iconColor="#3B82F6" 
          iconBg="#EFF6FF" 
          sparklineColor="#3B82F6" 
        />
        <StatCard 
          data={stats.bloodPressure} 
          icon={Droplet} 
          iconColor="#10B981" 
          iconBg="#ECFDF5" 
          sparklineColor="#10B981" 
        />
        <StatCard 
          data={stats.bloodSugar} 
          icon={Activity} 
          iconColor="#8B5CF6" 
          iconBg="#F5F3FF" 
          sparklineColor="#8B5CF6" 
        />
        <StatCard 
          data={stats.adherence} 
          icon={Pill} 
          iconColor="#F59E0B" 
          iconBg="#FFFBEB" 
          sparklineColor="#F59E0B" 
        />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Main Action / Priority */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="rounded-3xl border-0 shadow-lg shadow-blue-900/5 bg-gradient-to-br from-blue-50 to-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Heart size={160} />
            </div>
            <div className="relative z-10 p-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Bell size={20} className="fill-blue-600" />
                </div>
                <div className="text-sm font-bold tracking-wide text-blue-600 uppercase">Priority Action</div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{stats.nextReminder.name}</h2>
                <div className="flex items-center text-slate-500 font-medium">
                  <Clock size={18} className="mr-2" />
                  {stats.nextReminder.timing}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button className="rounded-full px-8 h-12 text-base shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 transition-all cursor-pointer">
                  Mark as Taken
                </Button>
                <Button variant="outline" className="rounded-full px-8 h-12 text-base border-slate-200 hover:bg-slate-50 cursor-pointer">
                  Reschedule
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Quick Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton 
              icon={ClipboardCheck} 
              label="Assessment" 
              iconColor="#3B82F6" 
              className="aspect-square cursor-pointer" 
              onClick={() => navigate('/ai')}
            />
            <QuickActionButton 
              icon={Activity} 
              label="Log Vitals" 
              iconColor="#10B981" 
              className="aspect-square cursor-pointer"
              onClick={() => openModal(primaryDisease)}
            />
            <QuickActionButton 
              icon={Pill} 
              label="Medication" 
              iconColor="#8B5CF6" 
              className="aspect-square cursor-pointer" 
              onClick={() => setIsMedModalOpen(true)}
            />
            <QuickActionButton 
              icon={AlertTriangle} 
              label="Emergency" 
              iconColor="#EF4444" 
              className="aspect-square cursor-pointer" 
              onClick={() => navigate('/hospitals')}
            />
          </div>
        </div>
      </div>

      {/* Bottom Summary Section */}
      <Card className="rounded-3xl border-0 shadow-sm bg-white p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Weekly Health Summary</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">May 18 - May 24, 2025</p>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full font-medium shadow-sm cursor-pointer"
            onClick={() => navigate('/reports')}
          >
            View Detailed Reports
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group p-6 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
            <div className="text-sm text-slate-500 font-medium mb-1">Days Logged</div>
            <div className="text-2xl font-bold text-slate-900">6<span className="text-sm font-medium text-slate-400 ml-1">/ 7</span></div>
          </div>
          
          <div className="group p-6 rounded-2xl bg-slate-50 hover:bg-green-50/50 transition-colors cursor-pointer border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplet size={20} />
            </div>
            <div className="text-sm text-slate-500 font-medium mb-1">Avg Blood Pressure</div>
            <div className="text-2xl font-bold text-slate-900">118/78</div>
          </div>
          
          <div className="group p-6 rounded-2xl bg-slate-50 hover:bg-purple-50/50 transition-colors cursor-pointer border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <div className="text-sm text-slate-500 font-medium mb-1">Avg Blood Sugar</div>
            <div className="text-2xl font-bold text-slate-900">102<span className="text-sm font-medium text-slate-400 ml-1">mg/dL</span></div>
          </div>
          
          <div className="group p-6 rounded-2xl bg-slate-50 hover:bg-orange-50/50 transition-colors cursor-pointer border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ActivitySquare size={20} />
            </div>
            <div className="text-sm text-slate-500 font-medium mb-1">Weekly Steps</div>
            <div className="text-2xl font-bold text-slate-900">45.2<span className="text-sm font-medium text-slate-400 ml-1">k</span></div>
          </div>
        </div>
      </Card>

      {/* Medication Logging Modal */}
      <Dialog open={isMedModalOpen} onOpenChange={setIsMedModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                <Pill size={20} />
              </div>
              Daily Medications
            </DialogTitle>
            <DialogDescription>
              Confirm the medications you've taken today to keep your adherence score up.
            </DialogDescription>
          </DialogHeader>

          {medsLogged ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">All caught up!</h3>
              <p className="text-slate-500 mt-1">Your medication log has been saved for today.</p>
              <Button className="mt-6 w-full rounded-xl" onClick={() => setIsMedModalOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Morning Prescriptions</div>
                    <div className="text-sm text-slate-500">2 medications</div>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Evening Prescriptions</div>
                    <div className="text-sm text-slate-500">1 medication</div>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" className="rounded-xl" onClick={() => setIsMedModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="rounded-xl px-8" 
                  onClick={() => {
                    setTimeout(() => {
                      setMedsLogged(true);
                      setTimeout(() => setIsMedModalOpen(false), 2000);
                    }, 500);
                  }}
                >
                  Save Log
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
