
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from '../../features/auth/LoginPage';
import DashboardPage from '../../features/dashboard/DashboardPage';
import ChatPage from '../../features/chat/ChatPage';
import HealthLogsPage from '../../features/health-logs/HealthLogsPage';
import MedicationTrackerPage from '../../features/medication/MedicationTrackerPage';
import ReportsPage from '../../features/reports/ReportsPage';
import ProfilePage from '../../features/profile/ProfilePage';
import SettingsPage from '../../features/settings/SettingsPage';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/health-logs' element={<HealthLogsPage />} />
                <Route path='/medications' element={<MedicationTrackerPage />} />
                <Route path='/reports' element={<ReportsPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

