import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Save, CheckCircle, ShieldCheck, Edit3 } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'student@placement.edu',
    college: user?.college || 'National Institute of Technology',
    branch: user?.branch || 'Computer Science & Engineering',
    year: user?.year || '4th Year',
    studentStatus: user?.studentStatus || 'Final-Year Student',
    cgpa: user?.cgpa || 8.7,
    skills: user?.skills || ["Python", "React", "Node.js", "SQL", "Data Structures"],
    projects: user?.projects || [
      "Placement Intelligence System (React, ML)",
      "Real-Time Analytics Dashboard (Node.js)"
    ],
    experience: user?.experience || "Software Engineer Intern - CloudTech (3 Months)"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newProjectInput, setNewProjectInput] = useState('');

  const verificationStatus = user?.verificationStatus || 'VERIFIED'; // PENDING, VERIFIED, REJECTED, RESUBMISSION_REQUIRED

  const profileStrength = Math.round(
    (formData.name ? 15 : 0) +
    (formData.cgpa ? 15 : 0) +
    (formData.skills.length >= 3 ? 30 : 15) +
    (formData.projects.length >= 1 ? 20 : 0) +
    (verificationStatus === 'VERIFIED' ? 20 : 0)
  );

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

  const handleAddProject = () => {
    if (!newProjectInput) return;
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, newProjectInput]
    }));
    setNewProjectInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <User className="w-3.5 h-3.5 text-blue-500" />
          <span>Verified Student Profile & Resume Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Student Profile & Resume Verification
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Verify and edit extracted resume skills, manage educational proof documents, and monitor profile strength.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-sm font-bold text-center border border-emerald-300 dark:border-emerald-800 flex items-center justify-center space-x-2 shadow-lg">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>Profile changes saved & updated for job matching!</span>
        </div>
      )}

      {/* Verification Status Banner */}
      <div className={`p-6 rounded-3xl border space-y-2 ${
        verificationStatus === 'VERIFIED' ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' :
        verificationStatus === 'PENDING' ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800' :
        'bg-blue-50/60 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">Educational Verification Status</span>
          </div>
          <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
            verificationStatus === 'VERIFIED' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
          }`}>
            {verificationStatus}
          </span>
        </div>
        <p className="text-xs text-gray-600 dark:text-slate-300">
          {verificationStatus === 'VERIFIED'
            ? '✅ Educational documents verified by Admin. Unlocked for company job matching and proctored assessments.'
            : 'Your educational proof document is waiting for administrator verification.'}
        </p>
      </div>

      {/* Resume Profile Strength Card */}
      <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Resume Profile Strength</span>
          <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">{profileStrength}%</h3>
          <p className="text-xs text-gray-500">Completeness metric for company matching algorithms</p>
        </div>
        <div className="w-28 bg-gray-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full" style={{ width: `${profileStrength}%` }}></div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-gray-200 dark:border-slate-800 shadow-2xl">
        
        {/* Basic Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">College Name</label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Academic CGPA</label>
            <input
              type="number"
              step="0.1"
              value={formData.cgpa}
              onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-mono font-bold"
            />
          </div>
        </div>

        {/* Editable Extracted Skills */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
          <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Edit3 className="w-4 h-4 text-emerald-500" />
            <span>Extracted Skills (Click to add / edit)</span>
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

        {/* Editable Extracted Projects */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
          <label className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
            Extracted Project Portfolio
          </label>
          
          <div className="space-y-2">
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs font-medium text-gray-800 dark:text-slate-200 flex justify-between items-center">
                <span>{proj}</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }))}
                  className="text-red-500 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add project title & tech stack..."
              value={newProjectInput}
              onChange={(e) => setNewProjectInput(e.target.value)}
              className="flex-1 p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200"
            />
            <button
              type="button"
              onClick={handleAddProject}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              Add Project
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
        >
          <Save className="w-4 h-4" />
          <span>Save Extracted Profile Changes</span>
        </button>

      </form>
    </div>
  );
};

export default ProfilePage;
