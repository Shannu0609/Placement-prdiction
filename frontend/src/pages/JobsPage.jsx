import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, AlertCircle, Clock, Calendar, 
  MapPin, DollarSign, ArrowRight, Building2, Search, Filter, Sparkles, ShieldAlert, Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { calculateJobMatch } from '../utils/matchEngine';

export default function JobsPage({ setActiveTab }) {
  const { user, jobs, applications, applyForJob } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === "all" || j.roleCategory === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const getStudentApp = (jobId) => {
    return applications.find(a => a.jobId === jobId && a.studentId === (user?.uid || "std_101"));
  };

  const isVerified = user?.verificationStatus === 'VERIFIED';

  const handleApply = (jobId) => {
    if (!isVerified) {
      alert("⚠️ Your educational document is pending administrator verification. Please wait for verification before applying.");
      return;
    }
    applyForJob(jobId);
    alert("Job application submitted successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
              <Briefcase className="w-3.5 h-3.5 text-blue-300" />
              <span>Intelligent Student-Job Matching Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Active Campus Drives & Matches</h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-1 max-w-xl">
              Transparent profile matching based on verified skills, academic requirements, and company preferences.
            </p>
          </div>
        </div>
      </div>

      {!isVerified && (
        <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Notice: Educational document verification is PENDING. You can view job match explanations, but job application submission unlocks upon Admin approval.</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-3xl border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Role Categories</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const app = getStudentApp(job.id);
          const matchResult = calculateJobMatch(user, job);

          return (
            <div
              key={job.id}
              className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start space-x-4">
                  <img src={job.companyLogo} alt={job.companyName} className="w-12 h-12 rounded-2xl object-cover border border-gray-200 dark:border-slate-700" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>{job.title}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                        {matchResult.matchScore}% Profile Match
                      </span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-slate-400 mt-1">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{job.companyName}</span>
                      <span>•</span>
                      <span>{job.location} ({job.workMode || 'Hybrid'})</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{job.salaryRange}</span>
                    </div>
                  </div>
                </div>

                {/* Status / Apply / Take Assessment Actions */}
                <div className="flex items-center space-x-3 shrink-0">
                  {app ? (
                    <div className="flex flex-col items-end space-y-1">
                      <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200">
                        Status: {app.status}
                      </span>
                      {app.status === 'Assessment Pending' && (
                        <button
                          onClick={() => setActiveTab('assessment')}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
                        >
                          Take Proctored Test (150m)
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Apply For Position</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Transparent Skill Match Explanation Box */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 space-y-2">
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                  Transparent Match Score Breakdown ({matchResult.matchScore}% Match)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">Matched Skills (✓)</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {matchResult.matchedSkills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block">Missing / Preferred (△)</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {matchResult.missingSkills.length > 0 ? (
                        matchResult.missingSkills.map((sk, idx) => (
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

            </div>
          );
        })}
      </div>

    </div>
  );
}
