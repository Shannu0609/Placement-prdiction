import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, TrendingUp, Compass, Award, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';
import GaugeChart from '../components/GaugeChart';

const StudentDashboard = ({ setActiveTab }) => {
  const { user, currentPrediction } = useAuth();

  // Fallback demo data if user hasn't run a prediction yet
  const pred = currentPrediction || {
    probability: 88,
    category: "High Chance",
    categoryColor: "#22C55E",
    salaryRange: "₹7.0 LPA – ₹11.0 LPA",
    topRole: "Software Developer",
    strengths: [
      "Strong Academic CGPA (8.5/10)",
      "High Coding & Logic Score (85/100)",
      "Completed Industrial Internship"
    ],
    weaknesses: [
      "Communication Score (70/100) can be elevated",
      "Only 1 Industry Certification"
    ]
  };

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Placement Intelligence Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student Candidate'}! 👋
          </h1>
          <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
            Your profile is being actively analyzed by our Random Forest Machine Learning engines. Explore your latest placement probability and recommended career roadmap below.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('predict')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs shadow-lg flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Run New ML Prediction</span>
            </button>
            <button
              onClick={() => setActiveTab('skill')}
              className="px-5 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-colors"
            >
              View Skill Gap Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-slate-400">
            <span>PLACEMENT CHANCE</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {pred.probability}%
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
              style={{ backgroundColor: pred.categoryColor }}
            >
              {pred.category}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-slate-400">Random Forest Classifier</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-slate-400">
            <span>EXPECTED SALARY</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {pred.salaryRange}
          </div>
          <p className="text-[11px] text-gray-500 dark:text-slate-400">Random Forest Regressor CTC</p>
        </div>

        {/* Stat 3 */}
        <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-slate-400">
            <span>CAREER MATCH</span>
            <Compass className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 truncate">
            {pred.topRole}
          </div>
          <p className="text-[11px] text-gray-500 dark:text-slate-400">Top Algorithmic Match</p>
        </div>

        {/* Stat 4 */}
        <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 dark:text-slate-400">
            <span>SKILLS STRENGTH</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            84 <span className="text-xs text-gray-400 font-normal">/ 100</span>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-slate-400">Technical & Aptitude Score</p>
        </div>
      </div>

      {/* Main Grid: Probability Gauge & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Circular Probability Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col items-center justify-between space-y-6 text-center">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Placement Gauge</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Real-time candidate evaluation</p>
          </div>

          <GaugeChart
            percentage={pred.probability}
            category={pred.category}
            color={pred.categoryColor}
            size={200}
          />

          <div className="w-full pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-around text-center">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase">CGPA</p>
              <p className="text-sm font-extrabold text-gray-800 dark:text-slate-200">{user?.cgpa || '8.5'}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Coding</p>
              <p className="text-sm font-extrabold text-gray-800 dark:text-slate-200">85/100</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Projects</p>
              <p className="text-sm font-extrabold text-gray-800 dark:text-slate-200">4</p>
            </div>
          </div>
        </div>

        {/* Right Column: Strengths & Weaknesses Quick Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Strengths Card */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Profile Strengths</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
              {pred.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weak Areas Card */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>Key Areas for Improvement</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
              {pred.weaknesses.map((wk, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                  <span>{wk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
