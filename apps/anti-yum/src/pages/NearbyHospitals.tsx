import { useDataFetch } from '../hooks/useDataFetch';
import { getHospitals } from '../api/mockData';
import { Card, Button, Skeleton } from '../components/ui';
import { Search, Filter, Phone, Navigation } from 'lucide-react';
import { Shuffle } from '../components/ui/Shuffle';

export function NearbyHospitals() {
  const { data: hospitals, isLoading } = useDataFetch(getHospitals);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Shuffle
            text="Nearby Hospitals"
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
          <p className="text-[var(--color-text-muted)] mt-1">Find hospitals and clinics near you</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search hospitals, clinics..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-sm"
          />
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Button variant="outline" size="sm" className="bg-slate-50 border-[var(--color-primary)] text-[var(--color-primary)]">All</Button>
          <Button variant="outline" size="sm" className="bg-white">Hospitals</Button>
          <Button variant="outline" size="sm" className="bg-white">Clinics</Button>
          <Button variant="outline" size="sm" className="bg-white">Pharmacies</Button>
          <Button variant="outline" size="sm" className="bg-white px-2"><Filter size={16} /></Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <div className="w-full lg:w-[400px] overflow-y-auto space-y-4 pr-2">
          {isLoading ? (
            [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
          ) : (
            hospitals?.map(hospital => (
              <Card key={hospital.id} className="p-4 flex gap-4">
                <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-slate-300"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{hospital.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">{hospital.distance} • {hospital.type}</p>
                  <div className="flex items-center text-xs font-semibold text-[var(--stat-orange)] mb-3">
                    <span className="mr-1">★</span> {hospital.rating} (124 reviews)
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs py-0">
                      <Phone size={14} className="mr-1" /> Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs py-0 text-[var(--color-primary)] border-blue-200 hover:bg-blue-50">
                      <Navigation size={14} className="mr-1" /> Directions
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        <Card className="flex-1 p-0 overflow-hidden relative min-h-[300px]">
          {/* Mock Map Image Background */}
          <div className="absolute inset-0 bg-blue-50 flex flex-col items-center justify-center border-4 border-white/50">
            <div className="relative w-full h-full">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              
              {/* Center User Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full"></div>
                </div>
              </div>

              {/* Mock Hospital Pins */}
              <div className="absolute top-1/3 left-1/3 w-8 h-8 text-red-500"><MapPinIcon /></div>
              <div className="absolute top-2/3 left-2/3 w-8 h-8 text-red-500"><MapPinIcon /></div>
              <div className="absolute bottom-1/4 left-1/2 w-8 h-8 text-red-500"><MapPinIcon /></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
    </svg>
  );
}
