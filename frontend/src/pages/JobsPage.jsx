import React from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateJobMatch } from '../utils/matchEngine';
import { Briefcase, Building2, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function JobsPage({ setActiveTab }) {
  const { jobs = [], applications = [], applyForJob, user } = useAuth();

  const handleApply = (jobId) => {
    const res = applyForJob(jobId);
    if (res) {
      alert("Application submitted successfully! You can now take the candidate assessment.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
            <Briefcase className="w-3.5 h-3.5 text-blue-300" />
            <span>Campus Job Drives & Recruitment Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Active Placement Drives</h1>
          <p className="text-blue-200 text-xs sm:text-sm mt-1 max-w-xl">
            Explore active recruitment drives from verified companies. Transparent match score breakdown is generated automatically based on your resume skills and academic cutoffs.
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(jobs || []).map((j) => {
          const matchResult = calculateJobMatch(user, j);
          const hasApplied = (applications || []).some(a => a.jobId === j.id && a.studentId === (user?.uid || "std_101"));

          return (
            <div
              key={j.id}
              className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img src={j.companyLogo} alt={j.companyName} className="w-12 h-12 rounded-2xl object-cover border border-blue-500/20" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{j.title}</h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                      <Building2 className="w-3 h-3" />
                      <span>{j.companyName}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300 dark:border-emerald-800 block">
                    {matchResult.matchScore}% Match
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">{j.workMode}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {j.description}
              </p>

              {/* Job Info Pills */}
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-gray-600 dark:text-slate-400">
                <span className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{j.location}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-slate-800">
                  {j.salaryRange}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-slate-800">
                  Min CGPA: {j.minCgpa}
                </span>
              </div>

              {/* Transparent Match Score Explanation Card */}
              <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                  Transparent Match Score Breakdown ({matchResult.matchScore}% Match)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">Matched Skills (✓)</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(matchResult.matchedSkills || []).map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block">Missing / Preferred (△)</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(matchResult.missingSkills?.length || 0) > 0 ? (
                        (matchResult.missingSkills || []).map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold">
                            △ {sk}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-gray-400 italic">None - All skills matched!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                {hasApplied ? (
                  <div className="flex items-center space-x-3 w-full justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Applied to Drive</span>
                    </span>
                    {setActiveTab && (
                      <button
                        onClick={() => setActiveTab('assessment')}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center space-x-1"
                      >
                        <span>Take Assessment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(j.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
                  >
                    Apply Now to Campus Drive
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
