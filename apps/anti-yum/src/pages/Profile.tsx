import { useState } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
import { getUserProfile } from '../api/mockData';
import { Card, Button, Skeleton } from '../components/ui';
import { User, Activity, Phone, Shield, Settings as SettingsIcon } from 'lucide-react';
import { HoverGradientTabs } from '../components/ui/HoverGradientTabs';
import type { HoverGradientTabItem } from '../components/ui/HoverGradientTabs';
import { Shuffle } from '../components/ui/Shuffle';

export function Profile() {
  const { data: profile, isLoading } = useDataFetch(getUserProfile);
  const [activeTab, setActiveTab] = useState('Personal Info');

  const tabs: HoverGradientTabItem[] = [
    { icon: <User className="h-4 w-4" />, label: "Personal Info", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
    { icon: <Activity className="h-4 w-4" />, label: "Medical Info", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400" },
    { icon: <Phone className="h-4 w-4" />, label: "Emergency Contacts", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
    { icon: <Shield className="h-4 w-4" />, label: "Insurance", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400" },
    { icon: <SettingsIcon className="h-4 w-4" />, label: "Preferences", gradient: "radial-gradient(circle, rgba(100,116,139,0.15) 0%, rgba(71,85,105,0.06) 50%, rgba(51,65,85,0) 100%)", iconColor: "group-hover:text-slate-500 dark:group-hover:text-slate-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Profile"
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
          <p className="text-[var(--color-text-muted)] mt-1">Manage your personal information</p>
        </div>
      </div>

      <HoverGradientTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'Personal Info' && (
            <Card className="max-w-2xl">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-[var(--color-border)]">
                <h3 className="font-bold text-lg">Personal Information</h3>
                <Button variant="outline" size="sm">Edit</Button>
              </div>

              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div>
                      <Skeleton className="w-32 h-6 mb-2" />
                      <Skeleton className="w-48 h-4" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
                    {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-6 w-full" />)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-4 mb-8">
                    <img src={profile?.avatar} alt="Profile" className="w-16 h-16 rounded-full bg-slate-200" />
                    <div>
                      <h4 className="font-bold text-lg">{profile?.name}</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">{profile?.phone}</p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 text-sm">
                    <div>
                      <dt className="text-[var(--color-text-muted)] mb-1">Date of Birth</dt>
                      <dd className="font-medium">{profile?.dob}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-text-muted)] mb-1">Gender</dt>
                      <dd className="font-medium">{profile?.gender}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-text-muted)] mb-1">Height</dt>
                      <dd className="font-medium">{profile?.height}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-text-muted)] mb-1">Weight</dt>
                      <dd className="font-medium">{profile?.weight}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-text-muted)] mb-1">Blood Group</dt>
                      <dd className="font-medium">{profile?.bloodGroup}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-text-muted)] mb-1">Location</dt>
                      <dd className="font-medium">{profile?.location}</dd>
                    </div>
                  </dl>
                </>
              )}
            </Card>
          )}

          {activeTab !== 'Personal Info' && (
            <Card className="max-w-2xl py-12 text-center text-[var(--color-text-muted)]">
              <h3 className="font-semibold mb-2">{activeTab}</h3>
              <p className="text-sm">This section is currently under development.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
