import React, { useState } from 'react';
import { 
  Building2, Search, Mail, Bookmark, BookmarkCheck,
  Plus, ShieldCheck, Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CompanyDashboard() {
  const { 
    user, 
    jobs = [], 
    createJobPosting, 
    sendEmailToCandidate, 
    savedCandidates = [], 
    toggleSaveCandidate 
  } = useAuth();

  // Demo candidates database for HR discovery & search
  const candidatesList = [
    {
      id: "std_101",
      name: "Aarav Sharma",
      email: "student@placement.edu",
      branch: "Computer Science",
      year: "2026",
      cgpa: 8.7,
      atsScore: 84,
      placementScore: 92,
      projectsCount: 4,
      certsCount: 3,
      skills: ["Python", "React", "Node.js", "SQL", "Data Structures"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "std_102",
      name: "Sophia Chen",
      email: "sophia@placement.edu",
      branch: "Artificial Intelligence",
      year: "2026",
      cgpa: 9.1,
      atsScore: 90,
      placementScore: 95,
      projectsCount: 5,
      certsCount: 4,
      skills: ["Python", "Machine Learning", "Cloud", "SQL", "Docker"],
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "std_103",
      name: "Rohan Gupta",
      email: "rohan@placement.edu",
      branch: "Electronics & Communication",
      year: "2026",
      cgpa: 7.8,
      atsScore: 76,
      placementScore: 78,
      projectsCount: 3,
      certsCount: 2,
      skills: ["C++", "SQL", "Embedded C", "Python"],
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "std_104",
      name: "Ananya Iyer",
      email: "ananya@placement.edu",
      branch: "Information Technology",
      year: "2026",
      cgpa: 8.4,
      atsScore: 88,
      placementScore: 86,
      projectsCount: 3,
      certsCount: 3,
      skills: ["Java", "Spring Boot", "React", "SQL"],
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
    }
  ];

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [minCgpa, setMinCgpa] = useState(6.0);
  const [minAts, setMinAts] = useState(50);
  const [minPlacement, setMinPlacement] = useState(50);

  // Email Composer Modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [templateType, setTemplateType] = useState("interview");

  // Job Creation Modal state
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobRole, setNewJobRole] = useState("Software Engineer");
  const [newJobLocation, setNewJobLocation] = useState("Bangalore / Remote");
  const [newJobSalary, setNewJobSalary] = useState("₹10.0 LPA – ₹14.0 LPA");
  const [newJobMinCgpa, setNewJobMinCgpa] = useState(7.5);
  const [newJobSkills, setNewJobSkills] = useState("Python, React, SQL, Data Structures");
  const [newJobDesc, setNewJobDesc] = useState("We are looking for SDE-1 candidates with strong problem-solving skills.");

  // Safe Filter candidates logic
  const filteredCandidates = (candidatesList || []).filter(c => {
    const matchesSearch = (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (c.skills || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBranch = selectedBranch === "all" || c.branch === selectedBranch;
    const matchesCgpa = (c.cgpa || 0) >= minCgpa;
    const matchesAts = (c.atsScore || 0) >= minAts;
    const matchesPlacement = (c.placementScore || 0) >= minPlacement;

    return matchesSearch && matchesBranch && matchesCgpa && matchesAts && matchesPlacement;
  });

  const openEmailComposer = (candidate, type = "interview") => {
    setSelectedCandidate(candidate);
    setTemplateType(type);
    
    if (type === "interview") {
      setEmailSubject(`Interview Invitation: SDE Role at ${user?.name || 'TechCorp Global'}`);
      setEmailBody(`Dear ${candidate.name},

Congratulations! We were highly impressed by your academic record (CGPA ${candidate.cgpa}), technical skills, and ATS Resume score (${candidate.atsScore}/100).

We would like to invite you for a Technical Interview for our Software Engineer position.

Date: Next Monday
Time: 10:00 AM IST
Format: Google Meet / Virtual Technical Round

Please confirm your availability by replying to this email.

Best regards,
${user?.hrName || 'HR Team'}
${user?.name || 'TechCorp Global'}`);
    } else if (type === "job") {
      setEmailSubject(`Exclusive Job Opportunity: Software Engineer Position`);
      setEmailBody(`Dear ${candidate.name},

We noticed your exceptional candidate profile on the Placement Intelligence System platform. We have an exciting opening that matches your skillset in ${(candidate.skills || []).slice(0, 3).join(", ")}.

We invite you to apply directly to our job drive.

Warm regards,
Recruitment Team, ${user?.name || 'TechCorp Global'}`);
    }
    
    setShowEmailModal(true);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!selectedCandidate || !emailSubject || !emailBody) return;

    if (sendEmailToCandidate) {
      sendEmailToCandidate({
        candidateId: selectedCandidate.id,
        candidateEmail: selectedCandidate.email,
        candidateName: selectedCandidate.name,
        subject: emailSubject,
        body: emailBody,
        templateType: templateType
      });
    }

    setShowEmailModal(false);
    alert(`Professional email sent successfully to ${selectedCandidate.name} (${selectedCandidate.email})`);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (createJobPosting) {
      createJobPosting({
        title: newJobTitle,
        roleCategory: newJobRole,
        branchEligibility: ["CSE", "IT", "ECE"],
        minCgpa: parseFloat(newJobMinCgpa),
        minAtsScore: 70,
        minPlacementScore: 70,
        requiredSkills: newJobSkills.split(',').map(s => s.trim()),
        location: newJobLocation,
        salaryRange: newJobSalary,
        jobType: "Full-Time",
        description: newJobDesc
      });
    }

    setShowJobModal(false);
    alert("New job posting published live for eligible candidates!");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/20">
              <Building2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Corporate Recruitment Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user?.name || 'TechCorp Global'} Recruitment Portal</h1>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1 max-w-xl">
              Discover verified high-potential candidates, filter by ATS & CGPA scores, shortlist top talent, and send automated email invitations.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setShowJobModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job Drive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Search & Filter Toolbar */}
      <div className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name, skill (Python, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter Threshold Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200"
              >
                <option value="all">All Branches</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Electronics & Communication">Electronics & Comm</option>
                <option value="Information Technology">Information Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Min CGPA ({minCgpa})</label>
              <input
                type="range"
                min="5.0"
                max="9.5"
                step="0.5"
                value={minCgpa}
                onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Min ATS Score ({minAts})</label>
              <input
                type="range"
                min="40"
                max="90"
                step="5"
                value={minAts}
                onChange={(e) => setMinAts(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Min Placement Score ({minPlacement}%)</label>
              <input
                type="range"
                min="40"
                max="90"
                step="5"
                value={minPlacement}
                onChange={(e) => setMinPlacement(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Filtered Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {(filteredCandidates || []).map((cand) => {
          const isSaved = (savedCandidates || []).includes(cand.id);
          return (
            <div
              key={cand.id}
              className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-2xl object-cover border border-emerald-500/30" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
                      <span>{cand.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{cand.branch} • Grad Class {cand.year}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSaveCandidate && toggleSaveCandidate(cand.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border-emerald-300'
                      : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 border-gray-200 dark:border-slate-700'
                  }`}
                  title={isSaved ? "Saved Talent Pool" : "Save Candidate"}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-center">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">Placement Score</span>
                  <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">{cand.placementScore}%</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-center">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block">ATS Score</span>
                  <span className="text-sm font-black text-indigo-700 dark:text-indigo-300">{cand.atsScore}/100</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-center">
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 block">CGPA</span>
                  <span className="text-sm font-black text-purple-700 dark:text-purple-300">{cand.cgpa}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Top Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {(cand.skills || []).map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[10px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recruitment Action Buttons */}
              <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEmailComposer(cand, "interview")}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Interview Invite</span>
                </button>

                <button
                  onClick={() => openEmailComposer(cand, "job")}
                  className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 text-xs font-semibold"
                >
                  Job Offer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Email Composer Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>Send Candidate Communication</span>
              </h3>
              <button onClick={() => setShowEmailModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Candidate Email
                </label>
                <input
                  type="email"
                  disabled
                  value={selectedCandidate?.email || ""}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Professional Email Message Body
                </label>
                <textarea
                  required
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none font-mono"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-emerald-500" />
                <span>Publish New Job Posting</span>
              </h3>
              <button onClick={() => setShowJobModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SDE-1 / Data Analyst"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Salary Package</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Min CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newJobMinCgpa}
                    onChange={(e) => setNewJobMinCgpa(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newJobSkills}
                  onChange={(e) => setNewJobSkills(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Publish Job Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
