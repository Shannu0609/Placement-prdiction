import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { runFullPlacementAnalysis } from '../utils/api';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle, Code, Award, BookOpen, Briefcase, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

const PredictPage = ({ setActiveTab }) => {
  const { user, savePredictionResult } = useAuth();
  const [loading, setLoading] = useState(false);

  const availableSkills = [
    "Python", "Java", "C++", "JavaScript", "React", "Node.js",
    "SQL", "Data Structures", "Machine Learning", "Cloud Computing", "Git", "Docker"
  ];

  const [formData, setFormData] = useState({
    cgpa: 8.5,
    coding_score: 85,
    communication_score: 80,
    aptitude_score: 78,
    projects_count: 4,
    certifications_count: 3,
    internship: true,
    skills: ["Python", "React", "SQL", "Data Structures"]
  });

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  // Demo presets for evaluator speed testing
  const applyPreset = (type) => {
    if (type === 'high') {
      setFormData({
        cgpa: 9.2,
        coding_score: 90,
        communication_score: 88,
        aptitude_score: 87,
        projects_count: 5,
        certifications_count: 4,
        internship: true,
        skills: ["Python", "Java", "React", "SQL", "Data Structures", "Machine Learning", "Git"]
      });
    } else if (type === 'medium') {
      setFormData({
        cgpa: 7.2,
        coding_score: 65,
        communication_score: 68,
        aptitude_score: 64,
        projects_count: 2,
        certifications_count: 1,
        internship: false,
        skills: ["Java", "SQL", "Git"]
      });
    } else if (type === 'low') {
      setFormData({
        cgpa: 5.6,
        coding_score: 35,
        communication_score: 42,
        aptitude_score: 40,
        projects_count: 0,
        certifications_count: 0,
        internship: false,
        skills: ["C++"]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const analysisResult = await runFullPlacementAnalysis({
        ...formData,
        student_name: user?.name || "Student User"
      });

      savePredictionResult(analysisResult);

      if (analysisResult.probability >= 75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        setLoading(false);
        setActiveTab('result');
      }, 800);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-blue-500" />
          <span>Random Forest Classification & Regression Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Placement & Career Predictor
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Enter your academic credentials and technical scores below to predict your placement probability, CTC salary range, and skill gaps.
        </p>

        {/* Demo Fast Preset Bar */}
        <div className="pt-2 flex items-center justify-center space-x-2 text-xs">
          <span className="text-gray-400 font-semibold">Demo Candidates:</span>
          <button
            type="button"
            onClick={() => applyPreset('high')}
            className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-200 transition-colors"
          >
            High Chance
          </button>
          <button
            type="button"
            onClick={() => applyPreset('medium')}
            className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold hover:bg-amber-200 transition-colors"
          >
            Medium Chance
          </button>
          <button
            type="button"
            onClick={() => applyPreset('low')}
            className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-semibold hover:bg-red-200 transition-colors"
          >
            Low Chance
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-gray-200 dark:border-slate-800 shadow-2xl">
        {/* Section 1: Academic & Scores */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Academic Performance & Assessment Scores</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* CGPA */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-gray-700 dark:text-slate-300">CGPA (0 - 10)</label>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.cgpa}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.cgpa}
                onChange={(e) => handleInputChange('cgpa', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Coding Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-gray-700 dark:text-slate-300">Coding Score (0 - 100)</label>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.coding_score}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={formData.coding_score}
                onChange={(e) => handleInputChange('coding_score', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Communication Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-gray-700 dark:text-slate-300">Communication Score (0 - 100)</label>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.communication_score}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={formData.communication_score}
                onChange={(e) => handleInputChange('communication_score', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Aptitude Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-gray-700 dark:text-slate-300">Aptitude Score (0 - 100)</label>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.aptitude_score}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={formData.aptitude_score}
                onChange={(e) => handleInputChange('aptitude_score', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Projects & Internships */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <span>Projects, Certifications & Internship</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Number of Projects */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Number of Projects (0-20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={formData.projects_count}
                onChange={(e) => handleInputChange('projects_count', parseInt(e.target.value) || 0)}
                className="w-full glass-input px-4 py-2.5 rounded-xl text-sm"
              />
            </div>

            {/* Certifications Count */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Certifications Count (0-20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={formData.certifications_count}
                onChange={(e) => handleInputChange('certifications_count', parseInt(e.target.value) || 0)}
                className="w-full glass-input px-4 py-2.5 rounded-xl text-sm"
              />
            </div>

            {/* Internship Toggle */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-slate-300">Internship Experience</label>
              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="internship"
                    checked={formData.internship === true}
                    onChange={() => handleInputChange('internship', true)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800 dark:text-slate-200 font-medium">Yes (1)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="internship"
                    checked={formData.internship === false}
                    onChange={() => handleInputChange('internship', false)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800 dark:text-slate-200 font-medium">No (0)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Multi-select Skills */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
            <Code className="w-5 h-5 text-emerald-600" />
            <span>Technical Skills Selection</span>
          </h3>

          <div className="flex flex-wrap gap-2.5">
            {availableSkills.map((sk) => {
              const isSelected = formData.skills.includes(sk);
              return (
                <button
                  type="button"
                  key={sk}
                  onClick={() => toggleSkill(sk)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.03]'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                  <span>{sk}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Predict Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 flex items-center justify-center space-x-3 transition-all hover:scale-[1.01]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Machine Learning Algorithms...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Predict Placement Potential</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictPage;
