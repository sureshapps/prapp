import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, KeyRound, Coffee, Lock, Unlock, Volume2, ShieldAlert } from "lucide-react";
import { playTactileClick } from "./AudioClick";
import { motion, AnimatePresence } from "motion/react";

interface WidgetsProps {
  onCoffeeBrewed: (cups: number) => void;
  onUnlocked: (unlocked: boolean) => void;
  isUnlocked: boolean;
}

export default function Widgets({ onCoffeeBrewed, onUnlocked, isUnlocked }: WidgetsProps) {
  // --- Music Player State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [trackProgress, setTrackProgress] = useState(25);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Analog Summer Dreams",
    artist: "Procedural Chillwave Synth"
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTrackProgress(p => (p >= 100 ? 0 : p + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // --- Keypad Safe State ---
  const [pin, setPin] = useState("");
  const [pinMessage, setPinMessage] = useState("LOCKED");
  const [isError, setIsError] = useState(false);

  const handleKeyPress = (num: string) => {
    playTactileClick('light');
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setPinMessage(prev => {
        const dots = "*".repeat(pin.length + 1);
        return dots;
      });
      setIsError(false);
    }
  };

  const handleClearPin = () => {
    playTactileClick('heavy');
    setPin("");
    setPinMessage("CLEARED");
    setTimeout(() => setPinMessage("LOCKED"), 800);
    setIsError(false);
  };

  const handleEnterPin = () => {
    if (pin === "1337" || pin === "1234") {
      playTactileClick('success');
      onUnlocked(true);
      setPinMessage("UNLOCKED");
      setPin("");
    } else {
      playTactileClick('heavy');
      setPin("");
      setPinMessage("DENIED");
      setIsError(true);
      setTimeout(() => {
        setPinMessage("LOCKED");
        setIsError(false);
      }, 1500);
    }
  };

  // --- Coffee Meter State ---
  const [coffeeCupsBrewed, setCoffeeCupsBrewed] = useState(0);

  const handleBrewCoffee = () => {
    playTactileClick('success');
    setCoffeeCupsBrewed(prev => prev + 1);
    onCoffeeBrewed(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* 1. NEUMORPHIC AUDIO DECK */}
      <div 
        id="widget-music-player"
        className="bg-slate-100 dark:bg-[#12151c] p-6 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] border border-slate-200/55 dark:border-slate-800/20 flex flex-col justify-between transition-all duration-300"
      >
        <div className="text-center select-none">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">Interactive Widget</span>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-150 font-sans tracking-tight mt-1 transition-colors">Tactile Deck</h4>
        </div>

        {/* Vinyl Recess & Rotating Core */}
        <div className="my-6 flex justify-center py-2 select-none">
          <div className="w-28 h-28 rounded-full bg-slate-100 dark:bg-[#12151c] flex items-center justify-center shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#07080b,inset_-6px_-6px_12px_#1e2531] relative transition-all duration-300">
            {/* Spinning Record Vinyl */}
            <div 
              className={`w-24 h-24 rounded-full bg-slate-800 dark:bg-[#0b0d12] flex items-center justify-center shadow-[3px_3px_6px_#7a8697] dark:shadow-[3px_3px_6px_#030406] relative transition-transform duration-10000 linear
                ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s' }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-slate-700/60 dark:border-slate-800/40" />
              <div className="absolute inset-4 rounded-full border border-slate-700/60 dark:border-slate-800/40" />
              <div className="absolute inset-6 rounded-full border border-slate-700 dark:border-slate-800" />
              {/* Central Neumorphic color cap */}
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#151a23] flex items-center justify-center shadow-[2px_2px_4px_#333,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#030406,-2px_-2px_4px_#1e2531]">
                <Music className={`w-3.5 h-3.5 text-indigo-500 @{isPlaying ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Track Title */}
        <div className="text-center mb-4 select-none">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate transition-colors">{currentTrack.title}</div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{currentTrack.artist}</div>
        </div>

        {/* Track Slider Bar */}
        <div className="px-1 mb-5 select-none">
          <div className="h-2 rounded-full bg-slate-100 dark:bg-[#10131a] shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1a202d] relative overflow-hidden transition-all duration-300">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-indigo-500 dark:bg-indigo-400 rounded-full transition-all duration-300"
              style={{ width: `${trackProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-550 font-mono mt-1">
            <span>0:{trackProgress < 10 ? `0${trackProgress}` : trackProgress}</span>
            <span>1:40</span>
          </div>
        </div>

        {/* Deck Buttons */}
        <div className="flex justify-center items-center gap-4 select-none">
          <button
            id="audio-prev-btn"
            onClick={() => {
              playTactileClick('light');
              setTrackProgress(0);
            }}
            className="p-3 rounded-full bg-slate-100 dark:bg-[#151a23] text-slate-500 dark:text-slate-450 shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] hover:text-slate-700 dark:hover:text-slate-200 active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            id="audio-play-toggle"
            onClick={() => {
              playTactileClick('heavy');
              setIsPlaying(!isPlaying);
            }}
            className={`p-4.5 rounded-full bg-slate-100 dark:bg-[#151a23] text-indigo-600 dark:text-indigo-450 transition-all duration-300
              ${isPlaying 
                ? "shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#07080b,inset_-4px_-4px_8px_#1e2531] text-indigo-500" 
                : "shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#07080b,-5px_-5px_10px_#1e2531] hover:text-indigo-700"
              }`}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button
            id="audio-next-btn"
            onClick={() => {
              playTactileClick('light');
              setTrackProgress(0);
              const isFirst = currentTrack.title === "Analog Summer Dreams";
              setCurrentTrack({
                title: isFirst ? "Neumorphic Coffee Synth" : "Analog Summer Dreams",
                artist: isFirst ? "Lo-Fi Tactile Beats" : "Procedural Chillwave Synth"
              });
            }}
            className="p-3 rounded-full bg-slate-100 dark:bg-[#151a23] text-slate-500 dark:text-slate-450 shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] hover:text-slate-700 dark:hover:text-slate-200 active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. ADMIN SECURE VAULT KEYPAD */}
      <div 
        id="widget-safe-keypad"
        className="bg-slate-100 dark:bg-[#12151c] p-6 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] border border-slate-200/55 dark:border-slate-800/20 flex flex-col justify-between transition-all duration-300"
      >
        <div className="text-center select-none">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">Inbox Decryptor</span>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-150 font-sans tracking-tight mt-1 transition-colors">Confidential Safe</h4>
        </div>

        {/* LED Screen */}
        <div className="my-4 select-none">
          <div className="p-3 bg-slate-920 dark:bg-[#08090d] rounded-2xl shadow-[inset_4px_4px_8px_#000000,inset_-2px_-2px_4px_#444444] text-center border border-slate-800 dark:border-slate-900">
            <span 
              className={`font-mono text-[14px] tracking-widest font-bold
                ${isUnlocked 
                  ? "text-emerald-400 animate-pulse" 
                  : isError 
                    ? "text-rose-500 animate-pulse" 
                    : pin.length > 0 
                      ? "text-indigo-400" 
                      : "text-amber-500"
                }`}
            >
              {isUnlocked ? "DECRYPTED" : pinMessage}
            </span>
            <div className="text-[8px] text-slate-500 dark:text-slate-400 font-mono mt-1">PIN: 1337 TO VIEW SUBMITTED MESSAGES</div>
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-2 select-none">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              id={`keypad-${num}`}
              disabled={isUnlocked}
              onClick={() => handleKeyPress(num)}
              className="py-1 px-3 text-xs font-bold text-slate-600 dark:text-slate-350 bg-slate-100 dark:bg-[#151a23] rounded-xl shadow-[2.5px_2.5px_5px_#b8b9be,-2.5px_-2.5px_5px_#ffffff] dark:shadow-[2.5px_2.5px_5px_#07080b,-2.5px_-2.5px_5px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all disabled:opacity-40"
            >
              {num}
            </button>
          ))}
          <button
            id="keypad-clear"
            disabled={isUnlocked}
            onClick={handleClearPin}
            className="py-1 px-3 text-[10px] font-bold text-rose-500 bg-slate-100 dark:bg-[#151a23] rounded-xl shadow-[2.5px_2.5px_5px_#b8b9be,-2.5px_-2.5px_5px_#ffffff] dark:shadow-[2.5px_2.5px_5px_#07080b,-2.5px_-2.5px_5px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all disabled:opacity-40"
          >
            CLR
          </button>
          <button
            id="keypad-0"
            disabled={isUnlocked}
            onClick={() => handleKeyPress("0")}
            className="py-1 px-3 text-xs font-bold text-slate-600 dark:text-slate-350 bg-slate-100 dark:bg-[#151a23] rounded-xl shadow-[2.5px_2.5px_5px_#b8b9be,-2.5px_-2.5px_5px_#ffffff] dark:shadow-[2.5px_2.5px_5px_#07080b,-2.5px_-2.5px_5px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all disabled:opacity-40"
          >
            0
          </button>
          <button
            id="keypad-enter"
            disabled={isUnlocked}
            onClick={handleEnterPin}
            className="py-1 px-3 text-[10px] font-bold text-indigo-500 bg-slate-100 dark:bg-[#151a23] rounded-xl shadow-[2.5px_2.5px_5px_#b8b9be,-2.5px_-2.5px_5px_#ffffff] dark:shadow-[2.5px_2.5px_5px_#07080b,-2.5px_-2.5px_5px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all disabled:opacity-40"
          >
            ENT
          </button>
        </div>

        {/* Lock State Indicators */}
        <div className="text-center mt-2 flex justify-center items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 select-none">
          {isUnlocked ? (
            <>
              <Unlock className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-sans text-[10px]">Confidential Inbox is Unlocked</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-sans text-[10px]">Secure AES Recess Active</span>
            </>
          )}
        </div>
      </div>

      {/* 3. COFFEE ENGINE FUEL FOR DEVELOPER */}
      <div 
        id="widget-coffee-engine"
        className="bg-slate-100 dark:bg-[#12151c] p-6 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] border border-slate-200/55 dark:border-slate-800/20 flex flex-col justify-between transition-all duration-300"
      >
        <div className="text-center select-none">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">Coding Fuel</span>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-150 font-sans tracking-tight mt-1 transition-colors">Coffee Reactor</h4>
        </div>

        {/* Steamer Dome */}
        <div className="my-4 flex justify-center select-none">
          <div className="relative">
            {/* Ambient hot coffee lights */}
            <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-[#151a23] flex flex-col items-center justify-center shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] transition-all duration-300 relative overflow-hidden">
              <Coffee className="w-8 h-8 text-amber-700 dark:text-amber-500 hover:scale-110 transition-transform duration-300 fill-amber-700 dark:fill-amber-500" />
              
              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                {coffeeCupsBrewed === 0 ? "COFFEE DRY" : `STABILIZED`}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono font-bold mt-0.5">
                +{coffeeCupsBrewed * 12} lines / hr
              </div>
            </div>

            {/* Rising Steam bubbles procedurally using CSS */}
            {isPlaying && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 justify-center">
                <span className="w-1 h-2 bg-slate-400/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-3 bg-slate-400/30 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <span className="w-1 h-2 bg-slate-400/40 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 select-none">
          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-relaxed font-sans px-2 transition-colors">
            Brew virtual coffee cups for Alex. Each cup increases system throughput, expanding workspace output calculations!
          </p>

          <button
            id="brew-coffee-btn"
            onClick={handleBrewCoffee}
            className="w-full py-3.5 bg-slate-100 dark:bg-[#151a23] font-medium text-xs text-amber-800 dark:text-amber-400 hover:text-amber-900 rounded-2xl shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#07080b,-5px_-5px_10px_#1e2531] hover:shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#07080b,-2px_-2px_5px_#1e2531] active:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:active:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
          >
            <Coffee className="w-3.5 h-3.5 fill-current" />
            <span>Brew 1 Soft Espresso</span>
          </button>
        </div>
      </div>

    </div>
  );
}
