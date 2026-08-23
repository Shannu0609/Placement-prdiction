import React from 'react';
import { useAuth } from '../context/AuthContext';
import GaugeChart from '../components/GaugeChart';
import { Sparkles, TrendingUp, Compass, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCcw, Award } from 'lucide-react';

const ResultPage = ({ setActiveTab }) => {
  const { currentPrediction } = useAuth();

  if (!currentPrediction) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Prediction Generated Yet</h2>
        <p className="text-xs text-gray-500">Please fill in your academic profile to generate ML insights.</p>
        <button
          onClick={() => setActiveTab('predict')}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg"
        >
          Go to Predict Form
        </button>
      </div>
    );
  }

  const {
    probability,
    category,
    categoryColor,
    salaryRange,
    minLpa,
    maxLpa,
    topRole,
    careerRecommendations = [],
    strengths = [],
    weaknesses = []
  } = currentPrediction;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 glass-card rounded-3xl border border-blue-500/20 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Analysis Complete</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Placement Intelligence Results
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Machine Learning analysis generated on {currentPrediction.timestamp || 'Today'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('predict')}
          className="px-4 py-2.5 rounded-xl glass-card text-xs font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-2"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>New Prediction</span>
        </button>
      </div>

      {/* Top 3 Result Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Placement Probability */}
        <div className="glass-card rounded-3xl p-6 flex flex-col items-center justify-between text-center space-y-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-gray-400 dark:text-slate-400 uppercase">Placement Probability</span>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">{category}</h3>
          </div>

          <GaugeChart
            percentage={probability}
            category={category}
            color={categoryColor}
            size={180}
          />

          <div className="text-xs text-gray-500 dark:text-slate-400">
            Random Forest Classifier confidence score
          </div>
        </div>

        {/* Card 2: Expected Salary Package */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-lg relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-gray-400 dark:text-slate-400 uppercase">Expected Salary Package</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 pt-2">
              {salaryRange}
            </h3>
          </div>

          <div className="space-y-3 bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            <div className="flex justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span>Estimated Min CTC:</span>
              <span>₹{minLpa} LPA</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span>Estimated Max CTC:</span>
              <span>₹{maxLpa} LPA</span>
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[70%] rounded-full"></div>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 dark:text-slate-400">
            Based on Random Forest Regressor regression model
          </p>
        </div>

        {/* Card 3: Top Matched Career Role */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-lg">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-gray-400 dark:text-slate-400 uppercase">Best Career Match</span>
              <Compass className="w-5 h-5 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 pt-2">
              {topRole}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-indigo-900 dark:text-indigo-300">
              <span>Role Compatibility</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px]">High Fit</span>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              Your coding logic and skill stack align strongly with core industry expectations for {topRole}.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('career')}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Explore All Career Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Career Recommendations Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Top Recommended Tech Roles</span>
          </h3>
          <button
            onClick={() => setActiveTab('career')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careerRecommendations.slice(0, 4).map((role, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-base font-bold text-gray-900 dark:text-white">{role.title}</h4>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">{role.match_percentage}% Match</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${role.match_percentage}%` }}
                ></div>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {role.matched_skills?.map((sk, sidx) => (
                  <span key={sidx} className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons to Skill Gap & Career pages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          onClick={() => setActiveTab('skill')}
          className="p-6 rounded-3xl glass-card hover:border-blue-500/50 transition-all text-left space-y-2 group"
        >
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Interactive Diagnostics</span>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-between">
            <span>Explore Skill Gap Analysis</span>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            View radar charts, strengths, weak areas, and actionable improvement recommendations.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="p-6 rounded-3xl glass-card hover:border-emerald-500/50 transition-all text-left space-y-2 group"
        >
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Records & Tracking</span>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-between">
            <span>View Prediction History</span>
            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Access previous prediction logs, compare improvements, and search past records.
          </p>
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
