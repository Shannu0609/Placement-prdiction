import React, { useState } from 'react';
import { 
  ShieldCheck, Users, Building2, Briefcase, Award, TrendingUp, 
  BarChart3, PieChart, Check, FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard({ setActiveTab }) {
  const { jobs = [], applications = [], studentVerifications = [] } = useAuth();

  const [activeTab, setActiveAdminTab] = useState('overview');

  const pendingVerificationsCount = (studentVerifications || []).filter(v => v.status === 'PENDING').length || 0;

  // Pending Company Approval Requests list
  const [companyApprovals, setCompanyApprovals] = useState([
    {
      id: "cmp_pending_1",
      companyName: "Innovate AI Corp",
      hrName: "Sanjay Patel",
      hrEmail: "sanjay@innovateai.io",
      industry: "Artificial Intelligence & Cloud",
      website: "https://innovateai.io",
      status: "pending",
      requestedAt: "2026-08-26"
    },
    {
      id: "cmp_pending_2",
      companyName: "NextGen CyberSec",
      hrName: "Elena Rostova",
      hrEmail: "elena@nextgencyber.com",
      industry: "Cybersecurity & Defense",
      website: "https://nextgencyber.com",
      status: "pending",
      requestedAt: "2026-08-25"
    }
  ]);

  const [approvedCompanies, setApprovedCompanies] = useState([
    { id: "cmp_301", companyName: "TechCorp Global", hrName: "Priya Sundaram", industry: "Software", isVerified: true },
    { id: "cmp_302", companyName: "DataMetrics AI", hrName: "Rohan Verma", industry: "Data Analytics", isVerified: true },
    { id: "cmp_303", companyName: "CloudScale Systems", hrName: "Anita Roy", industry: "Cloud Infrastructure", isVerified: true }
  ]);

  const handleApproveCompany = (companyId) => {
    const target = (companyApprovals || []).find(c => c.id === companyId);
    if (!target) return;

    setCompanyApprovals(prev => (prev || []).filter(c => c.id !== companyId));
    setApprovedCompanies(prev => [...(prev || []), { ...target, isVerified: true }]);
    alert(`${target.companyName} has been officially approved & verified for campus recruitment!`);
  };

  const handleRejectCompany = (companyId) => {
    setCompanyApprovals(prev => (prev || []).filter(c => c.id !== companyId));
  };

  // Analytics datasets
  const placementTrends = [
    { month: "Jan", rate: 78 },
    { month: "Feb", rate: 82 },
    { month: "Mar", rate: 85 },
    { month: "Apr", rate: 89 },
    { month: "May", rate: 92 },
    { month: "Jun", rate: 94 }
  ];

  const salaryDistribution = [
    { range: "3-5 LPA", count: 28 },
    { range: "5-8 LPA", count: 54 },
    { range: "8-12 LPA", count: 32 },
    { range: "12-16 LPA", count: 18 },
    { range: "16+ LPA", count: 8 }
  ];

  const popularSkills = [
    { skill: "Python", demand: 92 },
    { skill: "Data Structures", demand: 88 },
    { skill: "React.js", demand: 84 },
    { skill: "SQL & Databases", demand: 80 },
    { skill: "Java / Spring", demand: 76 },
    { skill: "Machine Learning", demand: 72 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Institutional Placement Directorate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Admin System Ecosystem</h1>
            <p className="text-amber-200 text-xs sm:text-sm mt-1 max-w-xl">
              Oversee multi-role users, approve corporate registrations, monitor student verification proofs, and analyze institutional trends.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('verification_center')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-lg flex items-center space-x-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Verification Center ({pendingVerificationsCount})</span>
              </button>
            )}

            <button
              onClick={() => setActiveAdminTab('overview')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview' ? 'bg-white/20 text-white border border-white/30' : 'bg-white/10 text-amber-200 hover:bg-white/20'
              }`}
            >
              Analytics Suite
            </button>
            <button
              onClick={() => setActiveAdminTab('approvals')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'approvals' ? 'bg-white/20 text-white border border-white/30' : 'bg-white/10 text-amber-200 hover:bg-white/20'
              }`}
            >
              Company Approvals ({(companyApprovals?.length || 0)})
            </button>
          </div>
        </div>
      </div>

      {/* Admin KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>TOTAL STUDENTS</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">185</div>
          <span className="text-[10px] text-emerald-500 font-semibold">Active CSE/ECE Batches</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>TRAINERS</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">12</div>
          <span className="text-[10px] text-purple-500 font-semibold">Placement Mentors</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>COMPANIES</span>
            <Building2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{(approvedCompanies?.length || 0)}</div>
          <span className="text-[10px] text-emerald-500 font-semibold">Verified Corporate HR</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>ACTIVE JOBS</span>
            <Briefcase className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{(jobs?.length || 0)}</div>
          <span className="text-[10px] text-amber-500 font-semibold">Live Campus Postings</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>APPLICATIONS</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{(applications?.length || 0) + 142}</div>
          <span className="text-[10px] text-indigo-500 font-semibold">Submitted Drive Apps</span>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          
          {/* Placement Trends & Salary Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Placement Rate Trends */}
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Placement Rate Trends (%)</h3>
                  <p className="text-xs text-gray-500">Monthly student placement success rate progression</p>
                </div>
                <BarChart3 className="w-4 h-4 text-amber-500" />
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={placementTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[50, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area type="monotone" dataKey="rate" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Salary Package Distribution */}
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Salary Package Bins (LPA)</h3>
                  <p className="text-xs text-gray-500">Distribution of candidate CTC offers</p>
                </div>
                <PieChart className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="range" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Skill Demand Bar Cards */}
          <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Skill Demand Analysis across Recruiting Companies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {popularSkills.map((sk, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-800 dark:text-slate-200">{sk.skill}</span>
                    <span className="text-amber-600 dark:text-amber-400">{sk.demand}% Corporate Demand</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${sk.demand}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Approvals & Company Management Tab */
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-amber-500" />
              <span>Pending Company Verification Approvals</span>
            </h3>

            {(companyApprovals?.length || 0) === 0 ? (
              <p className="text-xs text-gray-400 py-4">No pending company registrations at this time.</p>
            ) : (
              <div className="space-y-3">
                {(companyApprovals || []).map((cmp) => (
                  <div key={cmp.id} className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{cmp.companyName}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">HR Contact: {cmp.hrName} ({cmp.hrEmail}) • {cmp.industry}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRejectCompany(cmp.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-semibold"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApproveCompany(cmp.id)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve HR</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
