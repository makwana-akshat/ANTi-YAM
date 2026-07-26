import { useState } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
import { getReports, getDashboardStats } from '../api/mockData';
import { Card, Button, Skeleton } from '../components/ui';
import { StatCard } from '../components/StatCard';
import { FileText, Download, Heart, Droplet, Activity, Pill, ChevronDown, LayoutDashboard, Beaker, ClipboardList } from 'lucide-react';
import { HoverGradientTabs } from '../components/ui/HoverGradientTabs';
import type { HoverGradientTabItem } from '../components/ui/HoverGradientTabs';
import { Shuffle } from '../components/ui/Shuffle';

export function Reports() {
  const { data: reports, isLoading: reportsLoading } = useDataFetch(getReports);
  const { data: stats, isLoading: statsLoading } = useDataFetch(getDashboardStats);
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs: HoverGradientTabItem[] = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Overview", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
    { icon: <Beaker className="h-4 w-4" />, label: "Lab Reports", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400" },
    { icon: <Pill className="h-4 w-4" />, label: "Prescriptions", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
    { icon: <ClipboardList className="h-4 w-4" />, label: "Health Summary", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)", iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Reports"
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
          <p className="text-[var(--color-text-muted)] mt-1">View and download your health reports</p>
        </div>
      </div>

      <HoverGradientTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">Date Range</label>
          <div className="flex items-center space-x-2 bg-white border border-[var(--color-border)] rounded-lg px-3 py-2 shadow-sm text-sm">
            <span>May 1 - May 24, 2025</span>
            <ChevronDown size={16} className="text-[var(--color-text-muted)] ml-auto" />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">Report Type</label>
          <div className="flex items-center space-x-2 bg-white border border-[var(--color-border)] rounded-lg px-3 py-2 shadow-sm text-sm">
            <span>All Types</span>
            <ChevronDown size={16} className="text-[var(--color-text-muted)] ml-auto" />
          </div>
        </div>
        <Button className="shrink-0 h-10 w-full sm:w-auto">Generate Report</Button>
      </div>

      {statsLoading ? (
        <Skeleton className="h-48 w-full" />
      ) : stats ? (
        <Card className="border-[var(--color-border)] shadow-sm">
          <div className="mb-6">
            <h3 className="font-bold">Health Summary Report</h3>
            <p className="text-xs text-[var(--color-text-muted)]">May 1 - May 24, 2025</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard data={stats.healthScore} icon={Heart} iconColor="var(--stat-blue)" iconBg="var(--stat-blue-bg)" sparklineColor="var(--stat-blue)" />
            <StatCard data={stats.bloodPressure} icon={Droplet} iconColor="var(--stat-green)" iconBg="var(--stat-green-bg)" sparklineColor="var(--stat-green)" />
            <StatCard data={stats.bloodSugar} icon={Activity} iconColor="var(--stat-purple)" iconBg="var(--stat-purple-bg)" sparklineColor="var(--stat-purple)" />
            <StatCard data={stats.adherence} icon={Pill} iconColor="var(--stat-orange)" iconBg="var(--stat-orange-bg)" sparklineColor="var(--stat-orange)" />
          </div>
        </Card>
      ) : null}

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)]">
          <h3 className="font-semibold">Recent Reports</h3>
        </div>
        {reportsLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {reports?.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{report.name}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{report.date} • PDF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-sm text-[var(--color-text-muted)] hidden sm:block">{report.size}</span>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
