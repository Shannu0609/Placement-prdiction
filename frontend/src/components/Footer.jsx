import React from 'react';
import { BrainCircuit, Heart, Globe, Share2, Code } from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Placement Intel
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Predict Your Placement Potential and Build a Better Career Path with machine learning intelligence.
            </p>
            <div className="flex items-center space-x-3 text-gray-400 dark:text-slate-500">
              <a href="#" className="hover:text-blue-500 transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Code className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-400">
              <li><button onClick={() => setActiveTab('predict')} className="hover:text-blue-600 dark:hover:text-blue-400">Placement Predictor</button></li>
              <li><button onClick={() => setActiveTab('career')} className="hover:text-blue-600 dark:hover:text-blue-400">Career Recommendation</button></li>
              <li><button onClick={() => setActiveTab('skill')} className="hover:text-blue-600 dark:hover:text-blue-400">Skill Gap Analysis</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-blue-600 dark:hover:text-blue-400">Student Dashboard</button></li>
            </ul>
          </div>

          {/* Machine Learning Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">ML Intelligence</h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-400">
              <li>Random Forest Classifier (Status)</li>
              <li>Random Forest Regressor (Salary)</li>
              <li>Dataset: 1,000+ Verified Samples</li>
              <li>Accuracy: ~76-95% R² Precision</li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-400">
              <li><a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">About System</a></li>
              <li><a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Support</a></li>
              <li><a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Placement Intelligence System. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Engineered with ML & React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
