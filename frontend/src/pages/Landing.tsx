import { Button } from '../components/ui';
import { Link } from 'react-router-dom';
import { FlowingMenu } from '../components/FlowingMenu';

const demoItems = [
  { link: '/', text: 'AI Health Companion', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { link: '/', text: 'Track Vitals', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { link: '/', text: 'Medical Reports', image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { link: '/', text: 'Find Hospitals', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
];

export function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-app)] flex flex-col font-sans">
      
      {/* Header */}
      <header className="h-20 flex items-center px-8 border-b border-[var(--color-border)] bg-white">
        <div className="flex items-center text-2xl font-bold text-[var(--color-primary)]">
          <span className="text-3xl mr-2 text-[var(--color-primary)]">+</span>
          ANTi-YAM
        </div>
        <div className="ml-auto flex space-x-4">
          <Link to="/">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        
        {/* Hero Band */}
        <section className="w-full h-[600px] relative">
          <FlowingMenu 
            items={demoItems} 
            bgColor="#f8fafc" 
            textColor="#0ea5e9" 
            marqueeBgColor="#0ea5e9" 
            marqueeTextColor="#ffffff" 
            borderColor="#e2e8f0" 
          />
        </section>

        {/* Emergency Band */}
        <section className="w-full bg-slate-50 border-t border-[var(--color-border)] py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Need Immediate Help?</h2>
            <p className="text-slate-600 mb-8">Contact emergency services or locate the nearest hospital immediately.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 focus:ring-red-600 w-full sm:w-auto text-lg px-8">
                Call Emergency
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 border-slate-300 text-slate-700">
                Find Nearest Hospital
              </Button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
