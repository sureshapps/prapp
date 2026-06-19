import React, { useState, useEffect } from "react";
import { 
  DEVELOPER_PROFILE, 
  PROJECTS_DATA 
} from "./types";
import { 
  playTactileClick, 
  toggleTactileSound, 
  isSoundEnabled 
} from "./components/AudioClick";
import AIAssistant from "./components/AIAssistant";
import Widgets from "./components/Widgets";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Inbox from "./components/Inbox";
import Splash from "./components/Splash";
import { 
  User, 
  Briefcase, 
  Code, 
  Sparkles, 
  Coffee, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Database,
  Terminal,
  Laptop,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Splash page visibility state
  const [showSplash, setShowSplash] = useState(true);

  // Sound toggle state
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  // Theme state: default to localStorage preference or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("portfolio_dark_theme");
    if (saved !== null) {
      return saved === "true";
    }
    return document.documentElement.classList.contains("dark");
  });

  // Sync theme class with body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio_dark_theme", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio_dark_theme", "false");
    }
  }, [darkMode]);

  // Tabs: 'projects' | 'skills' | 'widgets' | 'recruit'
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'widgets' | 'recruit'>('projects');
  
  // Custom interactive stats
  const [coffeeBrewed, setCoffeeBrewed] = useState(DEVELOPER_PROFILE.coffeeCups);
  const [inboxUpdateCounter, setInboxUpdateCounter] = useState(0);
  const [inboxUnlocked, setInboxUnlocked] = useState(false);

  const handleSoundToggle = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    toggleTactileSound(newState);
    setTimeout(() => {
      playTactileClick('success');
    }, 50);
  };

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    setTimeout(() => {
      playTactileClick('heavy');
    }, 50);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    playTactileClick('heavy');
    setActiveTab(tab);
  };

  const incrementCoffee = (cups: number) => {
    setCoffeeBrewed(prev => prev + cups);
  };

  const handleMessageAdded = () => {
    setInboxUpdateCounter(prev => prev + 1);
  };

  if (showSplash) {
    return (
      <Splash 
        onGetStarted={() => setShowSplash(false)}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
        soundOn={soundOn}
        onSoundToggle={handleSoundToggle}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#e0e5ec] dark:bg-[#12151c] text-slate-700 dark:text-slate-300 py-6 px-4 sm:px-6 md:py-12 select-none relative overflow-x-hidden pb-24 transition-colors duration-300">
      {/* Decorative mechanical corner accents (Humorous hardware vibe) */}
      <div className="absolute top-4 left-4 text-[9px] font-mono text-slate-400 dark:text-slate-500 select-none flex items-center gap-1.5 opacity-60">
        <Laptop className="w-3.5 h-3.5" />
        <span>UX_ARCHITECT_PORTFOLIO_V1.1_STABLE</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
        {/* Tactile Audio Synthesis Switch */}
        <button
          id="global-audio-toggle"
          onClick={handleSoundToggle}
          title={soundOn ? "Switch physical sound effects off" : "Switch physical sound effects on"}
          className={`px-3 py-2 text-xs font-semibold rounded-full duration-300 flex items-center gap-1.5 shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] cursor-pointer transition-all
            ${soundOn 
              ? "bg-slate-200 dark:bg-[#1c222f] text-slate-800 dark:text-slate-100 shadow-[inset_1.5px_1.5px_3px_#b8b9be,inset_-1.5px_-1.5px_3px_#ffffff] dark:shadow-[inset_1.5px_1.5px_3px_#07080b,inset_-1.5px_-1.5px_3px_#1e2531]" 
              : "bg-slate-100 dark:bg-[#151923] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5 text-indigo-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          <span className="text-[10px] font-mono select-none hidden sm:inline">TACTILE AUDIO: {soundOn ? "ON" : "OFF"}</span>
        </button>

        {/* Dynamic Dark Mode Toggle */}
        <button
          id="global-theme-toggle"
          onClick={handleThemeToggle}
          title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          className={`px-3 py-2 text-xs font-semibold rounded-full duration-300 flex items-center gap-1.5 shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] cursor-pointer transition-all
            ${darkMode 
              ? "bg-[#1c222f] text-amber-400 shadow-[inset_1.5px_1.5px_3px_#07080b,inset_-1.5px_-1.5px_3px_#1e2531]" 
              : "bg-slate-100 text-slate-600 shadow-[1.5px_1.5px_3px_#b8b9be,-1.5px_-1.5px_3px_#ffffff]"
            }`}
        >
          {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
          <span className="text-[10px] font-mono select-none hidden sm:inline">THEME: {darkMode ? "DARK" : "LIGHT"}</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-10">
        
        {/* 1. TACTILE HEADER & PROFILE HERO BENTO BOX */}
        <div id="hero-bento-deck" className="bg-[#e0e5ec] dark:bg-[#12151c] rounded-3xl p-6 md:p-8 shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#07080b,-12px_-12px_24px_#1e2531] border border-slate-200/50 dark:border-slate-800/20 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            
            {/* Column A: Neumorphic Portrait Plate */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-[#e0e5ec] dark:bg-[#12151c] flex items-center justify-center shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#07080b,inset_-6px_-6px_12px_#1e2531] relative overflow-hidden select-none transition-all duration-300">
                {/* Profile placeholder graphic representing UX Architect */}
                <div className="w-34 h-34 rounded-full bg-slate-100 dark:bg-[#181d28] flex items-center justify-center shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] relative overflow-hidden transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-indigo-50/20 dark:from-indigo-950/20 dark:to-indigo-900/5" />
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
                    alt={DEVELOPER_PROFILE.name}
                    className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 duration-500 transition-all select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="mt-4 text-center leading-none select-none">
                <span className="text-[10px] text-emerald-500 font-mono font-bold animate-pulse flex items-center justify-center gap-1">
                  ● ACTIVE FOR CONTRACTS
                </span>
              </div>
            </div>

            {/* Column B: Primary Bio (Convex text plate) */}
            <div className="lg:col-span-2 text-center lg:text-left space-y-3">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-sans leading-none transition-colors duration-300">{DEVELOPER_PROFILE.name}</h1>
                <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-450 font-sans tracking-tight mt-1">{DEVELOPER_PROFILE.role}</p>
              </div>
              
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start items-center text-xs text-slate-500 select-none">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#151923] shadow-[inset_1.5px_1.5px_3px_#b8b9be] dark:shadow-[inset_1.5px_1.5px_3px_#07080b] px-2.5 py-1 rounded-full text-slate-500 dark:text-slate-400 transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span className="font-sans text-[10px] font-semibold">{DEVELOPER_PROFILE.location}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#151923] shadow-[inset_1.5px_1.5px_3px_#b8b9be] dark:shadow-[inset_1.5px_1.5px_3px_#07080b] px-2.5 py-1 rounded-full text-slate-500 dark:text-slate-400 transition-all duration-300">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-sans text-[10px] font-semibold">{DEVELOPER_PROFILE.experienceYears} Years Exp</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed max-w-xl font-sans select-text transition-colors duration-300">
                {DEVELOPER_PROFILE.bio}
              </p>
            </div>

            {/* Column C: Dynamic physical meters dashboard */}
            <div className="lg:col-span-1 grid grid-cols-2 gap-4">
              
              {/* Stat Card 1: Projects */}
              <div className="bg-slate-100 dark:bg-[#151a23] p-4 rounded-2xl shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531] text-center select-none transition-all duration-300">
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 block uppercase">Releasables</span>
                <span className="text-xl font-black text-slate-850 dark:text-slate-150 block font-mono mt-1 transition-colors duration-300">
                  {DEVELOPER_PROFILE.projectsCompleted}+
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans block leading-none mt-1">Shipped</span>
              </div>

              {/* Stat Card 2: Interactive Coffee Reactor log (updates when Brewing coffee in playground!) */}
              <div className="bg-slate-100 dark:bg-[#151a23] p-4 rounded-2xl shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531] text-center select-none transition-all duration-300">
                <div className="flex items-center justify-center gap-1">
                  <Coffee className="w-3 h-3 text-amber-700 dark:text-amber-500 animate-pulse fill-amber-700 dark:fill-amber-500" />
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase">Reactor</span>
                </div>
                <span className="text-xl font-black text-amber-900 dark:text-amber-300 block font-mono mt-1 transition-colors duration-300">
                  {coffeeBrewed}
                </span>
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-sans block leading-none mt-1 font-semibold">Espressos</span>
              </div>

            </div>

          </div>
        </div>

        {/* 2. DOCK NAVIGATION CONTROL TABS */}
        <div id="deck-tabs-navigator" className="bg-[#e0e5ec] dark:bg-[#12151c] p-3 rounded-full shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#07080b,inset_-6px_-6px_12px_#1e2531] border border-slate-200/50 dark:border-slate-800/20 select-none transition-all duration-300">
          <div className="grid grid-cols-4 gap-2 text-center">
            
            <button
              id="tab-projects"
              onClick={() => handleTabChange('projects')}
              className={`py-3 text-[10px] sm:text-xs font-bold font-sans rounded-full flex flex-col sm:flex-row items-center justify-center gap-1.5 duration-300 transition-all cursor-pointer
                ${activeTab === 'projects'
                  ? "bg-slate-200 dark:bg-[#1c222f] text-indigo-600 dark:text-indigo-400 shadow-[inset_3.5px_3.5px_7px_#b8b9be,inset_-3.5px_-3.5px_7px_#ffffff] dark:shadow-[inset_3.5px_3.5px_7px_#07080b,inset_-3.5px_-3.5px_7px_#1e2531]"
                  : "bg-slate-100 dark:bg-[#151a23] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Projects Grid</span>
            </button>

            <button
              id="tab-skills"
              onClick={() => handleTabChange('skills')}
              className={`py-3 text-[10px] sm:text-xs font-bold font-sans rounded-full flex flex-col sm:flex-row items-center justify-center gap-1.5 duration-300 transition-all cursor-pointer
                ${activeTab === 'skills'
                  ? "bg-slate-200 dark:bg-[#1c222f] text-indigo-600 dark:text-indigo-400 shadow-[inset_3.5px_3.5px_7px_#b8b9be,inset_-3.5px_-3.5px_7px_#ffffff] dark:shadow-[inset_3.5px_3.5px_7px_#07080b,inset_-3.5px_-3.5px_7px_#1e2531]"
                  : "bg-slate-100 dark:bg-[#151a23] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Skills Calibration</span>
            </button>

            <button
              id="tab-widgets"
              onClick={() => handleTabChange('widgets')}
              className={`py-3 text-[10px] sm:text-xs font-bold font-sans rounded-full flex flex-col sm:flex-row items-center justify-center gap-1.5 duration-300 transition-all cursor-pointer
                ${activeTab === 'widgets'
                  ? "bg-slate-200 dark:bg-[#1c222f] text-indigo-600 dark:text-indigo-400 shadow-[inset_3.5px_3.5px_7px_#b8b9be,inset_-3.5px_-3.5px_7px_#ffffff] dark:shadow-[inset_3.5px_3.5px_7px_#07080b,inset_-3.5px_-3.5px_7px_#1e2531]"
                  : "bg-slate-100 dark:bg-[#151a23] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Playground Widgets</span>
            </button>

            <button
              id="tab-recruit"
              onClick={() => handleTabChange('recruit')}
              className={`py-3 text-[10px] sm:text-xs font-bold font-sans rounded-full flex flex-col sm:flex-row items-center justify-center gap-1.5 duration-300 transition-all cursor-pointer
                ${activeTab === 'recruit'
                  ? "bg-slate-200 dark:bg-[#1c222f] text-indigo-600 dark:text-indigo-400 shadow-[inset_3.5px_3.5px_7px_#b8b9be,inset_-3.5px_-3.5px_7px_#ffffff] dark:shadow-[inset_3.5px_3.5px_7px_#07080b,inset_-3.5px_-3.5px_7px_#1e2531]"
                  : "bg-slate-100 dark:bg-[#151a23] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Synthesizer</span>
            </button>

          </div>
        </div>

        {/* 3. CORE INTERACTIVE DECK AREA */}
        <div id="deck-core-display-board" className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Projects />
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Skills />
              </motion.div>
            )}

            {activeTab === 'widgets' && (
              <motion.div
                key="widgets"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Widgets 
                  onCoffeeBrewed={incrementCoffee} 
                  onUnlocked={setInboxUnlocked}
                  isUnlocked={inboxUnlocked}
                />
              </motion.div>
            )}

            {activeTab === 'recruit' && (
              <motion.div
                key="recruit"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-12"
              >
                <Contact onMessageAdded={handleMessageAdded} />
                
                {/* Embedded Decrypted Message Inbox Board */}
                <Inbox 
                  isUnlocked={inboxUnlocked} 
                  onLock={() => setInboxUnlocked(false)}
                  updateCounter={inboxUpdateCounter}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. PHYSICAL SPECIFICATIONS METADATA FOOTER (Aesthetic pairings) */}
        <div id="terminal-diagnostics-bar" className="bg-[#e0e5ec] dark:bg-[#12151c] p-5 rounded-3xl shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#07080b,inset_-4px_-4px_8px_#1e2531] border border-slate-200/50 dark:border-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-4 select-none transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#151923] flex items-center justify-center shadow-[2px_2px_4px_#b8b9be,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] transition-all duration-300">
              <Terminal className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-450">SYSTEM COGNIZANT STATE: INGRESS GATEWAY ON PORT 3000 // GREEN</span>
          </div>

          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-550 text-center md:text-right">
            Alex Mercer Portfolio // Built with React 19, TypeScript, esbuild & Gemini Co-Pilot
          </p>
        </div>

      </div>

      {/* Floating AI Recruiter Copilot Assistant */}
      <AIAssistant />
    </div>
  );
}
