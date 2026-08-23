import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import PredictPage from './pages/PredictPage';
import ResultPage from './pages/ResultPage';
import SkillGapPage from './pages/SkillGapPage';
import CareerRecommendPage from './pages/CareerRecommendPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function MainApp() {
  const [activeTab, setActiveTab] = useState('landing');
  const { isAuthenticated } = useAuth();

  const showSidebar = isAuthenticated && ['dashboard', 'predict', 'result', 'skill', 'career', 'history', 'profile', 'admin'].includes(activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <StudentDashboard setActiveTab={setActiveTab} />;
      case 'predict':
        return <PredictPage setActiveTab={setActiveTab} />;
      case 'result':
        return <ResultPage setActiveTab={setActiveTab} />;
      case 'skill':
        return <SkillGapPage setActiveTab={setActiveTab} />;
      case 'career':
        return <CareerRecommendPage setActiveTab={setActiveTab} />;
      case 'history':
        return <HistoryPage setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfilePage setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminDashboard />;
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} />;
      case 'register':
        return <RegisterPage setActiveTab={setActiveTab} />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-300">
      {/* Top Sticky Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showSidebar ? (
          <div className="flex gap-8 items-start">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 w-full min-w-0">
              {renderContent()}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {renderContent()}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
