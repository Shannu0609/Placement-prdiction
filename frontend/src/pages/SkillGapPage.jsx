import React from 'react';
import { useAuth } from '../context/AuthContext';
import RadarChartComponent from '../components/RadarChartComponent';
import { CheckCircle2, AlertCircle, Sparkles, Target, ArrowRight, Lightbulb, BookOpen } from 'lucide-react';

const SkillGapPage = ({ setActiveTab }) => {
  const { currentPrediction } = useAuth();

  const pred = currentPrediction || {
    strengths: [
      "Strong Academic Foundation (CGPA: 8.5/10)",
      "Excellent Coding & Logic Skills (85/100)",
      "Solid Hands-on Portfolio (4 Projects)",
      "Recognized Industry Certifications (3 Certifications)",
      "Direct Industry Internship Experience"
    ],
    weaknesses: [
      "Communication Skills need practice (Current: 80/100)",
      "Aptitude Test speed optimization recommended"
    ],
    recommendations: [
      "Practice Data Structures and Algorithms daily on LeetCode / HackerRank",
      "Complete advanced SQL and Database Optimization Certification",
      "Participate in mock HR interviews and group discussions to elevate fluency",
      "Build one Full-Stack end-to-end cloud-deployed application project"
    ],
    radarData: [
      { subject: "Academics", score: 85 },
      { subject: "Coding", score: 85 },
      { subject: "Communication", score: 80 },
      { subject: "Aptitude", score: 78 },
      { subject: "Projects", score: 80 },
      { subject: "Certifications", score: 75 }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Skill Diagnostics Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Skill Gap Analysis & Improvement Plan
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Detailed diagnostic evaluation comparing your current candidate profile against industry benchmark criteria.
        </p>
      </div>

      {/* Main Grid: Radar Chart & Strengths vs Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Skill Radar Breakdown</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Normalized skill scores across 6 core parameters</p>
          </div>

          <RadarChartComponent data={pred.radarData} />

          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-slate-400 text-center">
            Targeting scores above 80 across all subjects yields a &gt;90% placement probability.
          </div>
        </div>

        {/* Strengths & Weaknesses Breakdown */}
        <div className="space-y-6">
          {/* Strengths Card */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border border-emerald-500/20">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>Core Strengths</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-slate-300">
              {pred.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses Card */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border border-amber-500/20">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Weak Areas & Bottlenecks</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-slate-300">
              {pred.weaknesses.map((wk, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                  <span>{wk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations Roadmap */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Actionable Skill Improvement Plan</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Step-by-step roadmap to boost placement probability</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pred.recommendations.map((rec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-[11px]">
                  {idx + 1}
                </span>
                <span>RECOMMENDATION #{idx + 1}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => setActiveTab('predict')}
          className="px-6 py-3 rounded-xl glass-card text-xs font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          ← Update Form Inputs
        </button>
        <button
          onClick={() => setActiveTab('career')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-2"
        >
          <span>View Career Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SkillGapPage;
