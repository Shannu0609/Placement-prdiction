import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, CheckCircle2, AlertCircle, ArrowRight, Code2, Database, Layout, Server, BrainCircuit, Terminal, Cloud } from 'lucide-react';

const CareerRecommendPage = ({ setActiveTab }) => {
  const { currentPrediction } = useAuth();

  const recommendations = currentPrediction?.careerRecommendations || [
    {
      title: "Software Developer",
      match_percentage: 92,
      required_skills: ["Data Structures", "Java", "C++", "Git", "Python"],
      matched_skills: ["Python", "Data Structures", "Git"],
      missing_skills: ["Java", "C++"]
    },
    {
      title: "Data Analyst",
      match_percentage: 85,
      required_skills: ["Python", "SQL"],
      matched_skills: ["Python", "SQL"],
      missing_skills: ["Excel", "PowerBI"]
    },
    {
      title: "Frontend Developer",
      match_percentage: 78,
      required_skills: ["React", "JavaScript", "Git"],
      matched_skills: ["React", "JavaScript"],
      missing_skills: ["Git", "TypeScript"]
    },
    {
      title: "Backend Developer",
      match_percentage: 75,
      required_skills: ["Node.js", "SQL", "Java", "Python"],
      matched_skills: ["SQL", "Python"],
      missing_skills: ["Node.js", "Java"]
    },
    {
      title: "Data Scientist",
      match_percentage: 70,
      required_skills: ["Machine Learning", "Python", "SQL"],
      matched_skills: ["Python", "SQL"],
      missing_skills: ["Machine Learning"]
    },
    {
      title: "QA Engineer",
      match_percentage: 65,
      required_skills: ["Git", "SQL", "Communication"],
      matched_skills: ["SQL", "Communication"],
      missing_skills: ["Git"]
    }
  ];

  const getRoleIcon = (title) => {
    if (title.includes('Software')) return Code2;
    if (title.includes('Data Analyst') || title.includes('Scientist')) return Database;
    if (title.includes('Frontend')) return Layout;
    if (title.includes('Backend')) return Server;
    if (title.includes('Cloud') || title.includes('DevOps')) return Cloud;
    return Terminal;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-indigo-500" />
          <span>Algorithmic Skill Matrix Matching Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Career Path Recommendations
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Custom role compatibility mapping based on your technical skill chips, coding aptitude, and project count.
        </p>
      </div>

      {/* Role Recommendations List */}
      <div className="space-y-6">
        {recommendations.map((role, idx) => {
          const Icon = getRoleIcon(role.title);
          const isTopMatch = idx === 0;

          return (
            <div
              key={idx}
              className={`glass-card rounded-3xl p-6 space-y-4 transition-all hover:scale-[1.01] ${
                isTopMatch ? 'border-2 border-indigo-500/60 bg-indigo-500/5 shadow-2xl' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl ${isTopMatch ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">{role.title}</h3>
                      {isTopMatch && (
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          BEST MATCH ★
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Industry Placement Fit</p>
                  </div>
                </div>

                <div className="text-right sm:text-right w-full sm:w-auto">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {role.match_percentage}%
                  </div>
                  <span className="text-[11px] text-gray-400 font-semibold">Match Score</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isTopMatch ? 'bg-gradient-to-r from-indigo-500 to-emerald-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${role.match_percentage}%` }}
                ></div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Matched */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    ✓ Skills You Possess ({role.matched_skills?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.matched_skills?.length > 0 ? (
                      role.matched_skills.map((sk, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                          {sk}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">None selected</span>
                    )}
                  </div>
                </div>

                {/* Missing */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    + Recommended to Learn ({role.missing_skills?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.missing_skills?.length > 0 ? (
                      role.missing_skills.map((sk, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                          + {sk}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-500 font-semibold">All skills matched!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerRecommendPage;
