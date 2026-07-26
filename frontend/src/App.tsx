import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AuthSync } from './components/AuthSync';
import { AppShell } from './components/AppShell';
import { Dashboard } from './pages/Dashboard';
import { AiCompanion } from './pages/AiCompanion';
import { HealthLogs } from './pages/HealthLogs';
import { Reports } from './pages/Reports';
import { NearbyHospitals } from './pages/NearbyHospitals';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { Premium } from './pages/Premium';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route 
          path="/" 
          element={
            <>
              <SignedIn>
                <AuthSync>
                  <AppShell />
                </AuthSync>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="ai" element={<AiCompanion />} />
          <Route path="logs" element={<HealthLogs />} />
          <Route path="reports" element={<Reports />} />
          <Route path="hospitals" element={<NearbyHospitals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="premium" element={<Premium />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
