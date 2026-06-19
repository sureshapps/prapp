import React from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, Sun, Moon, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { playTactileClick, toggleTactileSound, isSoundEnabled } from "./AudioClick";
import { DEVELOPER_PROFILE } from "../types";
import splashHero from "../assets/images/splash_hero_image_1781892991269.jpg";

interface SplashProps {
  onGetStarted: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
  soundOn: boolean;
  onSoundToggle: () => void;
}

export default function Splash({ 
  onGetStarted, 
  darkMode, 
  onThemeToggle,
  soundOn,
  onSoundToggle
}: SplashProps) {

  const handleStart = () => {
    playTactileClick("success");
    setTimeout(() => {
      onGetStarted();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] dark:bg-[#12151c] text-slate-705 dark:text-slate-300 flex flex-col justify-between p-6 md:p-12 select-none relative overflow-hidden transition-colors duration-300">
      
      {/* 1. TOP UTILITY HEADER */}
      <div className="w-full flex justify-between items-center max-w-6xl mx-auto z-10">
        <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1.5 opacity-70">
          <Terminal className="w-3.5 h-3.5 text-indigo-500" />
          <span>UX_ARCHITECT_GATEWAY_V1.1_SECURE</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio toggle */}
          <button
            onClick={() => {
              onSoundToggle();
            }}
            title={soundOn ? "Switch sound OFF" : "Switch sound ON"}
            className={`px-3 py-2 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] cursor-pointer transition-all duration-300
              ${soundOn 
                ? "bg-slate-200 dark:bg-[#1c222f] text-slate-800 dark:text-slate-100 shadow-[inset_1.5px_1.5px_3px_#b8b9be,inset_-1.5px_-1.5px_3px_#ffffff] dark:shadow-[inset_1.5px_1.5px_3px_#07080b,inset_-1.5px_-1.5px_3px_#1e2531]" 
                : "bg-slate-100 dark:bg-[#151923] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-indigo-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="text-[10px] font-mono select-none hidden sm:inline">{soundOn ? "SOUND ON" : "MUTED"}</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={onThemeToggle}
            title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            className={`px-3 py-2 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] cursor-pointer transition-all duration-300
              ${darkMode 
                ? "bg-[#1c222f] text-amber-400 shadow-[inset_1.5px_1.5px_3px_#07080b,inset_-1.5px_-1.5px_3px_#1e2531]" 
                : "bg-slate-100 text-slate-600 shadow-[1.5px_1.5px_3px_#b8b9be,-1.5px_-1.5px_3px_#ffffff]"
              }`}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            <span className="text-[10px] font-mono select-none hidden sm:inline">{darkMode ? "DARK-MODE" : "LIGHT-MODE"}</span>
          </button>
        </div>
      </div>

      {/* 2. CORE DECK VIEWPORT */}
      <div className="max-w-6xl w-full mx-auto my-auto py-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Artwork Canvas (6 cols) */}
          <motion.div 
            className="lg:col-span-6 flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-full max-w-md lg:max-w-full bg-[#e0e5ec] dark:bg-[#12151c] rounded-[40px] p-6 shadow-[16px_16px_32px_#a3b1c6,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#07080b,-16px_-16px_32px_#1e2531] border border-slate-200/50 dark:border-slate-800/10 transition-all duration-300 hover:scale-[1.01]">
              <div className="rounded-[28px] bg-slate-100 dark:bg-[#181d28] p-3 shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#07080b,inset_-4px_-4px_8px_#1e2531] overflow-hidden relative transition-all duration-300">
                <img 
                  src={splashHero} 
                  alt="Creative workspace neomorphic visual" 
                  className="w-full h-auto rounded-[20px] shadow-sm brightness-95 dark:brightness-90 object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Neumorphic brand tag overlay */}
                <div className="absolute bottom-6 right-6 bg-[#e0e5ec] dark:bg-[#151923] py-2 px-3.5 rounded-2xl shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] border border-slate-250/20 dark:border-slate-800/30 flex items-center gap-1.5 text-[9px] font-mono text-indigo-500 font-bold tracking-wider select-none">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  <span>GEMINI PIXEL ARTWORK</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Typography Card (6 cols) */}
          <motion.div 
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <div className="space-y-4">
              <span className="text-xs font-bold font-mono text-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest inline-block shadow-[inset_1.5px_1.5px_3px_rgba(79,70,229,0.1)]">
                Interactive Showroom V1.1
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-850 dark:text-slate-100 tracking-tight leading-tight transition-colors duration-300">
                {DEVELOPER_PROFILE.name}
              </h1>
              
              <p className="text-base sm:text-lg font-bold text-slate-600 dark:text-indigo-400 font-sans tracking-tight">
                {DEVELOPER_PROFILE.role}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 select-text transition-colors duration-300">
              Welcome to a fully physical-mode personal dashboard. Bridge the gap between digital interface and material feel with neomorphic dials, modular synthesisers, tactile clicks, and integrated deep Gemini AI reasoning.
            </p>

            {/* Tactile get started action button */}
            <div className="pt-2">
              <button
                id="get-started-button"
                onClick={handleStart}
                className="w-full sm:w-auto px-10 py-5 bg-indigo-500 dark:bg-indigo-600 text-white font-sans font-bold text-sm tracking-wide rounded-[24px] flex items-center justify-center gap-2.5 shadow-[6px_6px_12px_rgba(79,70,229,0.35),-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#07080b,-6px_-6px_12px_rgba(255,255,255,0.02)] hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:shadow-lg hover:scale-[1.01] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-150 cursor-pointer select-none group"
              >
                <span>Get Start</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 duration-200 transition-transform" />
              </button>
            </div>

            {/* Status grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div className="bg-slate-100 dark:bg-[#151a23] p-3 rounded-2xl shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] text-center transition-all duration-300">
                <span className="text-[17px] font-mono font-black text-slate-800 dark:text-slate-200">{DEVELOPER_PROFILE.experienceYears}+</span>
                <span className="text-[8px] font-mono text-slate-400 dark:text-slate-550 block uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="bg-slate-100 dark:bg-[#151a23] p-3 rounded-2xl shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] text-center transition-all duration-300">
                <span className="text-[17px] font-mono font-black text-slate-800 dark:text-slate-200">{DEVELOPER_PROFILE.projectsCompleted}+</span>
                <span className="text-[8px] font-mono text-slate-400 dark:text-slate-550 block uppercase tracking-wider">Shipped</span>
              </div>
              <div className="bg-slate-100 dark:bg-[#151a23] p-3 rounded-2xl shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] text-center transition-all duration-300">
                <span className="text-[17px] font-mono font-black text-slate-850 dark:text-indigo-400 opacity-90">100%</span>
                <span className="text-[8px] font-mono text-slate-400 dark:text-slate-550 block uppercase tracking-wider">Tactile UI</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* 3. DIAGNOSTICS FOOTER */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-slate-250/30 dark:border-slate-800/20 z-10 text-center md:text-left">
        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-550 uppercase tracking-widest">
          SYSTEM_DEPLOYMENT_ACTIVE_PORT_3000
        </span>
        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-550">
          Alex Mercer Neumorphic Portfolio // Built with React 19, Tailwind CSS v4 & Gemini AI
        </span>
      </div>

    </div>
  );
}
