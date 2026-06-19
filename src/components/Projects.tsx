import React, { useState } from "react";
import { Project, PROJECTS_DATA } from "../types";
import { playTactileClick } from "./AudioClick";
import { ExternalLink, Github, Code, ArrowRight, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Frontend' | 'Fullstack' | 'AI / GenAI' | 'Design'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    "tactile-ui": 142,
    "gemini-recruiter": 98,
    "fluid-charts": 65,
    "ambient-os": 87
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const categories: ('All' | 'Frontend' | 'Fullstack' | 'AI / GenAI' | 'Design')[] = [
    'All', 'Frontend', 'Fullstack', 'AI / GenAI', 'Design'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const handleCategorySelect = (cat: typeof selectedCategory) => {
    playTactileClick('light');
    setSelectedCategory(cat);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening card modal
    playTactileClick('success');
    if (hasLiked[id]) {
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Tabs (Horizontal Pill Belt) */}
      <div className="flex flex-wrap gap-3 justify-center select-none">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-tab-${cat.replace(/\s+/g, '')}`}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full duration-300 transition-all cursor-pointer
              ${selectedCategory === cat
                ? "bg-slate-200 dark:bg-[#1c222f] text-indigo-600 dark:text-indigo-400 shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531]"
                : "bg-slate-100 dark:bg-[#151a23] text-slate-600 dark:text-slate-400 shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            layout
            key={project.id}
            id={`project-card-${project.id}`}
            onClick={() => {
              playTactileClick('heavy');
              setActiveProject(project);
            }}
            className="group bg-slate-100 dark:bg-[#12151c] rounded-3xl p-5 shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] hover:shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff] dark:hover:shadow-[12px_12px_24px_#07080b,-12px_-12px_24px_#1e2531] transition-all border border-slate-200/50 dark:border-slate-800/20 cursor-pointer flex flex-col justify-between"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              {/* Picture Frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-200 dark:bg-[#101319] shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1a202d] border border-slate-200/50 dark:border-slate-800/10Grid">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-full bg-slate-100 dark:bg-[#151a23] text-slate-600 dark:text-slate-400 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4)] select-none">
                  {project.category}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex justify-between items-start mb-2 select-none">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h4>
                
                {/* Heart Button */}
                <button
                  id={`like-btn-${project.id}`}
                  onClick={(e) => handleLike(project.id, e)}
                  className={`flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border border-slate-200/40 dark:border-slate-800/30 shadow-[2px_2px_4px_#b8b9be,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#07080b,-2px_-2px_4px_#1e2531] transition-all
                    ${hasLiked[project.id]
                      ? 'bg-rose-50 dark:bg-[#2c1319] text-rose-500 shadow-[inset_1.5px_1.5px_3px_#b8b9be,inset_-1.5px_-1.5px_3px_#ffffff] dark:shadow-[inset_1.5px_1.5px_3px_#07080b,inset_-1.5px_-1.5px_3px/#151a23]'
                      : 'bg-slate-100 dark:bg-[#151a23] text-slate-500 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-[#1b212f]'
                    }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked[project.id] ? 'fill-current' : ''}`} />
                  <span>{likes[project.id]}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2 select-text">
                {project.description}
              </p>
            </div>

            {/* Tags & Action Row */}
            <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/30 pt-4 select-none">
              <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                {project.tags.slice(0, 3).map(t => (
                  <span key={t} className="text-[9px] font-mono text-slate-400 dark:text-slate-550 bg-slate-100 dark:bg-[#151a23] border border-slate-200/50 dark:border-slate-800/20 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>

              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-350 font-sans tracking-tight">
                Inspect <ArrowRight className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 translate-x-0 group-hover:translate-x-1 duration-300 transition-transform" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Dialog overlay (Soft recess popup) */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              id="project-detail-modal"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-slate-100 dark:bg-[#12151c] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-[15px_15px_30px_#090d1640,-15px_-15px_30px_rgba(255,255,255,0.9)] dark:shadow-[15px_15px_30px_rgba(0,0,0,0.55),-15px_-15px_30px_rgba(30,37,49,0.15)] border border-slate-200 dark:border-slate-800/35 outline-none"
            >
              {/* Dynamic Modal Header */}
              <div className="flex justify-between items-center mb-6 select-none">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#151a23] flex items-center justify-center shadow-[inset_2px_2px_5px_#b8b9be,inset_-2px_-2px_5px_#ffffff] dark:shadow-[inset_2px_2px_5px_#07080b,inset_-2px_-2px_5px_#1e2531]">
                    <Code className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">Project Details</h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">{activeProject.category}</span>
                  </div>
                </div>

                <button
                  id="project-modal-close"
                  onClick={() => {
                    playTactileClick('heavy');
                    setActiveProject(null);
                  }}
                  className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100 dark:bg-[#151a23] shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#07080b,-3px_-3px_6px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Large Picture Frame */}
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-[#101319] shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531] border border-slate-200 dark:border-slate-800/20">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details Body */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4 select-none">
                  {activeProject.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono font-semibold text-indigo-500 dark:text-indigo-400 bg-slate-100 dark:bg-[#151a23] border border-slate-200/50 dark:border-slate-800/20 px-2.5 py-1 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
                      {t}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight leading-snug">
                  {activeProject.title}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans select-text whitespace-pre-line">
                  {activeProject.longDescription}
                </p>
              </div>

              {/* Links Footer Row */}
              <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-200/60 dark:border-slate-800/30 pt-6 mt-8 select-none font-sans">
                <a
                  href={activeProject.demoUrl}
                  onClick={() => playTactileClick('light')}
                  className="flex-1 py-3 text-center bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-2xl shadow-[4px_4px_8px_rgba(79,70,229,0.35)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.4)] hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live App</span>
                </a>

                <a
                  href={activeProject.githubUrl}
                  onClick={() => playTactileClick('light')}
                  className="flex-1 py-3 text-center bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-semibold rounded-2xl shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#07080b,-5px_-5px_10px_#1e2531] hover:shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#07080b,-2px_-2px_5px_#1e2531] active:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:active:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531] transition-all flex items-center justify-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>Browse Repository</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
