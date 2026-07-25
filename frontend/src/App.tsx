import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CustomCursor from './components/ui/CustomCursor';

export type TabType = 'Data' | 'Records' | 'Triage' | 'Profile';
export type CategoryType = 'overview' | 'longevity' | 'heart' | 'thyroid' | 'immune' | 'hormone' | 'metabolic' | 'nutrients' | 'blood';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-canvas text-text-primary font-sans selection:bg-accent-lime selection:text-accent-lime-text">
        <CustomCursor />
        <Sidebar />
        <MainContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
