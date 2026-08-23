import React from 'react';
import { LayoutDashboard, Sparkles, History, Target, BarChart2, User, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout, user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'predict', label: 'New Prediction', icon: Sparkles, badge: 'ML' },
    { id: 'career', label: 'Career Recommendations', icon: Target },
    { id: 'skill', label: 'Skill Gap Analysis', icon: BarChart2 },
    { id: 'history', label: 'Prediction History', icon: History },
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, highlight: true },
  ];

  return (
    <aside className="w-64 glass-card rounded-2xl p-4 flex flex-col justify-between h-[calc(100vh-6rem)] sticky top-20 hidden lg:flex">
      <div>
        {/* Profile Card Summary */}
        <div className="p-3 mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-900/80 border border-blue-100 dark:border-slate-700/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              {user?.name ? user.name[0].toUpperCase() : 'S'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name || 'Student Candidate'}</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user?.branch || 'Computer Science'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Navigation Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'predict' && activeTab === 'result');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : item.highlight
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
