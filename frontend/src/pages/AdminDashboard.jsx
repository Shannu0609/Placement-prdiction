import React, { useState, useEffect } from 'react';
import { fetchAdminStats } from '../utils/api';
import { ShieldCheck, Users, Sparkles, TrendingUp, Award, BarChart3, PieChart, Activity, User, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await fetchAdminStats();
    setStats(data);
  };

  if (!stats) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-sm text-gray-500">Loading Placement Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-amber-500/30 shadow-xl bg-gradient-to-r from-amber-500/10 via-blue-600/10 to-transparent">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Administrative Control & Analytics Center</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Placement Intelligence Admin Portal
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Institutional overview of dataset training, student predictions, and job market trends.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'glass-card text-gray-600 dark:text-slate-300'
            }`}
          >
            Analytics Charts
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'glass-card text-gray-600 dark:text-slate-300'
            }`}
          >
            Users & Logs
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>TOTAL REGISTERED STUDENTS</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white">
            {stats.total_students}
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold">↑ +14% this month</span>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>TOTAL PREDICTIONS RUN</span>
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white">
            {stats.total_predictions}
          </div>
          <span className="text-[11px] text-blue-500 font-semibold">Random Forest Engine</span>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>AVERAGE PLACEMENT PROBABILITY</span>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.avg_placement_score}%
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold">High Institutional Average</span>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>TOP RECOMMENDED ROLE</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 truncate">
            {stats.top_career_recommendation}
          </div>
          <span className="text-[11px] text-gray-400">High Industry Demand</span>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Placement Trends */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Placement Rate Trends</h3>
                  <p className="text-xs text-gray-500">Monthly student placement success rate (%)</p>
                </div>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.placement_trends}>
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
                    <Area type="monotone" dataKey="rate" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Salary Distribution Bins */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Salary Package Distribution</h3>
                  <p className="text-xs text-gray-500">Distribution of candidate CTC offers in LPA</p>
                </div>
                <PieChart className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.salary_distribution}>
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
                    <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Popular Skills Bar Chart */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Most Popular Student Skills & Demand</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stats.popular_skills.map((sk, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-800 dark:text-slate-200">{sk.skill}</span>
                    <span className="text-blue-600 dark:text-blue-400">{sk.demand}% Demand</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${sk.demand}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Users & Logs Table */
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Registered Students Database</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700 dark:text-slate-300">
                <thead className="bg-gray-100 dark:bg-slate-800 uppercase text-gray-400 font-extrabold">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">College</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {stats.registered_users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-gray-400">{usr.id}</td>
                      <td className="p-3 font-bold text-gray-900 dark:text-white">{usr.name}</td>
                      <td className="p-3">{usr.email}</td>
                      <td className="p-3">{usr.college}</td>
                      <td className="p-3">{usr.branch}</td>
                      <td className="p-3 font-semibold text-blue-600">{usr.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
