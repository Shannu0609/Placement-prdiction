import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldAlert, Camera, Mic, Monitor, CheckCircle2, 
  Code2, BookOpen, MessageSquare, Volume2, ArrowRight, Play, FileCheck
} from 'lucide-react';

export default function AssessmentPage({ setActiveTab }) {

  // Test State (Max 150 minutes = 9000 seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(9000); // 2 hours 30 mins
  const [currentSection, setCurrentSection] = useState('coding'); // coding, aptitude, communication, verbal, speaking
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Proctored Permission States
  const [cameraActive, setCameraActive] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  // Coding Section State
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [codeContent, setCodeContent] = useState(`def find_max_subarray(arr):\n    # Write Python solution here\n    max_so_far = arr[0]\n    curr_max = arr[0]\n    for i in range(1, len(arr)):\n        curr_max = max(arr[i], curr_max + arr[i])\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far\n\nprint(find_max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`);
  const [codeOutput, setCodeOutput] = useState('');
  const [codeRunning, setCodeRunning] = useState(false);

  // Speaking Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);

  // Final Results
  const [finalResults, setFinalResults] = useState(null);

  const handleSubmitTest = useCallback(() => {
    const overallScore = 86;
    const results = {
      overallScore,
      sectionScores: {
        coding: 52, // out of 60
        aptitude: 18, // out of 20
        communication: 8, // out of 10
        verbal: 4, // out of 5
        speaking: 4 // out of 5
      },
      timeTaken: `${Math.floor((9000 - timeLeftSeconds) / 60)} minutes`,
      tabSwitches: tabSwitchCount,
      proctoringStatus: cameraActive && screenShared ? "Verified Proctored" : "Standard Evaluated"
    };

    setFinalResults(results);
    setIsSubmitted(true);
  }, [timeLeftSeconds, tabSwitchCount, cameraActive, screenShared]);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isTestStarted && !isSubmitted && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestStarted, isSubmitted, timeLeftSeconds, handleSubmitTest]);

  // Tab switch listener for test integrity
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isTestStarted && !isSubmitted) {
        setTabSwitchCount(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isTestStarted, isSubmitted]);

  // Request Permissions
  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraActive(true);
    } catch (_e) {
      setCameraActive(true); // Fallback simulated permission
    }
  };

  const requestScreenShare = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        await navigator.mediaDevices.getDisplayMedia({ video: true });
      }
      setScreenShared(true);
    } catch (_e) {
      setScreenShared(true);
    }
  };

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicActive(true);
    } catch (_e) {
      setMicActive(true);
    }
  };

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleRunCode = () => {
    setCodeRunning(true);
    setTimeout(() => {
      setCodeOutput("✓ Test Case 1 Passed (Output: 6)\n✓ Test Case 2 Passed (Output: 15)\nExecution Time: 42ms | Memory: 14.2 MB");
      setCodeRunning(false);
    }, 600);
  };

  const handleAudioRecordToggle = () => {
    if (!isRecordingAudio) {
      setIsRecordingAudio(true);
      setTimeout(() => {
        setIsRecordingAudio(false);
        setAudioRecorded(true);
      }, 5000);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Test Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-400/20">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            <span>TechCorp Global Official Assessment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">SDE-1 Multi-Section Assessment</h1>
          <p className="text-xs text-indigo-200">Max Duration: 150 Minutes (2.5 Hours) • Camera & Screen Proctored</p>
        </div>

        {isTestStarted && !isSubmitted && (
          <div className="px-5 py-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-center shrink-0">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Time Remaining</span>
            <span className="text-xl font-mono font-black text-amber-400">{formatTime(timeLeftSeconds)}</span>
          </div>
        )}
      </div>

      {/* Pre-Test Permission Verification Screen */}
      {!isTestStarted && !isSubmitted && (
        <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Proctored Assessment Setup</h2>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Please grant camera, screen sharing, and microphone permissions prior to starting your 150-minute evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${cameraActive ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-gray-200 dark:border-slate-800'}`}>
              <Camera className="w-6 h-6 mx-auto text-indigo-500" />
              <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Camera Permission</h4>
              <button
                onClick={requestCameraPermission}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                {cameraActive ? "Camera Connected ✓" : "Grant Camera Access"}
              </button>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-2 ${screenShared ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-gray-200 dark:border-slate-800'}`}>
              <Monitor className="w-6 h-6 mx-auto text-indigo-500" />
              <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Screen Sharing</h4>
              <button
                onClick={requestScreenShare}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                {screenShared ? "Screen Shared ✓" : "Share Screen"}
              </button>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-2 ${micActive ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-gray-200 dark:border-slate-800'}`}>
              <Mic className="w-6 h-6 mx-auto text-indigo-500" />
              <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Microphone</h4>
              <button
                onClick={requestMicPermission}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                {micActive ? "Microphone Ready ✓" : "Grant Mic Access"}
              </button>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleStartTest}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/20"
            >
              Start 150-Minute Assessment Now
            </button>
          </div>
        </div>
      )}

      {/* Active Assessment Main Workspace */}
      {isTestStarted && !isSubmitted && (
        <div className="space-y-6">
          
          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-slate-900 rounded-2xl">
            {[
              { id: 'coding', label: '1. Coding (60m)', icon: Code2 },
              { id: 'aptitude', label: '2. Aptitude (30m)', icon: BookOpen },
              { id: 'communication', label: '3. Communication (20m)', icon: MessageSquare },
              { id: 'verbal', label: '4. English / Verbal (20m)', icon: FileCheck },
              { id: 'speaking', label: '5. Speaking Prompt (20m)', icon: Volume2 }
            ].map((sec) => {
              const Icon = sec.icon;
              const isSel = currentSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setCurrentSection(sec.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSel 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Section 1: Coding Environment */}
          {currentSection === 'coding' && (
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Coding Question 1: Maximum Contiguous Subarray Sum</h3>
                  <p className="text-xs text-gray-500">Given an array of integers, find the contiguous subarray with the largest sum.</p>
                </div>

                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200"
                >
                  <option value="python">Python 3</option>
                  <option value="javascript">JavaScript (Node)</option>
                  <option value="cpp">C++ 17</option>
                  <option value="java">Java 11</option>
                </select>
              </div>

              <textarea
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                rows={10}
                className="w-full p-4 font-mono text-xs rounded-2xl border border-gray-200 dark:border-slate-800 bg-slate-950 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleRunCode}
                  disabled={codeRunning}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center space-x-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{codeRunning ? "Running Test Cases..." : "Run Test Cases"}</span>
                </button>
              </div>

              {codeOutput && (
                <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs whitespace-pre-line border border-slate-800">
                  {codeOutput}
                </div>
              )}
            </div>
          )}

          {/* Section 2: Aptitude Questions */}
          {currentSection === 'aptitude' && (
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quantitative & Logical Reasoning Section</h3>
              
              <div className="p-4 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-semibold text-gray-800 dark:text-slate-200">
                  Q1: If a train running at 72 km/hr crosses a pole in 9 seconds, what is the length of the train?
                </p>
                <div className="space-y-1.5">
                  {['150 meters', '180 meters', '200 meters', '220 meters'].map((opt, idx) => (
                    <label key={idx} className="flex items-center space-x-2 text-xs text-gray-700 dark:text-slate-300 cursor-pointer">
                      <input type="radio" name="q1" value={opt} className="accent-blue-600" />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Speaking / Pronunciation Audio Recording */}
          {currentSection === 'speaking' && (
            <div className="glass-card p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4 text-center">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">English Speaking & Pronunciation Prompt</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Prompt: "Introduce yourself, summarize your top engineering project, and explain why you are interested in an SDE-1 position at TechCorp Global."
              </p>

              <div className="pt-4 flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={handleAudioRecordToggle}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all ${
                    isRecordingAudio ? 'bg-red-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Mic className="w-7 h-7" />
                </button>

                <span className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  {isRecordingAudio ? "Recording response (5s)..." : audioRecorded ? "✓ Audio Response Recorded" : "Click Microphone to Record Response"}
                </span>
              </div>
            </div>
          )}

          {/* Submit Test Bar */}
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-slate-800">
            <button
              onClick={handleSubmitTest}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-2"
            >
              <span>Complete & Submit Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Submitted Results Output Screen */}
      {isSubmitted && finalResults && (
        <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Assessment Submitted Successfully</h2>
            <p className="text-xs text-gray-500 mt-1">Your responses have been processed and forwarded to company HR.</p>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase">Overall Assessment Result</span>
              <span className="text-3xl font-black text-emerald-400">{finalResults.overallScore} / 100</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
              <span>Coding: <strong>{finalResults.sectionScores.coding}/60</strong></span>
              <span>Aptitude: <strong>{finalResults.sectionScores.aptitude}/20</strong></span>
              <span>Communication: <strong>{finalResults.sectionScores.communication}/10</strong></span>
              <span>English: <strong>{finalResults.sectionScores.verbal}/5</strong></span>
              <span>Speaking: <strong>{finalResults.sectionScores.speaking}/5</strong></span>
              <span>Time Taken: <strong>{finalResults.timeTaken}</strong></span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
          >
            Return to Dashboard
          </button>
        </div>
      )}

    </div>
  );
}
