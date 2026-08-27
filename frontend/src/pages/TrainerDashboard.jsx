import React, { useState } from 'react';
import { 
  Users, Award, BarChart3, TrendingUp, Search, Filter, 
  MessageSquare, Bell, Plus, CheckCircle, AlertTriangle, Eye, Send, Star, FileCheck, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TrainerDashboard() {
  const { user, announcements, createAnnouncement, trainerFeedback, addTrainerFeedback } = useAuth();

  // Demo student batch roster assigned to trainer
  const [students, setStudents] = useState([
    {
      id: "std_101",
      name: "Aarav Sharma",
      email: "student@placement.edu",
      branch: "Computer Science",
      year: "4th Year",
      cgpa: 8.7,
      atsScore: 84,
      placementScore: 92,
      readinessScore: 86,
      skills: ["Python", "React", "Node.js", "SQL"],
      status: "High Chance",
      lastUpdated: "2026-08-26"
    },
    {
      id: "std_102",
      name: "Sophia Chen",
      email: "sophia@placement.edu",
      branch: "Artificial Intelligence",
      year: "4th Year",
      cgpa: 9.1,
      atsScore: 90,
      placementScore: 95,
      readinessScore: 92,
      skills: ["Python", "Machine Learning", "Cloud", "SQL"],
      status: "High Chance",
      lastUpdated: "2026-08-25"
    },
    {
      id: "std_103",
      name: "Rohan Gupta",
      email: "rohan@placement.edu",
      branch: "Electronics & Communication",
      year: "4th Year",
      cgpa: 6.8,
      atsScore: 62,
      placementScore: 58,
      readinessScore: 60,
      skills: ["C++", "SQL", "Embedded C"],
      status: "Medium Chance",
      lastUpdated: "2026-08-24"
    },
    {
      id: "std_104",
      name: "Vikram Malhotra",
      email: "vikram@placement.edu",
      branch: "Information Technology",
      year: "4th Year",
      cgpa: 5.9,
      atsScore: 48,
      placementScore: 42,
      readinessScore: 45,
      skills: ["Java", "HTML"],
      status: "Low Chance",
      lastUpdated: "2026-08-22"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(4.5);
  const [feedbackCategory, setFeedbackCategory] = useState("DSA & Coding");

  // Announcement Modal State
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annBatch, setAnnBatch] = useState("4th Year All Branches");

  // Filtering student list
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.branch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const avgReadiness = Math.round(students.reduce((acc, s) => acc + s.readinessScore, 0) / students.length);
  const avgAts = Math.round(students.reduce((acc, s) => acc + s.atsScore, 0) / students.length);
  const highChanceCount = students.filter(s => s.status === "High Chance").length;

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!selectedStudent || !feedbackText) return;

    addTrainerFeedback({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      rating: parseFloat(feedbackRating),
      category: feedbackCategory,
      feedbackText: feedbackText
    });

    setFeedbackText("");
    alert(`Feedback note saved for ${selectedStudent.name}`);
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    createAnnouncement({
      title: annTitle,
      content: annContent,
      targetBatch: annBatch,
      priority: "High"
    });

    setAnnTitle("");
    setAnnContent("");
    setShowAnnModal(false);
    alert("Batch announcement published successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-400/20">
              <Users className="w-3.5 h-3.5 text-purple-300" />
              <span>Placement Trainer Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome, {user?.name || 'Trainer'}</h1>
            <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-xl">
              Monitor assigned student batches, track placement readiness, provide personalized feedback, and post preparation announcements.
            </p>
          </div>
          <button
            onClick={() => setShowAnnModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
          >
            <Bell className="w-4 h-4" />
            <span>Post Batch Announcement</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Assigned Students</span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{students.length} Candidates</h3>
            <span className="text-[11px] text-emerald-500 font-semibold">CSE & ECE Batches</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Avg Batch Readiness</span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{avgReadiness}%</h3>
            <span className="text-[11px] text-blue-500 font-semibold">+4.2% from last week</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Avg ATS Resume Score</span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{avgAts} / 100</h3>
            <span className="text-[11px] text-indigo-500 font-semibold">Standard corporate ATS</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">High Placement Chance</span>
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{highChanceCount} Students</h3>
            <span className="text-[11px] text-emerald-500 font-semibold">Tier-1 SDE Eligible</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Area: Roster & Student Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Student Roster List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            
            {/* Search & Filter Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidate or branch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="all">All Placement Statuses</option>
                  <option value="High Chance">High Chance</option>
                  <option value="Medium Chance">Medium Chance</option>
                  <option value="Low Chance">Low Chance</option>
                </select>
              </div>
            </div>

            {/* Students Table / List */}
            <div className="space-y-2">
              {filteredStudents.map((std) => (
                <div
                  key={std.id}
                  onClick={() => setSelectedStudent(std)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedStudent?.id === std.id
                      ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/30 shadow-md'
                      : 'border-gray-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800 bg-white/50 dark:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                      {std.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{std.name}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">{std.branch} • CGPA {std.cgpa}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-gray-800 dark:text-slate-200 block">{std.placementScore}% Placement Score</span>
                      <span className="text-[10px] text-gray-400">ATS: {std.atsScore}/100</span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                      std.status === 'High Chance' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      std.status === 'Medium Chance' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {std.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Deep-Dive Student Inspector & Feedback */}
        <div className="lg:col-span-5 space-y-6">
          {!selectedStudent ? (
            <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-3 min-h-[350px]">
              <Eye className="w-10 h-10 text-purple-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Select Student for Deep-Dive</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xs">
                Click on any candidate from the roster list on the left to inspect their ATS resume score, skill matrix, and submit trainer feedback.
              </p>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    {selectedStudent.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{selectedStudent.email}</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400">
                  {selectedStudent.branch}
                </span>
              </div>

              {/* Student Scores Metrics Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-center">
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 block">Placement Score</span>
                  <span className="text-base font-black text-purple-700 dark:text-purple-300">{selectedStudent.placementScore}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-center">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block">ATS Resume</span>
                  <span className="text-base font-black text-indigo-700 dark:text-indigo-300">{selectedStudent.atsScore}/100</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-center">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">Academic CGPA</span>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-300">{selectedStudent.cgpa}</span>
                </div>
              </div>

              {/* Skills Pill list */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Student Technical Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.skills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[11px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Feedback Form */}
              <form onSubmit={handleSendFeedback} className="space-y-3 pt-3 border-t border-gray-200 dark:border-slate-800">
                <span className="text-xs font-bold text-gray-900 dark:text-white block">Add Trainer Feedback Note</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="p-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="DSA & Coding">DSA & Coding</option>
                    <option value="Communication & HR">Communication & HR</option>
                    <option value="Resume & ATS">Resume & ATS</option>
                    <option value="Mock Interview">Mock Interview</option>
                  </select>

                  <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={feedbackRating}
                      onChange={(e) => setFeedbackRating(e.target.value)}
                      className="w-full text-xs font-bold bg-transparent text-gray-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={3}
                  placeholder={`Write actionable guidance or mock interview feedback for ${selectedStudent.name}...`}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Trainer Feedback</span>
                </button>
              </form>

            </div>
          )}
        </div>

      </div>

      {/* Post Announcement Modal */}
      {showAnnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Bell className="w-4 h-4 text-purple-500" />
                <span>Post Batch Announcement</span>
              </h3>
              <button onClick={() => setShowAnnModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tier-1 Campus Placement Preparation Drive"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Target Student Batch
                </label>
                <select
                  value={annBatch}
                  onChange={(e) => setAnnBatch(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="4th Year All Branches">4th Year All Branches</option>
                  <option value="3rd & 4th Year CSE/IT">3rd & 4th Year CSE/IT</option>
                  <option value="Special SDE Bootcamp Group">Special SDE Bootcamp Group</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Message Content & Instructions
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Details regarding preparation tips, test dates, or mandatory ATS resume submission..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
