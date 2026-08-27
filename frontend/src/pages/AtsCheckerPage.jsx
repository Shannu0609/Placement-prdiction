import React, { useState } from 'react';
import { 
  FileCheck, Upload, Sparkles, CheckCircle2, AlertTriangle, 
  XCircle, FileText, ArrowRight, ShieldAlert, Award, Search, Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AtsCheckerPage({ setActiveTab }) {
  const { user, updateUserProfile } = useAuth();
  
  const [resumeText, setResumeText] = useState(`AARAV SHARMA
Computer Science & Engineering Student | NIT India
Email: aarav.sharma@nit.edu | Phone: +91 9876543210 | GitHub: github.com/aarav | LinkedIn: linkedin.com/in/aarav

PROFESSIONAL SUMMARY
Highly motivated 4th year Computer Science student with a 8.7 CGPA. Proven experience building full-stack web applications and machine learning predictive models. Seeking SDE-1 or Data Engineer role.

EDUCATION
National Institute of Technology — B.Tech in Computer Science
2022 – 2026 | CGPA: 8.7 / 10.0

TECHNICAL SKILLS
- Programming Languages: Python, C++, JavaScript, SQL, HTML/CSS
- Web Technologies: React.js, Node.js, Express.js, Tailwind CSS, REST APIs
- Databases & Tools: PostgreSQL, MongoDB, Git, Docker, VS Code, Postman
- Core CS: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems

PROJECTS
1. Placement Intelligence & Prediction Ecosystem | React, Python, Flask, ML
- Developed an AI placement prediction system with 92% classification accuracy using Scikit-Learn.
- Built interactive candidate recruitment portal with job applications and ATS scoring.
- Reduced manual placement record processing time by 60%.

2. Real-Time Analytics Dashboard | React, Node.js, Socket.io
- Built live telemetry data streaming dashboard rendering 1,000+ data points per second.
- Integrated WebSocket notifications improving user engagement by 40%.

INTERNSHIP EXPERIENCE
Software Engineer Intern — CloudTech Solutions (May 2025 – July 2025)
- Developed 5+ REST API microservices handling user authentication and database queries.
- Optimized database indexing resulting in a 25% query response speed improvement.
`);

  const [analyzing, setAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [fileName, setFileName] = useState(user?.resumeName || "Aarav_Sharma_Resume.pdf");

  const analyzeResume = (textToAnalyze) => {
    setAnalyzing(true);
    setTimeout(() => {
      const text = textToAnalyze.toLowerCase();

      // Keyword dictionaries
      const requiredKeywords = [
        "python", "javascript", "react", "sql", "data structures", "algorithms", 
        "git", "rest api", "docker", "kubernetes", "aws", "cloud", "agile", "cicd", 
        "microservices", "unit testing", "mongodb", "postgresql"
      ];

      const actionVerbs = [
        "developed", "built", "implemented", "optimized", "engineered", 
        "designed", "reduced", "improved", "created", "led", "managed"
      ];

      // Scored components
      let structureScore = 0;
      if (text.includes("education")) structureScore += 25;
      if (text.includes("experience") || text.includes("internship")) structureScore += 25;
      if (text.includes("projects")) structureScore += 25;
      if (text.includes("skills") || text.includes("technical")) structureScore += 25;

      const matchedKeywords = requiredKeywords.filter(kw => text.includes(kw));
      const missingKeywords = requiredKeywords.filter(kw => !text.includes(kw));
      const keywordScore = Math.round((matchedKeywords.length / requiredKeywords.length) * 100);

      const matchedVerbs = actionVerbs.filter(verb => text.includes(verb));
      const formattingScore = Math.min(100, Math.round((matchedVerbs.length / 5) * 80 + 20));

      const educationScore = text.includes("cgpa") || text.includes("gpa") || text.includes("b.tech") || text.includes("degree") ? 95 : 60;
      const projectScore = text.includes("project") ? 88 : 40;
      const experienceScore = text.includes("internship") || text.includes("experience") ? 90 : 50;

      const overallAtsScore = Math.round(
        structureScore * 0.25 + 
        keywordScore * 0.30 + 
        formattingScore * 0.15 + 
        projectScore * 0.15 + 
        experienceScore * 0.15
      );

      const strengths = [];
      const weaknesses = [];
      const suggestions = [];

      if (structureScore >= 90) strengths.push("Well-structured traditional ATS single-column layout.");
      if (matchedKeywords.length >= 8) strengths.push(`Includes ${matchedKeywords.length} top industry technical keywords.`);
      if (text.includes("%") || text.includes("x")) strengths.push("Quantifiable impact metrics (percentages/multipliers) detected.");

      if (missingKeywords.length > 5) {
        weaknesses.push(`Missing key cloud/DevOps keywords: ${missingKeywords.slice(0, 4).join(", ")}`);
        suggestions.push("Add cloud/DevOps keywords like Docker, AWS, or CI/CD to increase recruiter filter matches.");
      }
      if (!text.includes("certifications")) {
        suggestions.push("Add a dedicated 'Certifications' section to validate domain expertise.");
      }
      if (matchedVerbs.length < 4) {
        suggestions.push("Begin bullet points with strong action verbs (e.g. Engineered, Spearheaded, Optimized).");
      }

      const result = {
        overallAtsScore,
        structureScore,
        keywordScore,
        formattingScore,
        educationScore,
        projectScore,
        experienceScore,
        matchedKeywords: matchedKeywords.map(k => k.toUpperCase()),
        missingKeywords: missingKeywords.map(k => k.toUpperCase()),
        strengths: strengths.length ? strengths : ["Clear text format"],
        weaknesses: weaknesses.length ? weaknesses : ["Can include more specialized cloud tools"],
        suggestions: suggestions.length ? suggestions : ["Add GitHub links for all top 3 projects."]
      };

      setAtsResult(result);
      setAnalyzing(false);

      // Save ATS score back to profile
      updateUserProfile({
        atsScore: overallAtsScore,
        atsBreakdown: {
          structure: structureScore,
          keywords: keywordScore,
          skillsCoverage: Math.round((matchedKeywords.length / requiredKeywords.length) * 100),
          education: educationScore,
          projects: projectScore,
          formatting: formattingScore
        },
        missingKeywords: result.missingKeywords.slice(0, 5),
        strengths: result.strengths,
        weaknesses: result.weaknesses
      });

    }, 800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Simulate reading resume document content
      analyzeResume(resumeText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Resume Parsing Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">ATS Resume Checker & Analyzer</h1>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Evaluate your resume structure, keyword matching, section depth, and formatting quality against top tech corporate ATS algorithms.
            </p>
          </div>
          <button
            onClick={() => analyzeResume(resumeText)}
            disabled={analyzing}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
          >
            {analyzing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FileCheck className="w-5 h-5" />
            )}
            <span>{analyzing ? "Analyzing Resume..." : "Run ATS Scan"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Text Editor vs ATS Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Upload & Text Input */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Upload className="w-4 h-4 text-blue-500" />
              <span>Resume File Upload</span>
            </h3>

            <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50/50 dark:bg-slate-900/50">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                  Upload PDF / DOCX Resume
                </span>
                <span className="text-xs text-gray-400 dark:text-slate-500">
                  Current file: <span className="font-mono text-blue-500">{fileName}</span>
                </span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Or Paste Resume Plain Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={12}
                className="w-full p-4 text-xs font-mono rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Paste complete resume text here..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right Column: ATS Analytics Output */}
        <div className="lg:col-span-6 space-y-6">
          {!atsResult ? (
            <div className="glass-card p-10 rounded-3xl border border-gray-200 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ready for ATS Analysis</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-md">
                Click "Run ATS Scan" above to calculate your resume score, missing industry keywords, formatting quality, and section strengths.
              </p>
              <button
                onClick={() => analyzeResume(resumeText)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20"
              >
                Start Instant Analysis
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Overall Score Badge Card */}
              <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Overall ATS Score</span>
                    <h2 className="text-4xl font-black text-white mt-1">{atsResult.overallAtsScore} <span className="text-lg font-normal text-indigo-300">/ 100</span></h2>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl font-bold text-xs ${
                    atsResult.overallAtsScore >= 80 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {atsResult.overallAtsScore >= 80 ? 'ATS Compatible' : 'Needs Optimization'}
                  </div>
                </div>

                {/* Score Breakdown Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-400 block">Structure</span>
                    <span className="text-base font-bold text-indigo-300">{atsResult.structureScore}%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-400 block">Keywords</span>
                    <span className="text-base font-bold text-emerald-300">{atsResult.keywordScore}%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-400 block">Formatting</span>
                    <span className="text-base font-bold text-blue-300">{atsResult.formattingScore}%</span>
                  </div>
                </div>
              </div>

              {/* Keyword Analysis */}
              <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Search className="w-4 h-4 text-indigo-500" />
                  <span>Keyword Coverage</span>
                </h3>

                <div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-2">
                    Matched Industry Keywords ({atsResult.matchedKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {atsResult.missingKeywords.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-2">
                      Recommended Missing Keywords ({atsResult.missingKeywords.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[11px] font-semibold border border-amber-200 dark:border-amber-800">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Strengths, Weaknesses & Actionable Suggestions */}
              <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Insights & Recommendations</span>
                </h3>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Resume Strengths
                  </span>
                  {atsResult.strengths.map((str, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Actionable Improvement Suggestions
                  </span>
                  {atsResult.suggestions.map((sug, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-slate-300">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveTab('predict')}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Proceed to Placement Prediction</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
