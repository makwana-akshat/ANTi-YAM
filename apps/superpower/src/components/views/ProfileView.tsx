import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Settings, Shield, Bell, Smartphone, Watch, Activity, ChevronRight, LogOut, CheckCircle2, Plus } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ProfileView() {
  return (
    <div className="w-full h-full pb-32">
      <div className="flex flex-col gap-12 max-w-5xl mx-auto pt-8">
        
        {/* Header / Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-surface to-surface-muted rounded-[40px] p-10 overflow-hidden border border-border-hairline shadow-sm"
        >
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-lime/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-lg shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-col items-center md:items-start flex-1 mt-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-text-primary tracking-tight">Sophia Caldwell</h1>
                <div className="px-3 py-1 bg-text-primary text-canvas text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Pro Member
                </div>
              </div>
              <p className="text-text-secondary text-lg mb-6">sophia.caldwell@example.com</p>
              
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-light text-text-primary tracking-tighter">8</span>
                  <span className="text-text-tertiary text-xs uppercase font-bold tracking-wider">Connected Devices</span>
                </div>
                <div className="w-px h-10 bg-border-hairline mt-2" />
                <div className="flex flex-col">
                  <span className="text-3xl font-light text-text-primary tracking-tighter">24</span>
                  <span className="text-text-tertiary text-xs uppercase font-bold tracking-wider">Lab Uploads</span>
                </div>
                <div className="w-px h-10 bg-border-hairline mt-2" />
                <div className="flex flex-col">
                  <span className="text-3xl font-light text-text-primary tracking-tighter">1.2k</span>
                  <span className="text-text-tertiary text-xs uppercase font-bold tracking-wider">Days Tracked</span>
                </div>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-surface rounded-full border border-border-hairline shadow-sm hover:shadow-md hover:bg-surface-muted transition-all font-semibold text-text-primary text-sm shrink-0">
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            
            <motion.section variants={itemVariants} className="bg-surface rounded-[32px] p-8 border border-border-hairline/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">Connected Devices</h2>
                <button className="text-text-tertiary hover:text-text-primary transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4">
                {[
                  { name: 'Oura Ring Gen 3', status: 'Syncing automatically', icon: Watch, active: true },
                  { name: 'Apple Health', status: 'Last synced 2 hours ago', icon: Activity, active: true },
                  { name: 'Dexcom G7', status: 'Not connected', icon: Smartphone, active: false }
                ].map((device, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface-muted/50 border border-border-hairline hover:bg-surface-muted transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${device.active ? 'bg-text-primary text-canvas' : 'bg-surface border border-border-hairline text-text-tertiary'}`}>
                        <device.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{device.name}</h3>
                        <p className="text-sm text-text-secondary">{device.status}</p>
                      </div>
                    </div>
                    {device.active ? (
                      <CheckCircle2 className="w-5 h-5 text-accent-lime opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-sm font-medium text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">Connect</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="bg-surface rounded-[32px] p-8 border border-border-hairline/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h2 className="text-xl font-bold text-text-primary mb-6">Preferences</h2>
              <div className="flex flex-col gap-2">
                {[
                  { title: 'Notifications', desc: 'Push, email, and SMS alerts', icon: Bell },
                  { title: 'Privacy & Data', desc: 'Manage biometric sharing', icon: Shield },
                  { title: 'App Settings', desc: 'Theme, units, and appearance', icon: Settings }
                ].map((pref, i) => (
                  <button key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-muted transition-colors text-left group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-muted border border-border-hairline flex items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
                        <pref.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{pref.title}</h3>
                        <p className="text-sm text-text-secondary">{pref.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </motion.section>
            
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <motion.section variants={itemVariants} className="bg-gradient-to-br from-text-primary to-text-secondary rounded-[32px] p-8 text-canvas relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full -translate-y-1/4 translate-x-1/4" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Anti-YAM Pro</h2>
                <p className="text-white/70 mb-8 max-w-sm">You are on the highest tier. You have access to unlimited lab uploads, 24/7 AI health coaching, and priority biomarker analysis.</p>
                
                <div className="flex items-center justify-between p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                  <div>
                    <div className="text-sm text-white/60 uppercase font-bold tracking-wider mb-1">Next Billing</div>
                    <div className="font-semibold text-lg">Oct 14, 2026</div>
                  </div>
                  <button className="px-5 py-2.5 bg-white text-text-primary font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-md">
                    Manage Plan
                  </button>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="flex flex-col gap-2 mt-4">
              <button className="flex items-center gap-3 p-5 rounded-2xl hover:bg-surface-muted transition-colors text-status-red font-semibold w-full text-left">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </motion.section>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
