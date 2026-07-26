import { useState } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
import { getUserProfile } from '../api/mockData';
import { Card, Button, Skeleton } from '../components/ui';
import { User, Bell, Lock, Smartphone, Palette } from 'lucide-react';
import { HoverGradientTabs } from '../components/ui/HoverGradientTabs';
import type { HoverGradientTabItem } from '../components/ui/HoverGradientTabs';
import { Shuffle } from '../components/ui/Shuffle';

export function Settings() {
  const { data: profile, isLoading } = useDataFetch(getUserProfile);
  const [activeTab, setActiveTab] = useState('Account');

  const tabs: HoverGradientTabItem[] = [
    { icon: <User className="h-4 w-4" />, label: "Account", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
    { icon: <Bell className="h-4 w-4" />, label: "Notifications", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
    { icon: <Lock className="h-4 w-4" />, label: "Privacy & Security", gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)", iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400" },
    { icon: <Smartphone className="h-4 w-4" />, label: "Connected Apps", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400" },
    { icon: <Palette className="h-4 w-4" />, label: "Appearance", gradient: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)", iconColor: "group-hover:text-teal-500 dark:group-hover:text-teal-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Settings"
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
          <p className="text-[var(--color-text-muted)] mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <HoverGradientTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'Account' && (
            <Card className="max-w-2xl">
              <h3 className="font-bold text-lg mb-6 pb-6 border-b border-[var(--color-border)]">Account Settings</h3>

              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                    <div className="w-1/3 text-sm text-[var(--color-text-muted)] font-medium">Email</div>
                    <div className="w-1/3 text-sm font-medium truncate">{profile?.email}</div>
                    <div className="w-1/3 text-right">
                      <Button variant="ghost" size="sm" className="text-[var(--color-primary)] hover:text-blue-700">Change</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                    <div className="w-1/3 text-sm text-[var(--color-text-muted)] font-medium">Phone Number</div>
                    <div className="w-1/3 text-sm font-medium">{profile?.phone}</div>
                    <div className="w-1/3 text-right">
                      <Button variant="ghost" size="sm" className="text-[var(--color-primary)] hover:text-blue-700">Change</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                    <div className="w-1/3 text-sm text-[var(--color-text-muted)] font-medium">Password</div>
                    <div className="w-1/3 text-sm font-medium text-[var(--color-text-muted)]">••••••••••••</div>
                    <div className="w-1/3 text-right">
                      <Button variant="ghost" size="sm" className="text-[var(--color-primary)] hover:text-blue-700">Change</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                    <div className="w-1/3 text-sm text-[var(--color-text-muted)] font-medium">Language</div>
                    <div className="w-1/3 text-sm font-medium">English</div>
                    <div className="w-1/3 text-right">
                      <select className="bg-transparent text-sm focus:outline-none cursor-pointer">
                        <option>English</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                    <div className="w-1/3 text-sm text-[var(--color-text-muted)] font-medium">Timezone</div>
                    <div className="w-1/3 text-sm font-medium">(GMT+05:30) Asia/Kolkata</div>
                    <div className="w-1/3 text-right">
                      <select className="bg-transparent text-sm focus:outline-none cursor-pointer">
                        <option>Asia/Kolkata</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
                    <div className="w-1/3 text-sm text-[var(--color-text-muted)] font-medium">Units</div>
                    <div className="w-1/3 text-sm font-medium">Metric (kg, cm, km)</div>
                    <div className="w-1/3 text-right">
                      <select className="bg-transparent text-sm focus:outline-none cursor-pointer">
                        <option>Metric</option>
                        <option>Imperial</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {activeTab !== 'Account' && (
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
