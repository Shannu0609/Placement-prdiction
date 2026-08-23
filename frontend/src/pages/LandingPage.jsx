import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, Cpu, Award, Users, CheckCircle2, ShieldCheck, BarChart3, LineChart, Star, Compass } from 'lucide-react';

const LandingPage = ({ setActiveTab }) => {
  const features = [
    {
      icon: Sparkles,
      title: "Placement Prediction",
      desc: "ML-driven classification algorithm evaluating CGPA, technical skills, aptitude & internships to calculate your exact placement chance.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Salary Package Estimator",
      desc: "Random Forest Regressor forecasting realistic expected CTC range in LPA based on past placement benchmarks.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Compass,
      title: "Career Path Recommendation",
      desc: "Smart skill-role matrix matching your profile against top tech roles like Software Developer, Data Scientist, Frontend Dev, & DevOps.",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: BarChart3,
      title: "Skill Gap Diagnostic",
      desc: "Identifies technical weaknesses, missing industry certifications, and generates custom step-by-step improvement roadmaps.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Student Dashboard",
      desc: "Unified hub tracking historical predictions, profile metrics, skill strength scores, and job market readiness index.",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: LineChart,
      title: "Performance Analytics",
      desc: "Interactive visual charts, skill radar diagrams, and progress indicators designed for student evaluation & mentor guidance.",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const stats = [
    { label: "Students Analyzed", val: "10,000+" },
    { label: "Predictions Generated", val: "45,000+" },
    { label: "Career Paths Suggested", val: "12,000+" },
    { label: "Placement Success Rate", val: "94.2%" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Placed at Microsoft (18 LPA)",
      college: "IIT Bombay",
      comment: "The skill gap analysis pointed out my exact weak spots in Data Structures & System Design. Following the recommendation plan directly helped me clear my campus placement!",
      rating: 5
    },
    {
      name: "Aman Verma",
      role: "Placed at Amazon (14 LPA)",
      college: "NIT Trichy",
      comment: "The salary predictor was amazingly accurate! Predicted ₹12-15 LPA for my profile and I bagged ₹14 LPA. The dashboard gave me confidence before interviews.",
      rating: 5
    },
    {
      name: "Rohan Nair",
      role: "Placed at Deloitte (8.5 LPA)",
      college: "VIT Vellore",
      comment: "A must-have tool for every engineering student. It feels like having a personal career coach guiding your skill building.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider animate-pulse-subtle">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span>AI Powered EdTech Career Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Placement Intelligence System
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            "Predict Your Placement Potential and Build a Better Career Path"
          </p>

          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
            AI-powered platform that predicts placement probability, recommends career paths, identifies skill gaps, and estimates salary packages using Random Forest ML models.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('predict')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('predict')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-gray-800 dark:text-white font-bold text-base hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-700"
            >
              Try Demo
            </button>
          </div>

          {/* Hero Visualization Card / Graph Mockup */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/20 transition-all duration-700"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Mock Card 1 */}
                <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">PLACEMENT PROBABILITY</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600">HIGH CHANCE</span>
                  </div>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">88.5%</div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[88%] rounded-full"></div>
                  </div>
                </div>

                {/* Mock Card 2 */}
                <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">EXPECTED SALARY CTC</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-600">PREDICTED</span>
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">₹7 LPA – ₹11 LPA</div>
                  <p className="text-xs text-gray-500">Based on 8.5 CGPA & 85 Coding Score</p>
                </div>

                {/* Mock Card 3 */}
                <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">TOP CAREER MATCH</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-600">95% MATCH</span>
                  </div>
                  <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">Software Developer</div>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-300">Python</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-300">React</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-300">DSA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Platform Capability</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Everything You Need to Secure Top Placements
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
            Comprehensive ML analytics tailored to engineering and technology students looking for top CTC offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glass-card rounded-3xl p-6 space-y-4 hover:scale-[1.02] transition-transform">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} text-white flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animated Statistics Section */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white py-16 rounded-3xl max-w-7xl mx-auto px-6 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {s.val}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Student Stories</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Trusted by Students Across Top Engineering Colleges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{t.role}</p>
                  <p className="text-[10px] text-gray-400">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Callout */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-transparent border border-blue-500/30">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Ready to Discover Your Placement Probability?
          </h2>
          <p className="text-sm text-gray-600 dark:text-slate-300 max-w-lg mx-auto">
            Input your academic metrics, test scores, and skills to receive instant Random Forest machine learning predictions.
          </p>
          <button
            onClick={() => setActiveTab('predict')}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/30 inline-flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
