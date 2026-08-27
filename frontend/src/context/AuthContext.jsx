import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  INITIAL_DEMO_USERS 
} from '../firebase';

const AuthContext = createContext();

// Sample Seed Data for initial application ecosystem state
const DEFAULT_JOBS = [
  {
    id: "job_101",
    companyId: "cmp_301",
    companyName: "TechCorp Global",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80",
    title: "Software Development Engineer (SDE-1)",
    roleCategory: "Software Engineer",
    branchEligibility: ["CSE", "IT", "ECE"],
    minCgpa: 7.5,
    minAtsScore: 75,
    minPlacementScore: 70,
    requiredSkills: ["Python", "React", "Data Structures", "SQL"],
    location: "Bangalore / Remote",
    salaryRange: "₹10.0 LPA – ₹14.0 LPA",
    jobType: "Full-Time",
    description: "Looking for high-caliber graduate engineers proficient in data structures, algorithms, modern web technologies, and backend microservices architecture.",
    status: "active",
    postedDate: "2026-08-20"
  },
  {
    id: "job_102",
    companyId: "cmp_302",
    companyName: "DataMetrics AI",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    title: "Associate Data Analyst",
    roleCategory: "Data Analyst",
    branchEligibility: ["CSE", "IT", "Data Science", "EEE"],
    minCgpa: 7.0,
    minAtsScore: 70,
    minPlacementScore: 65,
    requiredSkills: ["Python", "SQL", "Tableau", "Statistics"],
    location: "Hyderabad",
    salaryRange: "₹7.5 LPA – ₹10.5 LPA",
    jobType: "Full-Time",
    description: "Seeking analytical minds to model complex dataset insights, execute SQL queries, build dashboards, and support product decision making.",
    status: "active",
    postedDate: "2026-08-22"
  },
  {
    id: "job_103",
    companyId: "cmp_303",
    companyName: "CloudScale Systems",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    title: "Cloud Infrastructure Specialist",
    roleCategory: "Cloud Engineer",
    branchEligibility: ["CSE", "IT", "ECE"],
    minCgpa: 7.2,
    minAtsScore: 72,
    minPlacementScore: 68,
    requiredSkills: ["Cloud Computing", "Docker", "Linux", "Git"],
    location: "Pune / Hybrid",
    salaryRange: "₹8.5 LPA – ₹12.0 LPA",
    jobType: "Full-Time",
    description: "Automate cloud deployment pipelines, monitor containerized clusters, and manage secure hybrid cloud environments.",
    status: "active",
    postedDate: "2026-08-25"
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: "app_501",
    jobId: "job_101",
    jobTitle: "Software Development Engineer (SDE-1)",
    companyId: "cmp_301",
    companyName: "TechCorp Global",
    studentId: "std_101",
    studentName: "Aarav Sharma",
    studentEmail: "student@placement.edu",
    studentBranch: "Computer Science",
    cgpa: 8.7,
    atsScore: 84,
    placementScore: 92,
    status: "Interview Scheduled",
    interviewDate: "2026-08-30",
    interviewTime: "10:30 AM",
    appliedAt: "2026-08-21",
    notes: "Shortlisted for Technical Round 1."
  },
  {
    id: "app_502",
    jobId: "job_102",
    jobTitle: "Associate Data Analyst",
    companyId: "cmp_302",
    companyName: "DataMetrics AI",
    studentId: "std_101",
    studentName: "Aarav Sharma",
    studentEmail: "student@placement.edu",
    studentBranch: "Computer Science",
    cgpa: 8.7,
    atsScore: 84,
    placementScore: 92,
    status: "Shortlisted",
    interviewDate: "",
    interviewTime: "",
    appliedAt: "2026-08-23",
    notes: "Awaiting candidate slot preference."
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann_1",
    trainerId: "trn_201",
    trainerName: "Dr. Rajesh Kumar",
    title: "Mock Technical Interview Schedule - SDE Roles",
    content: "All 4th year CSE & IT students preparing for Tier-1 company campus drives are requested to submit their updated ATS resume for pre-screening by Friday.",
    targetBatch: "4th Year All Branches",
    priority: "High",
    createdAt: "2026-08-26 14:00"
  },
  {
    id: "ann_2",
    trainerId: "trn_201",
    trainerName: "Dr. Rajesh Kumar",
    title: "Aptitude & DSA Speed Test Bootcamp",
    content: "Join our intensive live webinar on Dynamic Programming patterns and Quantitative Reasoning speed hacks this Saturday at 10 AM.",
    targetBatch: "3rd & 4th Year",
    priority: "Medium",
    createdAt: "2026-08-25 09:30"
  }
];

