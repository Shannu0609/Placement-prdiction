import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Users, Building2, Award, 
  FileCheck, CheckCircle2, Search, Code2, BookOpen, MessageSquare, Phone, Mail, MapPin, Send
} from 'lucide-react';

const LandingPage = ({ setActiveTab }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 4000);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const workflowSteps = [
    { num: "01", title: "Educational Verification", desc: "Students submit college ID / bonafide or degree certificate. Admin verifies eligibility." },
    { num: "02", title: "Resume Intelligence", desc: "AI extracts skills, education, projects, & internships. Students verify and edit extracted profile." },
    { num: "03", title: "Intelligent Skill Matching", desc: "Normalized match score (e.g. 87%) transparently breaks down matched vs missing skills." },
    { num: "04", title: "Company Proctored Assessment", desc: "Up to 150-minute multi-section evaluation covering Coding, Aptitude, Verbal, and Speaking." },
    { num: "05", title: "Recruitment Decision", desc: "Companies review section score analytics and advance candidates to Interview or Selection." }
  ];

  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Placement Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Placement Intelligence System
          </h1>

          <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-bold max-w-2xl mx-auto">
            "From Verified Student Profiles to Intelligent Company Matching."
          </p>

          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Connecting verified final-year and graduated students with corporate recruiters through Resume Intelligence, Transparent Skill Matching, and Proctored Assessments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('register')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>Student Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className="px-8 py-3.5 rounded-2xl glass-card text-gray-800 dark:text-white font-bold text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-700"
            >
              Company Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">End-To-End Workflow</span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">How The System Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="glass-card p-5 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block">{step.num}</span>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features: Students vs Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="glass-card p-8 rounded-3xl border border-blue-200 dark:border-blue-900/50 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">For Students</h3>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
              <li className="flex items-center space-x-2">✓ Verified Student Credential Badge</li>
              <li className="flex items-center space-x-2">✓ Editable Extracted Resume Profile</li>
              <li className="flex items-center space-x-2">✓ ATS Resume Checker (0-100 score & keyword insights)</li>
              <li className="flex items-center space-x-2">✓ Random Forest ML Placement & Salary Estimator</li>
              <li className="flex items-center space-x-2">✓ Transparent Job Match Explanations</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-emerald-200 dark:border-emerald-900/50 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">For Companies</h3>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
              <li className="flex items-center space-x-2">✓ Multi-Filter Candidate Search (Branch, Skills, CGPA, ATS)</li>
              <li className="flex items-center space-x-2">✓ Create & Publish Job Openings</li>
              <li className="flex items-center space-x-2">✓ Multi-Section Proctored Assessments (Up to 150m)</li>
              <li className="flex items-center space-x-2">✓ Automated Professional Email Invitations</li>
              <li className="flex items-center space-x-2">✓ Full Candidate Shortlisting Pipeline</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Public Contact Form */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Institutional Placement Directorate</h2>
            <p className="text-xs text-gray-500">Have questions about college verification or corporate campus drives?</p>
          </div>

          {contactSent && (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold text-center">
              ✓ Message sent successfully! Our Placement Cell will contact you shortly.
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Your inquiry or partnership message..."
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
