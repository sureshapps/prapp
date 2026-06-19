import React, { useState } from "react";
import { DEVELOPER_PROFILE, Skill } from "../types";
import { playTactileClick } from "./AudioClick";
import { Code2, Server, Database, Palette, Sparkles, Settings2, BarChart3, Star } from "lucide-react";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(DEVELOPER_PROFILE.skills);

  // Return corresponding icon name
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Settings2': return <Settings2 className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      default: return <Star className={className} />;
    }
  };

  const handleLevelChange = (index: number, newLevel: number) => {
    playTactileClick('slide');
    setSkills(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], level: newLevel };
      return updated;
    });
  };

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category))) as Skill['category'][];

  return (
    <div className="space-y-8 select-none">
      <div className="text-center">
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans max-w-lg mx-auto leading-relaxed transition-colors duration-300">
          Interactive calibrators: Drag the physical knobs to recalibrate Alex's expert competencies. Tactile sound synthesis is active on slider movement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const catSkills = skills.reduce<({ skill: Skill; originalIndex: number })[]>((acc, s, index) => {
            if (s.category === cat) {
              acc.push({ skill: s, originalIndex: index });
            }
            return acc;
          }, []);

          return (
            <div
              key={cat}
              className="bg-slate-100 dark:bg-[#12151c] p-6 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] border border-slate-200/50 dark:border-slate-800/20 flex flex-col justify-between transition-all duration-300"
            >
              {/* Category Title Header */}
              <div className="flex justify-between items-center mb-6 pl-1 select-none">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-sans uppercase tracking-wider transition-colors duration-300">
                  {cat === 'Frontend' ? "Client Systems" : cat === 'Backend' ? "Engine & Storage" : cat === 'Languages' ? "Foundations" : "Modular Ecosystem"}
                </h4>
                <span className="text-[9px] font-mono text-indigo-400 bg-slate-100 dark:bg-[#151a23] px-2 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] transition-colors duration-300">
                  {catSkills.length} SKILLS
                </span>
              </div>

              {/* Slider gauges list */}
              <div className="space-y-5">
                {catSkills.map(({ skill, originalIndex }) => (
                  <div key={skill.name} className="space-y-2">
                    {/* Gauge label */}
                    <div className="flex justify-between items-center text-xs select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#151a23] flex items-center justify-center shadow-[2px_2px_4px_#b8b9be,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] border border-slate-200/30 dark:border-slate-800/15 transition-all duration-300">
                          {getIcon(skill.icon, "w-3 h-3 text-slate-600 dark:text-slate-400")}
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200 font-sans tracking-tight transition-colors duration-300">{skill.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-305 font-bold bg-slate-100 dark:bg-[#151a23] shadow-[inset_1px_1px_3px_#b8b9be,inset_-1px_-1px_3px_#ffffff] dark:shadow-[inset_1px_1px_3px_#07080b,inset_-1px_-1px_3px_#1e2531] px-2 py-0.5 rounded-full transition-all duration-300">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Mechanical slider track & handle */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-[#101319] shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1e2531] relative flex items-center transition-colors duration-300">
                        <input
                          id={`skill-slider-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleLevelChange(originalIndex, parseInt(e.target.value))}
                          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {/* Shimmer physical bar fill */}
                        <div
                          className="h-full rounded-full bg-indigo-500/80 transition-all duration-75 shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                          style={{ width: `${skill.level}%` }}
                        />
                        {/* Soft protruding handle marker */}
                        <div
                          className="absolute w-5 h-5 rounded-full bg-slate-100 dark:bg-[#1c222f] border border-slate-200/80 dark:border-slate-800/30 -ml-2.5 shadow-[2px_2px_4px_#a3b1c6,-1px_-1px_2px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-1px_-1px_2px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all flex items-center justify-center cursor-ew-resize pointer-events-none"
                          style={{ left: `${skill.level}%` }}
                        >
                          <div className="w-1 h-2 bg-slate-400 dark:bg-slate-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
