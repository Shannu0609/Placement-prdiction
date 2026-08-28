import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AtsCheckerPage from './pages/AtsCheckerPage';
import PredictPage from './pages/PredictPage';
import ResultPage from './pages/ResultPage';
import SkillGapPage from './pages/SkillGapPage';
import CareerRecommendPage from './pages/CareerRecommendPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import JobsPage from './pages/JobsPage';
import AssessmentPage from './pages/AssessmentPage';
import VerificationCenterPage from './pages/VerificationCenterPage';
import TrainerDashboard from './pages/TrainerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function MainApp() {
  const [activeTab, setActiveTab] = useState('landing');
  const { isAuthenticated } = useAuth();

  const showSidebar = isAuthenticated && [
    'dashboard', 'ats_checker', 'predict', 'result', 'skill', 'career', 
    'history', 'profile', 'jobs', 'assessment', 'verification_center',
    'trainer_dashboard', 'trainer_students', 'trainer_announcements', 'trainer_feedback',
    'company_dashboard', 'company_candidates', 'company_jobs', 'company_emails',
    'admin', 'admin_approvals', 'admin_users', 'admin_analytics'
  ].includes(activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      
      // Student Routes
      case 'dashboard':
        return <StudentDashboard setActiveTab={setActiveTab} />;
      case 'ats_checker':
        return <AtsCheckerPage setActiveTab={setActiveTab} />;
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
      case 'jobs':
        return <JobsPage setActiveTab={setActiveTab} />;
      case 'assessment':
        return <AssessmentPage setActiveTab={setActiveTab} />;

      // Admin Verification Center Route
      case 'verification_center':
        return <VerificationCenterPage />;

      // Trainer Routes
      case 'trainer_dashboard':
      case 'trainer_students':
      case 'trainer_announcements':
      case 'trainer_feedback':
        return <TrainerDashboard />;

      // Company Routes
      case 'company_dashboard':
      case 'company_candidates':
      case 'company_jobs':
      case 'company_emails':
        return <CompanyDashboard />;

      // Admin Routes
      case 'admin':
      case 'admin_approvals':
      case 'admin_users':
      case 'admin_analytics':
        return <AdminDashboard setActiveTab={setActiveTab} />;

      // Auth Routes
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
