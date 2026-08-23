import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, School, BookOpen, Calendar, Code, Save, CheckCircle, Sparkles } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    college: user?.college || 'Institute of Technology',
    branch: user?.branch || 'Computer Science & Engineering',
    year: user?.year || '4th Year',
    skills: user?.skills || ["Python", "React", "SQL", "Data Structures"]
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableSkills = [
    "Python", "Java", "C++", "JavaScript", "React", "Node.js",
    "SQL", "Data Structures", "Machine Learning", "Cloud Computing", "Git", "Docker"
  ];

  const handleSkillToggle = (sk) => {
    setFormData(prev => {
      const exists = prev.skills.includes(sk);
      if (exists) {
        return { ...prev, skills: prev.skills.filter(s => s !== sk) };
      } else {
        return { ...prev, skills: [...prev.skills, sk] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <User className="w-3.5 h-3.5 text-blue-500" />
          <span>Student Account & Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Student Profile Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Manage your personal information, college records, and default skill portfolio.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-sm font-bold text-center border border-emerald-300 dark:border-emerald-800 flex items-center justify-center space-x-2 shadow-lg">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-gray-200 dark:border-slate-800 shadow-2xl">
        {/* Avatar header */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-900/80 border border-blue-100 dark:border-slate-700">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-lg">
            {formData.name[0]?.toUpperCase() || 'S'}
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{formData.name}</h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{formData.branch}</p>
            <p className="text-xs text-gray-400">{formData.college}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">College / Institute Name</label>
            <div className="relative">
              <School className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Branch</label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Academic Year</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skill Portfolio Chips */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
          <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Code className="w-4 h-4 text-emerald-500" />
            <span>Technical Skills Portfolio</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((sk) => {
              const isSelected = formData.skills.includes(sk);
              return (
                <button
                  type="button"
                  key={sk}
                  onClick={() => handleSkillToggle(sk)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}{sk}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
