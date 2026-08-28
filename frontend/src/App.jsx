import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
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

// Path to Tab State Mapper
const mapPathToTab = (pathname) => {
  const path = pathname.toLowerCase();
  if (path === '/login') return { tab: 'login', role: 'student' };
  if (path === '/student-login') return { tab: 'login', role: 'student' };
  if (path === '/company-login') return { tab: 'login', role: 'company' };
  if (path === '/admin-login') return { tab: 'login', role: 'admin' };
  if (path === '/register' || path === '/signup') return { tab: 'register', role: 'student' };
  if (path === '/student-register' || path === '/student-signup') return { tab: 'register', role: 'student' };
  if (path === '/company-register' || path === '/company-signup') return { tab: 'register', role: 'company' };
  if (path === '/dashboard' || path === '/student-dashboard') return { tab: 'dashboard' };
  if (path === '/company-dashboard') return { tab: 'company_dashboard' };
  if (path === '/trainer-dashboard') return { tab: 'trainer_dashboard' };
  if (path === '/admin' || path === '/admin-dashboard') return { tab: 'admin' };
  if (path === '/ats-checker') return { tab: 'ats_checker' };
  if (path === '/jobs') return { tab: 'jobs' };
  if (path === '/assessment') return { tab: 'assessment' };
  if (path === '/verification-center') return { tab: 'verification_center' };
  if (path === '/profile') return { tab: 'profile' };
  return { tab: 'landing' };
};

function MainApp() {
  const initialMap = mapPathToTab(window.location.pathname);
  const [activeTab, setActiveTabState] = useState(initialMap.tab);
  const [loginRolePreset, setLoginRolePreset] = useState(initialMap.role || 'student');
  const { isAuthenticated } = useAuth();

  const setActiveTab = (tabId, rolePreset = null) => {
    setActiveTabState(tabId);
    if (rolePreset) setLoginRolePreset(rolePreset);
    
    // Update browser URL bar cleanly without page reload
    let newPath = '/';
    if (tabId === 'login') {
      newPath = rolePreset === 'company' ? '/company-login' : '/login';
    } else if (tabId === 'register') {
      newPath = '/register';
    } else if (tabId === 'dashboard') {
      newPath = '/dashboard';
    } else if (tabId === 'company_dashboard') {
      newPath = '/company-dashboard';
    } else if (tabId === 'trainer_dashboard') {
      newPath = '/trainer-dashboard';
    } else if (tabId === 'admin') {
      newPath = '/admin';
    } else if (tabId !== 'landing') {
      newPath = `/${tabId.replace('_', '-')}`;
    }
    
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab: tabId }, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const targetMap = mapPathToTab(window.location.pathname);
      setActiveTabState(targetMap.tab);
      if (targetMap.role) setLoginRolePreset(targetMap.role);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

      // Dedicated Auth Routes (/login, /register, /student-login, /company-login)
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} initialRole={loginRolePreset} />;
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
    <ErrorBoundary>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}
