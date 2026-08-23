import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, School, BookOpen, Lock, ArrowRight, BrainCircuit, Calendar } from 'lucide-react';

const RegisterPage = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeName: '',
    branch: 'Computer Science & Engineering',
    year: '4th Year',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.fullName || !formData.email || !formData.collegeName) {
      setError('Please fill in all required fields');
      return;
    }

    login(formData.email, formData.password, {
      name: formData.fullName,
      email: formData.email,
      college: formData.collegeName,
      branch: formData.branch,
      year: formData.year,
      skills: ["Python", "JavaScript", "SQL"]
    });
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full glass-card rounded-3xl p-8 space-y-6 border border-gray-200 dark:border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 mb-1">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Create Student Account</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">Join the Placement Intelligence Platform</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@college.edu"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">College / University Name</label>
            <div className="relative">
              <School className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                name="collegeName"
                required
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Institute of Technology"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Branch</label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                >
                  <option value="Computer Science & Engineering">Computer Science & Eng</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & ML">AI & Data Science</option>
                  <option value="Electronics & Communication">Electronics & Comm</option>
                  <option value="Electrical Engineering">Electrical Eng</option>
                  <option value="Mechanical Engineering">Mechanical Eng</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Academic Year</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year (Final Year)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>Register & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 dark:border-slate-800">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
