import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, School, BookOpen, Lock, ArrowRight, BrainCircuit, 
  Calendar, Building2, Users, GraduationCap, Upload, FileText, CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';

const RegisterPage = ({ setActiveTab }) => {
  const { registerUser, loginWithGoogle } = useAuth();
  
  const [role, setRole] = useState('student');
  const [studentStatus, setStudentStatus] = useState('Final-Year Student');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeName: 'National Institute of Technology',
    branch: 'Computer Science & Engineering',
    year: '4th Year',
    companyName: '',
    industry: 'Software & Technology',
    website: 'https://company.com',
    documentType: 'College ID & Bonafide Certificate',
    password: '',
    confirmPassword: ''
  });

  const [documentFile, setDocumentFile] = useState(null);
  const [documentPreviewName, setDocumentPreviewName] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFile(file);
      setDocumentPreviewName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // 1. Validation Checks
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError('Please fill in your Full Name and Email Address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (role === 'student' && !formData.collegeName.trim()) {
      setError('Please specify your College / University name.');
      return;
    }

    if (role === 'company' && !formData.companyName.trim()) {
      setError('Please specify your Company Name.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    // 2. Call registerUser
    const res = registerUser({
      ...formData,
      role,
      studentStatus,
      documentType: role === 'student' 
        ? (studentStatus === 'Graduated Student' ? 'Degree Certificate' : 'College ID & Bonafide Certificate') 
        : 'Corporate Business Verification'
    });

    if (!res.success) {
      setError(res.message);
      return;
    }

    // 3. Handle Success
    setSuccessMsg(res.message);
    
    // Automatic Redirect after brief delay
    setTimeout(() => {
      if (role === 'student') {
        setActiveTab('dashboard');
      } else if (role === 'trainer') {
        setActiveTab('trainer_dashboard');
      } else if (role === 'company') {
        setActiveTab('company_dashboard');
      }
    }, 1800);
  };

  const handleGoogleSignup = async () => {
    const res = await loginWithGoogle(null, null, role);
    if (res.success) {
      if (role === 'student') setActiveTab('dashboard');
      else if (role === 'company') setActiveTab('company_dashboard');
      else setActiveTab('trainer_dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full glass-card rounded-3xl p-8 space-y-6 border border-gray-200 dark:border-slate-800 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 mb-1">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Create Placement Intelligence Account</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">Join the Placement & Recruitment Ecosystem</p>
        </div>

        {/* Role Selector Pills */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl">
          {[
            { id: 'student', label: 'Student Candidate', icon: GraduationCap },
            { id: 'company', label: 'Company HR', icon: Building2 },
            { id: 'trainer', label: 'Placement Trainer', icon: Users }
          ].map((r) => {
            const Icon = r.icon;
            const isSel = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => { setRole(r.id); setError(''); setSuccessMsg(''); }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all ${
                  isSel
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 text-xs font-bold border border-red-300 dark:border-red-800 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold">{successMsg}</p>
              <p className="text-[10px] font-normal opacity-90">Redirecting to your dashboard...</p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.01]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign Up with Google (Gmail Authentication)</span>
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-gray-200 dark:border-slate-800 w-full"></div>
          <span className="bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-gray-400 absolute">Or Complete Registration Form</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                {role === 'company' ? 'HR Contact Name' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={role === 'company' ? 'Priya Sundaram' : 'Aarav Sharma'}
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={role === 'company' ? 'hr@techcorp.com' : 'aarav@placement.edu'}
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Student Status Toggle for Student Role */}
          {role === 'student' && (
            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
              <label className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                Educational Verification Status Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStudentStatus('Final-Year Student')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    studentStatus === 'Final-Year Student'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300'
                  }`}
                >
                  Final-Year Student
                </button>

                <button
                  type="button"
                  onClick={() => setStudentStatus('Graduated Student')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    studentStatus === 'Graduated Student'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300'
                  }`}
                >
                  Graduated Student
                </button>
              </div>
            </div>
          )}

          {/* Role Specific Inputs */}
          {role === 'student' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">College / University Name</label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="collegeName"
                    required
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="National Institute of Technology"
                    className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Branch</label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                    >
                      <option value="Computer Science & Engineering">Computer Science & Eng</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Artificial Intelligence & ML">AI & Data Science</option>
                      <option value="Electronics & Communication">Electronics & Comm</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Academic Year</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year (Final Year)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Upload Educational Proof Document Section */}
              <div className="p-4 rounded-2xl border border-dashed border-blue-300 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-gray-800 dark:text-slate-200">
                      Upload Educational Proof ({studentStatus === 'Graduated Student' ? 'Degree Certificate' : 'College ID / Bonafide'})
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-800 font-bold">Default: PENDING</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer flex items-center space-x-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Proof File</span>
                    <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                  </label>
                  <span className="text-[11px] text-gray-500 font-mono truncate max-w-[200px]">
                    {documentPreviewName || 'Sample_College_ID.pdf'}
                  </span>
                </div>
              </div>
            </>
          ) : role === 'company' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="TechCorp Global"
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Industry / Domain</label>
                  <input
                    type="text"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="Software & Cloud Services"
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>
            </>
          ) : null}

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>Create {role.toUpperCase()} Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 dark:border-slate-800">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Already registered?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
