import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { Shuffle } from '../components/ui/Shuffle';

export function Premium() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      // Redirect to the Premium application
      window.location.href = 'http://localhost:3000';
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Premium"
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
          <p className="text-[var(--color-text-muted)] mt-1">Unlock all advanced health features</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <Card className="p-6 border-blue-200 bg-blue-50/50 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Pro Plan</h3>
            <div className="text-4xl font-extrabold text-blue-600 mb-4">$9<span className="text-lg text-blue-400 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8 text-sm text-blue-800 font-medium">
              <li className="flex items-center">✓ Advanced Health Insights</li>
              <li className="flex items-center">✓ Unlimited AI Companion</li>
              <li className="flex items-center">✓ Priority Doctor Appointments</li>
              <li className="flex items-center">✓ Export Detailed Reports</li>
            </ul>
            <Button 
              className="w-full" 
              onClick={handleSubscribe} 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Payment..." : "Subscribe Now"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
