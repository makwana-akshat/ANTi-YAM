
import StatStrip from './StatStrip';
import TimelineWidget from './TimelineWidget';
import HeroGradientCard from './HeroGradientCard';
import BiomarkerCard from './BiomarkerCard';
import SupplementCard from './SupplementCard';
import { DocumentCard, DeviceConnectionCard, PendingResultsCard } from './RecordsSection';
import { User } from 'lucide-react';
import { Routes, Route, useLocation, Link, useParams } from 'react-router-dom';
import type { CategoryType } from '../App';
import TriageView from './views/TriageView';
import DeepDiveView from './views/DeepDiveView';
import RadialBalanceView from './views/RadialBalanceView';
import TimelineView from './views/TimelineView';
import RecordsView from './views/RecordsView';
import ProfileView from './views/ProfileView';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryRouter = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  if (['heart', 'metabolic', 'blood'].includes(id)) return <DeepDiveView category={id as CategoryType} />;
  if (['nutrients', 'hormone'].includes(id)) return <RadialBalanceView category={id as CategoryType} />;
  return <TimelineView category={id as CategoryType} />;
};

export default function MainContent() {
  const location = useLocation();
  
  const Overview = () => (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8 xl:gap-12">
            <div className="flex flex-col gap-10 flex-1 w-full">
              <header>
                <h1 className="text-[44px] font-medium tracking-tight text-text-primary">Sophia Caldwell</h1>
              </header>
              <StatStrip />
              <TimelineWidget />
            </div>

            {/* Right side area */}
            <div className="flex flex-col gap-6 shrink-0 xl:w-[480px] w-full">
              {/* Top Icons */}
              <div className="flex justify-end gap-2 w-full h-12">

                <Link 
                  to="/profile"
                  className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border-hairline/50 hover:shadow-md hover:bg-surface-muted transition-all text-text-primary"
                >
                  <User className="w-5 h-5" />
                </Link>
              </div>
              {/* Cards */}
              <div className="grid grid-cols-2 gap-4 h-[300px] mt-2">
                 <DocumentCard />
                 <DeviceConnectionCard />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HeroGradientCard 
              colorRamp="green" 
              decoration="chart"
              title="Anti-YAM Score" 
              value={70} 
              subtext="On Track" 
            />
            <HeroGradientCard 
              colorRamp="orange" 
              decoration="ruler"
              title="Biological age" 
              value={25} 
              subtext="2.5 years younger" 
            />
            <PendingResultsCard />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
            {/* Biomarkers */}
            <div className="min-w-0">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-[28px] font-medium mb-1">Biomarkers</h2>
                  <p className="text-text-secondary text-base">A snapshot of what's happening inside your body.</p>
                </div>
                <button className="bg-surface rounded-full px-5 py-2 text-sm font-semibold shadow-sm border border-border-hairline/50 hover:bg-surface-muted transition-colors shrink-0 ml-4">
                  See All
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 <BiomarkerCard type="heart" category="Heart Health" value={103} unit="mg/dl" label="LDL Cholesterol" position={0.3} />
                 <BiomarkerCard type="nutrients" category="Nutrients" value={43} unit="ng/dl" label="Vitamin C" position={0.7} />
                 <BiomarkerCard type="heart" category="Heart Health" value={42} unit="mg/dl" label="Apolipoprotein B" position={0.4} />
                 <BiomarkerCard type="blood" category="Blood" value={5.4} unit="%" label="HbA1c" position={0.5} />
              </div>
            </div>

            {/* Supplements */}
            <div className="min-w-0">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-[28px] font-medium mb-1">Top Supplements for You</h2>
                  <p className="text-text-secondary text-base truncate">Support your balance with supplements picked for you.</p>
                </div>
                <button className="bg-surface rounded-full px-5 py-2 text-sm font-semibold shadow-sm border border-border-hairline/50 hover:bg-surface-muted transition-colors shrink-0 ml-4">
                  See All
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 <SupplementCard type="green" badge="Best Seller" title="Ashwa Balance Extract" price="$24.30" />
                 <SupplementCard type="blue" badge="Best Seller" title="SleepWell L-Theanine" price="$19.90" />
                 <SupplementCard type="orange" badge="Top Price" title="Corti-Shield PS" price="$45.00" />
              </div>
            </div>
          </div>
        </div>
      );


  return (
    <main className="flex-1 max-w-[1400px] w-full p-6 md:p-10 lg:p-12 overflow-x-hidden mx-auto relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Overview />} />
            <Route path="/category/:id" element={<CategoryRouter />} />
            <Route path="/records" element={<RecordsView />} />
            <Route path="/triage" element={<TriageView />} />
            <Route path="/profile" element={<ProfileView />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
