import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, BrainCircuit, ShieldCheck, Users, Building2, GraduationCap } from 'lucide-react';

const LoginPage = ({ setActiveTab, initialRole }) => {
  const { login, loginWithGoogle, resetPassword, activeRole } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(initialRole || activeRole || 'student');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in both Email Address and Password.');
      return;
    }

    const res = login(email, password, selectedRole);
    if (!res.success) {
      setError(res.message || 'Invalid credentials. Please check your email and password.');
      return;
    }

    // Redirect according to authenticated user role
    const userRole = res.user?.role || selectedRole;
    redirectRole(userRole);
  };

  const redirectRole = (roleKey) => {
    if (roleKey === 'student') setActiveTab('dashboard');
    else if (roleKey === 'trainer') setActiveTab('trainer_dashboard');
    else if (roleKey === 'company') setActiveTab('company_dashboard');
    else if (roleKey === 'admin') setActiveTab('admin');
  };

  const handleExecuteGoogleLogin = async (accountEmail = "", accountName = "") => {
    const res = await loginWithGoogle(accountEmail, accountName, selectedRole);
    setShowGoogleModal(false);
    if (res.success) {
      redirectRole(res.user?.role || selectedRole);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(resetEmail);
    setResetMsg(res.message);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 space-y-6 border border-gray-200 dark:border-slate-800 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 mb-1">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {selectedRole === 'company' ? 'Company HR Portal Sign In' :
             selectedRole === 'student' ? 'Student Portal Sign In' :
             selectedRole === 'admin' ? 'Placement Admin System Login' :
             'Placement Intelligence Login'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">Multi-Role Authenticated Portal</p>
        </div>

        {/* Role Selector Pills */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl">
          {[
            { id: 'student', label: 'Student', icon: GraduationCap },
            { id: 'trainer', label: 'Trainer', icon: Users },
            { id: 'company', label: 'Company', icon: Building2 },
            { id: 'admin', label: 'Admin', icon: ShieldCheck }
          ].map((role) => {
            const Icon = role.icon;
            const isSel = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all ${
                  isSel
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={() => setShowGoogleModal(true)}
          className="w-full py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center space-x-2.5 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.01]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign In with Google (Gmail Authentication)</span>
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-gray-200 dark:border-slate-800 w-full"></div>
          <span className="bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-gray-400 absolute">Or Enter Credentials</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${selectedRole}@placement.edu`}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>Sign In as {selectedRole.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 dark:border-slate-800">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => setActiveTab('register')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      {/* Google OAuth Account Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-sm w-full p-6 space-y-4 shadow-2xl">
            
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Google Account Sign In</h3>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <p className="text-xs text-gray-500 dark:text-slate-400">
              Select an account to sign in to Placement Intelligence as <strong className="text-blue-600 capitalize">{selectedRole}</strong>:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleExecuteGoogleLogin("aarav.sharma@gmail.com", "Aarav Sharma")}
                className="w-full p-3 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 bg-gray-50 dark:bg-slate-800/60 flex items-center space-x-3 text-left transition-all"
              >
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Google Profile" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Aarav Sharma</h4>
                  <p className="text-[10px] text-gray-400">aarav.sharma@gmail.com</p>
                </div>
              </button>

              <button
                onClick={() => handleExecuteGoogleLogin("sophia.chen@gmail.com", "Sophia Chen")}
                className="w-full p-3 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 bg-gray-50 dark:bg-slate-800/60 flex items-center space-x-3 text-left transition-all"
              >
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Google Profile" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Sophia Chen</h4>
                  <p className="text-[10px] text-gray-400">sophia.chen@gmail.com</p>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Or Enter Custom Gmail Account</span>
              <input
                type="email"
                placeholder="your.name@gmail.com"
                value={customGoogleEmail}
                onChange={(e) => setCustomGoogleEmail(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
              />
              <button
                onClick={() => handleExecuteGoogleLogin(customGoogleEmail, customGoogleName)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                Sign In with Google
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Forgot Password</h3>
              <button onClick={() => setShowForgotModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold">✕</button>
            </div>

            {resetMsg ? (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold text-center">
                {resetMsg}
              </div>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Enter your registered email address and we will send password reset instructions.
                </p>
                <input
                  type="email"
                  required
                  placeholder="name@placement.edu"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
