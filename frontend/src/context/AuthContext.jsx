import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  INITIAL_DEMO_USERS 
} from '../firebase';

const AuthContext = createContext();

const DEFAULT_JOBS = [
  {
    id: "job_101",
    companyId: "cmp_301",
    companyName: "TechCorp Global",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80",
    title: "Software Development Engineer (SDE-1)",
    roleCategory: "Software Engineer",
    workMode: "Hybrid",
    location: "Bangalore / Hybrid",
    minCgpa: 7.5,
    minAtsScore: 75,
    minPlacementScore: 70,
    requiredSkills: ["Python", "React", "SQL", "Data Structures"],
    preferredSkills: ["Docker", "Cloud Computing"],
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
    workMode: "On-site",
    location: "Hyderabad",
    minCgpa: 7.0,
    minAtsScore: 70,
    minPlacementScore: 65,
    requiredSkills: ["Python", "SQL"],
    preferredSkills: ["Machine Learning", "Tableau"],
    salaryRange: "₹7.5 LPA – ₹10.5 LPA",
    jobType: "Full-Time",
    description: "Seeking analytical minds to model complex dataset insights, execute SQL queries, build dashboards, and support product decision making.",
    status: "active",
    postedDate: "2026-08-22"
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
    matchScore: 92,
    status: "Assessment Pending",
    assessmentTitle: "SDE-1 Multi-Section Assessment",
    assessmentDurationMins: 150,
    appliedAt: "2026-08-21"
  }
];

const DEFAULT_VERIFICATIONS = [
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
    status: "VERIFIED",
    extractedInfo: {
      extractedName: "Aarav Sharma",
      extractedCollege: "National Institute of Technology",
      extractedDegree: "B.Tech CSE",
      extractedYear: "2026"
    }
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann_1",
    title: "Mock Technical Interviews Schedule",
    content: "Mock technical coding interviews for CSE & IT 2026 batch will begin next Monday.",
    author: "Dr. Rajesh Kumar",
    date: "2026-08-25"
  }
];

const DEFAULT_TRAINER_FEEDBACK = [
  {
    id: "fb_1",
    studentId: "std_101",
    trainerName: "Dr. Rajesh Kumar",
    category: "Coding & DSA",
    feedbackText: "Strong problem solving in arrays and dynamic programming. Focus on practicing graph traversal algorithms."
  }
];

