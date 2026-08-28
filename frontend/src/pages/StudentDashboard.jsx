import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, TrendingUp, Award, FileCheck, Briefcase, GraduationCap, Clock, BookOpen
} from 'lucide-react';
import GaugeChart from '../components/GaugeChart';

const StudentDashboard = ({ setActiveTab }) => {
  const { user, applications = [], trainerFeedback = [] } = useAuth();

  const userApps = (applications || []).filter(a => a.studentId === (user?.uid || "std_101"));

  const profileCompletion = user?.cgpa && (user?.skills?.length || 0) > 0 ? 90 : 70;
  const atsScore = user?.atsScore || 84;
  const readinessScore = user?.readinessScore || 86;
  const placementProb = user?.placementProbability || 92;

  const learningPaths = [
    { title: "Advanced Data Structures & Dynamic Programming", platform: "LeetCode / HackerRank", duration: "4 Weeks", status: "In Progress", progress: 75 },
    { title: "Full Stack Microservices Architecture (React & Node)", platform: "Udemy / Tech Campus", duration: "6 Weeks", status: "Completed", progress: 100 },
    { title: "Cloud Deployment & Docker Fundamentals", platform: "AWS Skill Builder", duration: "3 Weeks", status: "Recommended", progress: 20 }
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Student Placement Command Center</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              Profile Completion: {profileCompletion}%
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student Candidate'}! 👋
          </h1>
          <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
            Your placement profile is evaluated in real-time. Review your ATS Resume score, readiness analytics, applied drive statuses, and recommended learning roadmap.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('ats_checker')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs shadow-lg flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <FileCheck className="w-4 h-4 text-indigo-600" />
              <span>Run ATS Resume Scan</span>
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-5 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-colors flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Browse Active Jobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-3xl p-5 space-y-2 border border-gray-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>PLACEMENT CHANCE</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {placementProb}%
          </div>
          <span className="text-[11px] text-gray-500 font-medium">High Chance Tier-1 Eligible</span>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2 border border-gray-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>ATS RESUME SCORE</span>
            <FileCheck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {atsScore} <span className="text-xs font-normal text-gray-400">/ 100</span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium">Corporate ATS Compatible</span>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2 border border-gray-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>READINESS SCORE</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
            {readinessScore}%
          </div>
          <span className="text-[11px] text-gray-500 font-medium">Coding & Communication</span>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2 border border-gray-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>APPLIED JOBS</span>
            <Briefcase className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
            {(userApps?.length || 0)} Drives
          </div>
          <span className="text-[11px] text-gray-500 font-medium">1 Interview Scheduled</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Gauge Chart & Applied Job Tracking */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Placement Probability Gauge</h3>
            <GaugeChart
              percentage={placementProb}
              category="High Chance"
              color="#22C55E"
              size={180}
            />
            <div className="w-full pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-around text-center">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">CGPA</p>
                <p className="text-sm font-extrabold text-gray-800 dark:text-slate-200">{user?.cgpa || '8.7'}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Coding</p>
                <p className="text-sm font-extrabold text-gray-800 dark:text-slate-200">88/100</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Projects</p>
                <p className="text-sm font-extrabold text-gray-800 dark:text-slate-200">4</p>
              </div>
            </div>
          </div>

          {/* Trainer Feedback Banner */}
          {(trainerFeedback?.length || 0) > 0 && (
            <div className="glass-card p-5 rounded-3xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
              <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>Trainer Feedback Note</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-slate-300 italic">
                "{trainerFeedback[0]?.feedbackText}"
              </p>
              <span className="text-[10px] font-semibold text-purple-500 block text-right">
                — {trainerFeedback[0]?.trainerName} ({trainerFeedback[0]?.category})
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Applied Company Applications & Learning Paths */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Applied Companies List & Status Tracking */}
          <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span>Applied Campus Drives & Interview Tracking</span>
              </h3>
              <button
                onClick={() => setActiveTab('jobs')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Browse All Jobs →
              </button>
            </div>

            <div className="space-y-3">
              {(userApps || []).map((app) => (
                <div key={app.id} className="p-4 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{app.jobTitle}</h4>
                      <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">{app.companyName}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                      app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200' :
                      app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {app.interviewDate && (
                    <div className="flex items-center space-x-2 text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 p-2 rounded-xl">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Interview Slot: {app.interviewDate} at {app.interviewTime}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Learning Paths */}
          <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Recommended Skill Upskilling Paths</span>
            </h3>

            <div className="space-y-3">
              {(learningPaths || []).map((lp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800 dark:text-slate-200">{lp.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      {lp.platform}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: `${lp.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
