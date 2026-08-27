import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, AlertCircle, Clock, Calendar, 
  MapPin, DollarSign, ArrowRight, Building2, Search, Filter, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function JobsPage() {
  const { user, activeRole, jobs, applications, applyForJob, updateApplicationStatus } = useAuth();
  
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

  const handleApply = (jobId) => {
    applyForJob(jobId);
    alert("Job application submitted successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
              <Briefcase className="w-3.5 h-3.5 text-blue-300" />
              <span>Campus Placement Job Board</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Active Recruitment Drives</h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-1 max-w-xl">
              Browse campus drives, verify academic eligibility, apply with 1-click, and track application status.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-3xl border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <option value="Cloud Engineer">Cloud Engineer</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const app = getStudentApp(job.id);
          const studentCgpa = user?.cgpa || 8.7;
          const isEligible = studentCgpa >= job.minCgpa;

          return (
            <div
              key={job.id}
              className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start space-x-4">
                  <img src={job.companyLogo} alt={job.companyName} className="w-12 h-12 rounded-2xl object-cover border border-gray-200 dark:border-slate-700" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-slate-400 mt-1">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{job.companyName}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{job.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="w-3 h-3" />
                        <span>{job.salaryRange}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status or Apply button */}
                <div className="flex items-center space-x-3 shrink-0">
                  {app ? (
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-bold">Status: {app.status}</span>
                    </div>
                  ) : isEligible ? (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition-all hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Apply Now</span>
                    </button>
                  ) : (
                    <div className="px-4 py-2 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-800">
                      Ineligible (Min CGPA: {job.minCgpa})
                    </div>
                  )}
                </div>

              </div>

              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                {job.description}
              </p>

              {/* Skills required & eligibility info */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-slate-800 text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-gray-400 uppercase text-[10px]">Required Skills:</span>
                  {job.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-mono text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="text-gray-400">Min CGPA: <strong className="text-gray-700 dark:text-slate-200">{job.minCgpa}</strong></span>
                  <span className="text-gray-400">Min ATS Score: <strong className="text-indigo-600 dark:text-indigo-400">{job.minAtsScore}</strong></span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