export const AuthProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  const [activeRole, setActiveRole] = useState(() => localStorage.getItem('placement_active_role') || 'student');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('placement_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('placement_user');
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('placement_registered_users');
    return saved ? JSON.parse(saved) : Object.values(INITIAL_DEMO_USERS);
  });

  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [applications, setApplications] = useState(DEFAULT_APPLICATIONS);
  const [studentVerifications, setStudentVerifications] = useState(DEFAULT_VERIFICATIONS);
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS);
  const [trainerFeedback, setTrainerFeedback] = useState(DEFAULT_TRAINER_FEEDBACK);

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

  const switchRole = (newRole) => {
    const targetDemoUser = INITIAL_DEMO_USERS[newRole] || INITIAL_DEMO_USERS.student;
    setActiveRole(newRole);
    setUser(targetDemoUser);
    setIsAuthenticated(true);
    localStorage.setItem('placement_active_role', newRole);
    localStorage.setItem('placement_user', JSON.stringify(targetDemoUser));
  };

  const login = (email, password, roleChoice = 'student') => {
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, message: "Please enter both Email and Password." };
    }

    const existingUser = (registeredUsers || []).find(u => u.email?.toLowerCase() === cleanEmail);
    
    if (existingUser) {
      setUser(existingUser);
      setActiveRole(existingUser.role || roleChoice);
      setIsAuthenticated(true);
      localStorage.setItem('placement_active_role', existingUser.role || roleChoice);
      localStorage.setItem('placement_user', JSON.stringify(existingUser));
      return { success: true, user: existingUser };
    }

    const roleKey = roleChoice || 'student';
    const demoUser = INITIAL_DEMO_USERS[roleKey];
    if (demoUser && (cleanEmail === demoUser.email.toLowerCase() || cleanEmail.includes("placement.edu") || cleanEmail.includes("techcorp"))) {
      setUser(demoUser);
      setActiveRole(demoUser.role);
      setIsAuthenticated(true);
      localStorage.setItem('placement_active_role', demoUser.role);
      localStorage.setItem('placement_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    }

    const guestUser = {
      uid: `usr_${Date.now()}`,
      name: cleanEmail.split('@')[0].toUpperCase(),
      email: cleanEmail,
      role: roleKey,
      verificationStatus: roleKey === 'student' ? 'PENDING' : 'VERIFIED',
      college: "Tech University",
      branch: "Computer Science",
      year: "4th Year",
      cgpa: 8.0,
      skills: ["Python", "React", "SQL"]
    };

    setUser(guestUser);
    setActiveRole(roleKey);
    setIsAuthenticated(true);
    localStorage.setItem('placement_active_role', roleKey);
    localStorage.setItem('placement_user', JSON.stringify(guestUser));
    return { success: true, user: guestUser };
  };

  const loginWithGoogle = async (googleAccountEmail, googleDisplayName, roleChoice = 'student') => {
    const roleKey = roleChoice || activeRole || 'student';
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "";
    
    if (!googleAccountEmail && apiKey && !apiKey.startsWith("AIzaSyDemo") && auth) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const googleUser = result.user;
        const newUser = {
          uid: googleUser.uid,
          email: googleUser.email,
          name: googleUser.displayName || googleUser.email.split('@')[0],
          role: roleKey,
          verificationStatus: "VERIFIED",
          avatar: googleUser.photoURL || INITIAL_DEMO_USERS[roleKey].avatar,
          college: "National Institute of Technology",
          branch: "Computer Science & Engineering",
          year: "4th Year",
          cgpa: 8.7,
          skills: ["Python", "React", "Node.js", "SQL", "Data Structures"]
        };
        setUser(newUser);
        setActiveRole(roleKey);
        setIsAuthenticated(true);
        localStorage.setItem('placement_active_role', roleKey);
        localStorage.setItem('placement_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
      } catch (error) {
        console.warn("Firebase Google popup error fallback:", error.message);
      }
    }

    const emailToUse = googleAccountEmail || "student.placement@gmail.com";
    const nameToUse = googleDisplayName || (emailToUse ? emailToUse.split('@')[0].toUpperCase() : "GOOGLE CANDIDATE");
    const newUser = {
      uid: `goog_${Date.now()}`,
      email: emailToUse,
      name: nameToUse,
      role: roleKey,
      verificationStatus: "VERIFIED",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      college: "National Institute of Technology",
      branch: "Computer Science & Engineering",
      year: "4th Year",
      cgpa: 8.8,
      skills: ["Python", "React", "TypeScript", "SQL"]
    };
    setUser(newUser);
    setActiveRole(roleKey);
    setIsAuthenticated(true);
    localStorage.setItem('placement_active_role', roleKey);
    localStorage.setItem('placement_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const registerUser = (userData) => {
    const cleanEmail = (userData.email || "").trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: "Email address is required." };
    }

    const isDuplicate = (registeredUsers || []).some(u => u.email?.toLowerCase() === cleanEmail);
    if (isDuplicate) {
      return { 
        success: false, 
        message: "This email address is already registered. Please sign in or use a different email." 
      };
    }

    const targetRole = userData.role || "student";
    
    const newUser = {
      uid: `usr_${Date.now()}`,
      name: userData.fullName || userData.companyName || "New User",
      email: cleanEmail,
      role: targetRole,
      studentStatus: userData.studentStatus || "Final-Year Student",
      verificationStatus: targetRole === 'student' ? 'PENDING' : 'VERIFIED',
      college: userData.collegeName || "Tech University",
      branch: userData.branch || "Computer Science",
      year: userData.year || "4th Year",
      companyName: userData.companyName || userData.fullName,
      industry: userData.industry || "Software & Technology",
      website: userData.website || "https://example.com",
      cgpa: parseFloat(userData.cgpa || 8.0),
      skills: ["Python", "React", "SQL"],
      avatar: targetRole === 'company' 
        ? "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    if (targetRole === 'student') {
      const newVerification = {
        id: `ver_${Date.now()}`,
        studentId: newUser.uid,
        name: newUser.name,
        email: newUser.email,
        college: newUser.college,
        degree: "B.Tech",
        department: newUser.branch,
        studentStatus: newUser.studentStatus,
        graduationYear: "2026",
        documentType: userData.documentType || "College ID & Bonafide Certificate",
        documentUrl: userData.documentUrl || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        submittedAt: new Date().toLocaleString(),
        status: "PENDING",
        extractedInfo: {
          extractedName: newUser.name,
          extractedCollege: newUser.college,
          extractedDegree: "B.Tech",
          extractedYear: "2026"
        }
      };
      setStudentVerifications(prev => [newVerification, ...(prev || [])]);
    }

    const updatedUsers = [newUser, ...(registeredUsers || [])];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('placement_registered_users', JSON.stringify(updatedUsers));

    return { 
      success: true, 
      message: "Account created successfully. Please login to continue.",
      user: newUser 
    };
  };

  const logout = () => {
    try { signOut(auth); } catch (e) {}
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('placement_user');
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('placement_user', JSON.stringify(updated));
      return updated;
    });
  };

  const updateVerificationStatus = (verificationId, newStatus, adminComment = "") => {
    setStudentVerifications(prev => (prev || []).map(v => v.id === verificationId ? { ...v, status: newStatus, adminComment } : v));
  };

  const createJobPosting = (jobData) => {
    const newJob = {
      id: `job_${Date.now()}`,
      companyId: user?.uid || "cmp_301",
      companyName: user?.name || "TechCorp Global",
      companyLogo: user?.avatar || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80",
      status: "active",
      postedDate: new Date().toISOString().split('T')[0],
      ...jobData
    };
    setJobs(prev => [newJob, ...(prev || [])]);
    return newJob;
  };

  const applyForJob = (jobId) => {
    const targetJob = (jobs || []).find(j => j.id === jobId);
    if (!targetJob) return;

    const newApp = {
      id: `app_${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      studentId: user?.uid || "std_101",
      studentName: user?.name || "Aarav Sharma",
      studentEmail: user?.email || "student@placement.edu",
      studentBranch: user?.branch || "Computer Science",
      cgpa: user?.cgpa || 8.7,
      atsScore: user?.atsScore || 84,
      placementScore: user?.placementProbability || 92,
      matchScore: 88,
      status: "Applied",
      appliedAt: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...(prev || [])]);
    return newApp;
  };

  return (
    <AuthContext.Provider value={{
      darkMode,
      toggleDarkMode,
      activeRole,
      switchRole,
      user,
      isAuthenticated,
      registeredUsers: registeredUsers || [],
      login,
      loginWithGoogle,
      registerUser,
      logout,
      updateUserProfile,
      studentVerifications: studentVerifications || [],
      updateVerificationStatus,
      jobs: jobs || [],
      createJobPosting,
      applications: applications || [],
      applyForJob,
      announcements: announcements || [],
      trainerFeedback: trainerFeedback || []
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