const DEFAULT_TRAINER_FEEDBACK = [
  {
    id: "fb_1",
    trainerId: "trn_201",
    trainerName: "Dr. Rajesh Kumar",
    studentId: "std_101",
    studentName: "Aarav Sharma",
    rating: 4.8,
    category: "Coding & System Design",
    feedbackText: "Demonstrates high problem-solving speed in Data Structures. Advised to practice System Design fundamentals for SDE-1 interviews.",
    createdAt: "2026-08-24 16:30"
  }
];

const DEFAULT_EMAIL_LOGS = [];

export const AuthProvider = ({ children }) => {
  // Dark mode theme toggle state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Active Role & User state
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('placement_active_role') || 'student';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('placement_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return INITIAL_DEMO_USERS.student;
      }
    }
    return INITIAL_DEMO_USERS.student;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('placement_authenticated') === 'true' || true;
  });

  // State collections for Jobs, Applications, Announcements, Feedback, Email logs
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('placement_jobs');
    return saved ? JSON.parse(saved) : DEFAULT_JOBS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('placement_applications');
    return saved ? JSON.parse(saved) : DEFAULT_APPLICATIONS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('placement_announcements');
    return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
  });

  const [trainerFeedback, setTrainerFeedback] = useState(() => {
    const saved = localStorage.getItem('placement_trainer_feedback');
    return saved ? JSON.parse(saved) : DEFAULT_TRAINER_FEEDBACK;
  });

  const [emailLogs, setEmailLogs] = useState(() => {
    const saved = localStorage.getItem('placement_email_logs');
    return saved ? JSON.parse(saved) : DEFAULT_EMAIL_LOGS;
  });

  const [savedCandidates, setSavedCandidates] = useState([]);

  // System statistics calculation
  const [predictionResult, setPredictionResult] = useState(() => {
    const saved = localStorage.getItem('latest_prediction');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('placement_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('placement_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('placement_active_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('placement_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('placement_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('placement_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('placement_trainer_feedback', JSON.stringify(trainerFeedback));
  }, [trainerFeedback]);

  useEffect(() => {
    localStorage.setItem('placement_email_logs', JSON.stringify(emailLogs));
  }, [emailLogs]);

  // Demo role switcher function
  const switchRole = (newRole) => {
    const targetDemoUser = INITIAL_DEMO_USERS[newRole] || INITIAL_DEMO_USERS.student;
    setActiveRole(newRole);
    setUser(targetDemoUser);
    setIsAuthenticated(true);
    localStorage.setItem('placement_authenticated', 'true');
  };

  // Auth Methods
  const login = (email, password, roleChoice = 'student') => {
    const roleKey = roleChoice || 'student';
    const newUser = {
      ...INITIAL_DEMO_USERS[roleKey],
      email: email || INITIAL_DEMO_USERS[roleKey].email,
      name: email ? email.split('@')[0].toUpperCase() : INITIAL_DEMO_USERS[roleKey].name
    };
    setUser(newUser);
    setActiveRole(roleKey);
    setIsAuthenticated(true);
    localStorage.setItem('placement_authenticated', 'true');
  };

  const loginWithGoogle = async () => {
    try {
      // Attempt Firebase Google Popup sign in
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const newUser = {
        uid: googleUser.uid,
        email: googleUser.email,
        name: googleUser.displayName || googleUser.email.split('@')[0],
        role: activeRole,
        avatar: googleUser.photoURL || INITIAL_DEMO_USERS[activeRole].avatar,
        college: "Institute of Technology",
        branch: "Computer Science & Engineering",
        year: "4th Year",
        cgpa: 8.5,
        skills: ["Python", "React", "SQL"]
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('placement_authenticated', 'true');
      return { success: true, user: newUser };
    } catch (error) {
      console.warn("Google popup fallback mode activated:", error.message);
      // Fallback demo Google Login for seamless offline testing
      const demoUser = {
        uid: "goog_999",
        email: "demo.student@gmail.com",
        name: "Google Authenticated Student",
        role: "student",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        college: "Tech University",
        branch: "Computer Science",
        year: "4th Year",
        cgpa: 8.9,
        skills: ["Python", "React", "TypeScript", "SQL"]
      };
      setUser(demoUser);
      setActiveRole("student");
      setIsAuthenticated(true);
      localStorage.setItem('placement_authenticated', 'true');
      return { success: true, user: demoUser };
    }
  };

  const registerUser = (userData) => {
    const newUser = {
      uid: `usr_${Date.now()}`,
      name: userData.fullName || "New User",
      email: userData.email,
      role: userData.role || "student",
      college: userData.collegeName || "Tech University",
      branch: userData.branch || "Computer Science",
      year: userData.year || "4th Year",
      cgpa: parseFloat(userData.cgpa || 8.0),
      skills: userData.skills ? userData.skills.split(',').map(s => s.trim()) : ["Python", "SQL"]
    };
    setUser(newUser);
    setActiveRole(newUser.role);
    setIsAuthenticated(true);
    localStorage.setItem('placement_authenticated', 'true');
  };

  const logout = () => {
    try {
      signOut(auth);
    } catch (e) {
      // safe fallback
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('placement_authenticated');
    localStorage.removeItem('placement_user');
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: `Password reset email sent to ${email}` };
    } catch (e) {
      return { success: true, message: `Password reset instructions sent to ${email} (Demo Mode)` };
    }
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedData };
      return updated;
    });
  };

  // Job Management actions
  const createJobPosting = (jobData) => {
    const newJob = {
      id: `job_${Date.now()}`,
      companyId: user.uid || "cmp_301",
      companyName: user.name || "TechCorp Global",
      companyLogo: user.avatar || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80",
      status: "active",
      postedDate: new Date().toISOString().split('T')[0],
      ...jobData
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const updateJobPosting = (jobId, updatedData) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updatedData } : j));
  };

  const deleteJobPosting = (jobId) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
  };

  // Job Application actions
  const applyForJob = (jobId) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    const existing = applications.find(a => a.jobId === jobId && a.studentId === (user.uid || "std_101"));
    if (existing) return existing;

    const newApp = {
      id: `app_${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      studentId: user.uid || "std_101",
      studentName: user.name || "Aarav Sharma",
      studentEmail: user.email || "student@placement.edu",
      studentBranch: user.branch || "Computer Science",
      cgpa: user.cgpa || 8.7,
      atsScore: user.atsScore || 84,
      placementScore: user.placementProbability || 92,
      status: "Applied",
      interviewDate: "",
      interviewTime: "",
      appliedAt: new Date().toISOString().split('T')[0],
      notes: "Application submitted."
    };

    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateApplicationStatus = (appId, newStatus, interviewDate = "", interviewTime = "", notes = "") => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: newStatus,
          interviewDate: interviewDate || a.interviewDate,
          interviewTime: interviewTime || a.interviewTime,
          notes: notes || a.notes
        };
      }
      return a;
    }));
  };

  // Announcement Actions
  const createAnnouncement = (announcementData) => {
    const newAnn = {
      id: `ann_${Date.now()}`,
      trainerId: user.uid || "trn_201",
      trainerName: user.name || "Dr. Rajesh Kumar",
      createdAt: new Date().toLocaleString(),
      ...announcementData
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  // Feedback Actions
  const addTrainerFeedback = (feedbackData) => {
    const newFeedback = {
      id: `fb_${Date.now()}`,
      trainerId: user.uid || "trn_201",
      trainerName: user.name || "Dr. Rajesh Kumar",
      createdAt: new Date().toLocaleString(),
      ...feedbackData
    };
    setTrainerFeedback(prev => [newFeedback, ...prev]);
  };

  // Send Email Communication action
  const sendEmailToCandidate = (emailData) => {
    const logEntry = {
      id: `mail_${Date.now()}`,
      senderCompany: user.name || "Company HR",
      candidateId: emailData.candidateId,
      candidateEmail: emailData.candidateEmail,
      candidateName: emailData.candidateName,
      subject: emailData.subject,
      body: emailData.body,
      templateType: emailData.templateType,
      sentAt: new Date().toLocaleString(),
      status: "Sent Successfully"
    };
    setEmailLogs(prev => [logEntry, ...prev]);
    return logEntry;
  };

  // Candidate Shortlisting
  const toggleSaveCandidate = (candidateId) => {
    setSavedCandidates(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      } else {
        return [...prev, candidateId];
      }
    });
  };

  return (
    <AuthContext.Provider value={{
      darkMode,
      toggleDarkMode,
      activeRole,
      switchRole,
      user,
      isAuthenticated,
      login,
      loginWithGoogle,
      registerUser,
      logout,
      resetPassword,
      updateUserProfile,
      jobs,
      createJobPosting,
      updateJobPosting,
      deleteJobPosting,
      applications,
      applyForJob,
      updateApplicationStatus,
      announcements,
      createAnnouncement,
      trainerFeedback,
      addTrainerFeedback,
      emailLogs,
      sendEmailToCandidate,
      savedCandidates,
      toggleSaveCandidate,
      predictionResult,
      setPredictionResult
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
