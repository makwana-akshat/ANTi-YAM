import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquareHeart, 
  Activity, 
  FileText, 
  MapPin, 
  User, 
  Settings,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Button, Card } from './ui';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/DropdownMenu';
import { FlowingNavItem } from './FlowingNavItem';
import { useDataFetch } from '../hooks/useDataFetch';
import { getUserProfile } from '../api/mockData';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: MessageSquareHeart, label: 'AI Health Companion', path: '/ai' },
  { icon: Activity, label: 'Health Logs', path: '/logs' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: MapPin, label: 'Nearby Hospitals', path: '/hospitals' },
];

export function AppShell() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: profile } = useDataFetch(getUserProfile);

  return (
    <div className="flex h-screen bg-[var(--color-bg-app)] text-[var(--color-text-main)] font-sans overflow-hidden">
      
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border)]
        flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center h-16 px-6 border-b border-[var(--color-border)] lg:border-none">
          <div className="flex items-center text-xl font-bold text-[var(--color-primary)]">
            <span className="text-2xl mr-2 text-[var(--color-primary)]">+</span>
            MediCare +
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setIsMobileOpen(false)}>
            <X size={20} className="text-[var(--color-text-muted)]" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <FlowingNavItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              onClick={() => setIsMobileOpen(false)}
            />
          ))}
        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar */}
        <header className="h-16 flex items-center px-4 lg:px-8 border-b border-[var(--color-border)] bg-[var(--color-bg-sidebar)]">
          <button 
            className="lg:hidden p-2 -ml-2 mr-2 text-[var(--color-text-muted)]"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-xs text-slate-400 bg-white border border-slate-200 rounded">⌘</kbd>
              <kbd className="px-1.5 py-0.5 text-xs text-slate-400 bg-white border border-slate-200 rounded">K</kbd>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <button className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer outline-none">
                  {profile ? (
                    <img src={profile.avatar} alt="Profile" className="w-8 h-8 rounded-full bg-slate-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex w-full items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="#" className="flex w-full items-center text-slate-500">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Terms & Conditions</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
