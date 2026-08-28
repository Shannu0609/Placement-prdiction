import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, CheckCircle2, XCircle, AlertTriangle, 
  Search, Filter, Eye, Award, ExternalLink, RefreshCw, Send, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendVerificationEmail } from '../utils/emailService';

export default function VerificationCenterPage() {
  const { studentVerifications, updateVerificationStatus } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Resubmission Modal
  const [showResubmitModal, setShowResubmitModal] = useState(false);
  const [resubmitReason, setResubmitReason] = useState("Please upload a clearer copy of your official college ID / Bonafide certificate.");

  const verifications = studentVerifications || [
    {
      id: "ver_101",
      studentId: "std_101",
      name: "Aarav Sharma",
      email: "student@placement.edu",
      college: "National Institute of Technology",
      degree: "B.Tech",
      department: "Computer Science & Engineering",
      studentStatus: "Final-Year Student",
      graduationYear: "2026",
      documentType: "College ID & Bonafide Certificate",
      documentUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
      submittedAt: "2026-08-27 10:30",
      status: "PENDING",
      extractedInfo: {
        extractedName: "Aarav Sharma",
        extractedCollege: "National Institute of Technology",
        extractedDegree: "B.Tech CSE",
        extractedYear: "2026",
        inconsistencyFlag: false
      }
    },
    {
      id: "ver_102",
      studentId: "std_102",
      name: "Sophia Chen",
      email: "sophia@placement.edu",
      college: "National Tech University",
      degree: "B.Tech",
      department: "Artificial Intelligence",
      studentStatus: "Graduated Student",
      graduationYear: "2025",
      documentType: "Degree Certificate",
      documentUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&auto=format&fit=crop&q=80",
      submittedAt: "2026-08-26 14:15",
      status: "VERIFIED",
      extractedInfo: {
        extractedName: "Sophia Chen",
        extractedCollege: "National Tech University",
        extractedDegree: "B.Tech AI",
        extractedYear: "2025",
        inconsistencyFlag: false
      }
    },
    {
      id: "ver_103",
      studentId: "std_103",
      name: "Rohan Gupta",
      email: "rohan@placement.edu",
      college: "Institute of Technology",
      degree: "B.Tech",
      department: "Electronics & Communication",
      studentStatus: "Final-Year Student",
      graduationYear: "2026",
      documentType: "Provisional Academic Proof",
      documentUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
      submittedAt: "2026-08-25 09:45",
      status: "RESUBMISSION_REQUIRED",
      adminComment: "Document image blur - please upload high-resolution scan.",
      extractedInfo: {
        extractedName: "Rohan Gupta",
        extractedCollege: "Institute of Tech",
        extractedDegree: "ECE",
        extractedYear: "2026",
        inconsistencyFlag: true
      }
    }
  ];

  const filteredList = verifications.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (status, comment = "") => {
    if (!selectedStudent) return;
    updateVerificationStatus(selectedStudent.id, status, comment);
    sendVerificationEmail({
      candidateEmail: selectedStudent.email,
      candidateName: selectedStudent.name,
      status,
      adminComment: comment
    });
    alert(`Verification status updated to ${status} for ${selectedStudent.name}`);
    setShowResubmitModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin Verification Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Educational Document Verification</h1>
            <p className="text-amber-200 text-xs sm:text-sm mt-1 max-w-xl">
              Inspect submitted educational certificates of Final-Year and Graduated students. Admin is the final authority for student verification.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-card p-4 rounded-3xl border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search student or college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Verification Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="RESUBMISSION_REQUIRED">RESUBMISSION REQUIRED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Verification List & Deep Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Verification Submissions Roster */}
        <div className="lg:col-span-6 space-y-3">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedStudent(item)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedStudent?.id === item.id
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-md'
                  : 'border-gray-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 bg-white/50 dark:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">{item.college} • {item.studentStatus}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                  item.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  item.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  item.status === 'RESUBMISSION_REQUIRED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                  'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Admin Inspection & Action Center */}
        <div className="lg:col-span-6 space-y-4">
          {!selectedStudent ? (
            <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-3 min-h-[350px]">
              <Eye className="w-10 h-10 text-amber-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Select Student Submission</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xs">
                Click on any student submission from the roster list on the left to review their educational proof and authorize verification.
              </p>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{selectedStudent.email}</p>
                </div>
                <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-[11px] font-mono text-gray-700 dark:text-slate-300">
                  {selectedStudent.studentStatus}
                </span>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">College / University</span>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">{selectedStudent.college}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Degree & Dept</span>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">{selectedStudent.degree} ({selectedStudent.department})</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Graduation Year</span>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">{selectedStudent.graduationYear}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Submitted Proof</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{selectedStudent.documentType}</span>
                </div>
              </div>

              {/* Document Extraction Assistance Box */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
                  Document Analysis Assistance (OCR Extracted Info)
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span>Name: <strong>{selectedStudent.extractedInfo.extractedName}</strong></span>
                  <span>College: <strong>{selectedStudent.extractedInfo.extractedCollege}</strong></span>
                  <span>Degree: <strong>{selectedStudent.extractedInfo.extractedDegree}</strong></span>
                  <span>Year: <strong>{selectedStudent.extractedInfo.extractedYear}</strong></span>
                </div>
                <p className="text-[10px] text-gray-500 italic">
                  Note: Admin remains final authority for official educational verification.
                </p>
              </div>

              {/* Document Preview Link */}
              <div className="p-3 rounded-2xl border border-gray-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">Uploaded Educational Proof</span>
                </div>
                <a
                  href={selectedStudent.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>View Proof Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Admin Decision Action Buttons */}
              <div className="pt-3 border-t border-gray-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white block">Admin Decision Authority</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleAction("VERIFIED")}
                    className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFY</span>
                  </button>

                  <button
                    onClick={() => setShowResubmitModal(true)}
                    className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>RESUBMIT</span>
                  </button>

                  <button
                    onClick={() => handleAction("REJECTED", "Educational document does not match registration criteria.")}
                    className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>REJECT</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Resubmission Reason Modal */}
      {showResubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Request Resubmission</h3>
              <button onClick={() => setShowResubmitModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Provide a clear reason or instructions for {selectedStudent?.name} to upload updated educational proof.
              </p>
              <textarea
                rows={4}
                value={resubmitReason}
                onChange={(e) => setResubmitReason(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
              ></textarea>
              <button
                onClick={() => handleAction("RESUBMISSION_REQUIRED", resubmitReason)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Send Resubmission Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
