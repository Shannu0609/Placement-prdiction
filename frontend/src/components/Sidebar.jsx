import React from 'react';
import { 
  LayoutDashboard, Sparkles, History, Target, BarChart2, User, 
  ShieldCheck, LogOut, FileCheck, Briefcase, Users, Building2, 
  Mail, Bell, Layers, CheckSquare, Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout, user, activeRole } = useAuth();

  const roleNavItems = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'ats_checker', label: 'ATS Resume Checker', icon: FileCheck, badge: 'ATS' },
      { id: 'predict', label: 'Placement Predictor', icon: Sparkles, badge: 'AI' },
      { id: 'jobs', label: 'Browse Jobs & Matches', icon: Briefcase },
      { id: 'assessment', label: 'Proctored Assessment', icon: Award, badge: '150m' },
      { id: 'career', label: 'Career Paths', icon: Target },
      { id: 'skill', label: 'Skill Gap Analysis', icon: BarChart2 },
      { id: 'history', label: 'Prediction History', icon: History },
      { id: 'profile', label: 'Student Profile', icon: User },
    ],
    trainer: [
      { id: 'trainer_dashboard', label: 'Trainer Overview', icon: Users },
      { id: 'trainer_students', label: 'Assigned Students', icon: Layers },
      { id: 'trainer_announcements', label: 'Announcements Hub', icon: Bell },
      { id: 'trainer_feedback', label: 'Feedback Notes', icon: CheckSquare },
      { id: 'profile', label: 'Trainer Profile', icon: User }
    ],
    company: [
      { id: 'company_dashboard', label: 'Recruitment Hub', icon: Building2 },
      { id: 'company_candidates', label: 'Candidate Search', icon: Users, badge: 'Search' },
      { id: 'company_jobs', label: 'Manage Job Postings', icon: Briefcase },
      { id: 'company_emails', label: 'Candidate Emails', icon: Mail },
      { id: 'profile', label: 'Company Profile', icon: User }
    ],
    admin: [
      { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, highlight: true },
      { id: 'verification_center', label: 'Verification Center', icon: FileCheck, badge: 'Proofs' },
      { id: 'admin_approvals', label: 'Company Verification', icon: CheckSquare },
      { id: 'admin_users', label: 'Manage Users', icon: Users }
    ]
  };

  const navItems = roleNavItems[activeRole] || roleNavItems.student;

  return (
    <aside className="w-64 glass-card rounded-2xl p-4 flex flex-col justify-between h-[calc(100vh-6rem)] sticky top-20 hidden lg:flex border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
      <div>
        {/* Profile Summary Card */}
        <div className="p-3 mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-900/80 border border-blue-100 dark:border-slate-700/60">
          <div className="flex items-center space-x-3">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            )}
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name || 'User Candidate'}</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 capitalize font-medium truncate">{activeRole} Account</p>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            {activeRole} Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'predict' && activeTab === 'result');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : item.highlight
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
