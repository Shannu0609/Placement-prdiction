import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BrainCircuit, Moon, Sun, LogOut, LayoutDashboard, Sparkles, 
  Briefcase, Users, Building2, ShieldCheck, FileCheck, ChevronDown,
  GraduationCap, UserCheck
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    darkMode, 
    toggleDarkMode, 
    user, 
    activeRole, 
    switchRole, 
    isAuthenticated, 
    logout 
  } = useAuth();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels = {
    student: { title: "Student Portal", icon: GraduationCap, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
    trainer: { title: "Trainer Portal", icon: Users, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
    company: { title: "Company Portal", icon: Building2, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
    admin: { title: "Admin Portal", icon: ShieldCheck, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" }
  };

  const currentRoleInfo = roleLabels[activeRole] || roleLabels.student;
  const RoleIcon = currentRoleInfo.icon;

  const handleRoleSelect = (roleKey) => {
    switchRole(roleKey);
    setRoleDropdownOpen(false);
    if (roleKey === 'student') setActiveTab('dashboard');
    else if (roleKey === 'trainer') setActiveTab('trainer_dashboard');
    else if (roleKey === 'company') setActiveTab('company_dashboard');
    else if (roleKey === 'admin') setActiveTab('admin');
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div
              onClick={() => setActiveTab('landing')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="p-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                  Placement Intel
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                  Ecosystem
                </span>
              </div>
            </div>

            {/* Quick Interactive Role Switcher Selector */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:scale-[1.02] ${currentRoleInfo.color}`}
              >
                <RoleIcon className="w-3.5 h-3.5" />
                <span>{currentRoleInfo.title}</span>
                <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 divide-y divide-gray-100 dark:divide-slate-800">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Switch Demo User Role
                  </div>
                  <div className="py-1">
                    {Object.entries(roleLabels).map(([key, info]) => {
                      const IconComp = info.icon;
                      const isSelected = activeRole === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handleRoleSelect(key)}
                          className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                            isSelected 
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold' 
                              : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                          <span className="flex-1 text-left">{info.title}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links based on active role */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'landing'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Home
            </button>

            {/* Student Links */}
            {activeRole === 'student' && (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Student Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab('ats_checker')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'ats_checker'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>ATS Resume Checker</span>
                </button>

                <button
                  onClick={() => setActiveTab('predict')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'predict' || activeTab === 'result'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Placement Predictor</span>
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'jobs'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>Browse Jobs</span>
                </button>
              </>
            )}

            {/* Trainer Links */}
            {activeRole === 'trainer' && (
              <button
                onClick={() => setActiveTab('trainer_dashboard')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'trainer_dashboard'
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Trainer Dashboard</span>
              </button>
            )}

            {/* Company Links */}
            {activeRole === 'company' && (
              <button
                onClick={() => setActiveTab('company_dashboard')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'company_dashboard'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Company Recruitment Center</span>
              </button>
            )}

            {/* Admin Links */}
            {activeRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Ecosystem Dashboard</span>
              </button>
            )}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* User Profile & Auth */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="max-w-[110px] truncate leading-tight">{user?.name}</span>
                    <span className="text-[10px] font-medium text-gray-400 capitalize">{activeRole}</span>
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
