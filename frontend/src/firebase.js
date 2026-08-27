import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Default / standard Firebase Configuration
// Environment variables can override this in production (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlacementKey123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "placement-intelligence-system.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "placement-intelligence-system",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "placement-intelligence-system.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "987654321012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:987654321012:web:abcdef123456"
};

// Initialize Firebase App singleton safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
};

// Initial Seed Data for Demo / Standalone Execution
export const INITIAL_DEMO_USERS = {
  student: {
    uid: "std_101",
    email: "student@placement.edu",
    name: "Aarav Sharma",
    role: "student",
    college: "National Institute of Technology",
    branch: "Computer Science & Engineering",
    year: "4th Year",
    cgpa: 8.7,
    codingScore: 88,
    commScore: 82,
    aptitudeScore: 80,
    projectsCount: 4,
    certsCount: 3,
    internship: true,
    skills: ["Python", "React", "Node.js", "SQL", "Data Structures"],
    readinessScore: 86,
    placementProbability: 92,
    atsScore: 84,
    atsBreakdown: {
      structure: 90,
      keywords: 82,
      skillsCoverage: 88,
      education: 95,
      projects: 85,
      formatting: 90
    },
    missingKeywords: ["Docker", "Kubernetes", "CI/CD"],
    strengths: ["Strong DSA foundation", "Full Stack Project Portfolio", "High CGPA"],
    weaknesses: ["DevOps & Containerization experience"],
    resumeName: "Aarav_Sharma_Resume.pdf",
    appliedJobsCount: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  trainer: {
    uid: "trn_201",
    email: "trainer@placement.edu",
    name: "Dr. Rajesh Kumar",
    role: "trainer",
    department: "Training & Placement Cell",
    assignedBatch: "CSE 2026 Batch",
    studentsCount: 145,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  company: {
    uid: "cmp_301",
    email: "hr@techcorp.com",
    name: "TechCorp Global",
    role: "company",
    hrName: "Priya Sundaram",
    industry: "Software & Cloud Services",
    website: "https://techcorpglobal.com",
    isVerified: true,
    activePostings: 3,
    avatar: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=80"
  },
  admin: {
    uid: "adm_401",
    email: "admin@placement.edu",
    name: "System Administrator",
    role: "admin",
    department: "Directorate of Placements",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  }
};
