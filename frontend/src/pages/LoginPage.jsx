import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, BrainCircuit, KeyRound } from 'lucide-react';

const LoginPage = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both Email and Password');
      return;
    }
    login(email, password);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 space-y-8 border border-gray-200 dark:border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 mb-2">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">Sign in to your Placement Intelligence account</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to your email!"); }} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100 dark:border-slate-800">
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
    </div>
  );
};

export default LoginPage;
