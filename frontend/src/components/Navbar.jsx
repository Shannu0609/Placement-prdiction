import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Moon, Sun, User, LogOut, LayoutDashboard, ShieldCheck, Sparkles, BarChart3 } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { darkMode, toggleDarkMode, user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Placement Intel
              </span>
              <span className="hidden sm:inline-block ml-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                AI Powered
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'landing'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('predict')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'predict' || activeTab === 'result'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Predict</span>
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'career'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Careers
            </button>
            <button
              onClick={() => setActiveTab('skill')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'skill'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Skill Gap
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
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

            {/* Auth Buttons / Profile */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-gray-800 dark:text-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user?.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
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
