import React, { useState } from "react";
import { Send, Sparkles, Building2, User, Mail, FileText, ChevronRight, CheckCircle2, RotateCcw, Copy, Check } from "lucide-react";
import { playTactileClick } from "./AudioClick";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";

interface ContactProps {
  onMessageAdded: () => void;
}

export default function Contact({ onMessageAdded }: ContactProps) {
  // --- Contact Form State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobType: "Full-Time",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --- AI Synthesis State ---
  const [aiConfig, setAiConfig] = useState({
    company: "",
    jobTitle: "",
    jobType: "Full-Time",
    keyPoints: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftedLetter, setDraftedLetter] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [genError, setGenError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAiConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playTactileClick('heavy');
    setIsSubmitting(true);

    const newMessage: Message = {
      id: "msg-" + Date.now(),
      name: formData.name,
      email: formData.email,
      company: formData.company || "N/A",
      jobType: formData.jobType,
      text: formData.message,
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Store in localStorage
    setTimeout(() => {
      try {
        const stored = localStorage.getItem("alex_portfolio_messages");
        const messages = stored ? JSON.parse(stored) : [];
        messages.push(newMessage);
        localStorage.setItem("alex_portfolio_messages", JSON.stringify(messages));
        
        onMessageAdded(); // Notify parent of updates
        playTactileClick('success');
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", company: "", jobType: "Full-Time", message: "" });
      } catch (err) {
        console.error("Storage Error", err);
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  };

  const handleGenerateAiPitch = async () => {
    if (!aiConfig.company || !aiConfig.jobTitle) return;

    playTactileClick('heavy');
    setIsGenerating(true);
    setGenError("");
    setDraftedLetter("");

    try {
      const response = await fetch("/api/draft-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiConfig),
      });

      const data = await response.json();

      if (response.ok) {
        setDraftedLetter(data.letter);
        playTactileClick('success');
      } else {
        setGenError(data.error || "Could not generate cover letter. Please verify GEMINI_API_KEY in secrets.");
        playTactileClick('heavy');
      }
    } catch (err) {
      console.error(err);
      setGenError("Network err connecting to synthesis portal.");
      playTactileClick('heavy');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPitch = () => {
    playTactileClick('success');
    navigator.clipboard.writeText(draftedLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleInjectPitch = () => {
    playTactileClick('light');
    setFormData(prev => ({
      ...prev,
      company: aiConfig.company,
      jobType: aiConfig.jobType,
      message: draftedLetter
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* SECTION A: SMART CO-PILOT COVER LETTER GENERATOR */}
      <div 
        id="recruiter-ai-synthesis"
        className="bg-slate-100 dark:bg-[#12151c] p-6 md:p-8 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] border border-slate-200/50 dark:border-slate-800/20 flex flex-col justify-between transition-all duration-300"
      >
        <div className="select-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#151a23] flex items-center justify-center shadow-[inset_2px_2px_5px_#b8b9be,inset_-2px_-2px_5px_#ffffff] dark:shadow-[inset_2px_2px_5px_#07080b,inset_-2px_-2px_5px_#1e2531] transition-all duration-300">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">AI Recruiter Synthesis</h4>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">DRAFT WITH GEMINI PIXEL INTELLIGENCE</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-4">
            hiring manager? Input your target specs, and Alex's integrated Gemini port will formulate a bespoke cover letter pitch. You can then edit or inject it straight into the message composer!
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4 my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 select-none md:select-auto">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Your Company Name</label>
              <div className="relative flex items-center">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3.5" />
                <input
                  id="ai-comp-input"
                  type="text"
                  name="company"
                  value={aiConfig.company}
                  onChange={handleAiChange}
                  placeholder="e.g. Google"
                  className="w-full text-xs font-sans pl-10 pr-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 border-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5 select-none md:select-auto">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Role/Job Title</label>
              <div className="relative flex items-center">
                <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3.5" />
                <input
                  id="ai-title-input"
                  type="text"
                  name="jobTitle"
                  value={aiConfig.jobTitle}
                  onChange={handleAiChange}
                  placeholder="e.g. UX Architect"
                  className="w-full text-xs font-sans pl-10 pr-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 border-none transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 select-none sm:col-span-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Engagement Type</label>
              <select
                id="ai-job-select"
                name="jobType"
                value={aiConfig.jobType}
                onChange={handleAiChange}
                className="w-full text-xs font-sans px-3.5 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl border-none shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] focus:outline-none text-slate-600 dark:text-slate-300 appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="Full-Time" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Full-Time</option>
                <option value="Contract" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Contract</option>
                <option value="Part-Time" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Part-Time</option>
                <option value="Remote Project" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Remote</option>
              </select>
            </div>

            <div className="space-y-1.5 select-none sm:col-span-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Core Pitch Accent Focal Point</label>
              <input
                id="ai-points-input"
                type="text"
                name="keyPoints"
                value={aiConfig.keyPoints}
                onChange={handleAiChange}
                placeholder="e.g. system scalability, design-to-code craft"
                className="w-full text-xs font-sans px-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 border-none transition-all duration-300"
              />
            </div>
          </div>

          <button
            id="compile-pitch-btn"
            onClick={handleGenerateAiPitch}
            disabled={!aiConfig.company || !aiConfig.jobTitle || isGenerating}
            className={`w-full py-3.5 font-sans font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer
              ${(!aiConfig.company || !aiConfig.jobTitle || isGenerating)
                ? "text-slate-400 dark:text-slate-550 bg-slate-100 dark:bg-[#151a23] shadow-[inset_2px_2px_5px_#b8b9be,inset_-2px_-2px_5px_#ffffff] dark:shadow-[inset_2px_2px_5px_#07080b,inset_-2px_-2px_5px_#1e2531] opacity-50"
                : "bg-slate-100 dark:bg-[#151a23] text-indigo-600 dark:text-indigo-400 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#07080b,-5px_-5px_10px_#1e2531] hover:text-indigo-800 dark:hover:text-indigo-300 hover:shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#07080b,-2px_-2px_5px_#1e2531] active:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] dark:active:shadow-[inset_3px_3px_6px_#07080b,inset_-3px_-3px_6px_#1e2531]"
              }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Synthesizing Core Pitch..." : "Synthesize Bespoke Pitch"}</span>
          </button>
        </div>

        {/* AI Output Deck (Concave Box) */}
        <div className="flex-1 min-h-[160px] bg-slate-100 dark:bg-[#101319] rounded-3xl p-4 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#07080b,inset_-4px_-4px_8px_#1a202d] border border-slate-200/40 dark:border-slate-800/20 relative flex flex-col justify-between overflow-hidden select-text transition-all duration-300">
          {draftedLetter ? (
            <div className="flex flex-col h-full justify-between">
              <div className="overflow-y-auto max-h-[180px] text-xs font-sans text-slate-600 dark:text-slate-300 leading-relaxed pr-1 mb-3 whitespace-pre-line">
                {draftedLetter}
              </div>
              <div className="flex gap-2.5 pt-2 select-none border-t border-slate-200/50 dark:border-slate-800/20">
                <button
                  id="pitch-copy-btn"
                  onClick={handleCopyPitch}
                  className="flex-1 py-2 text-center bg-slate-100 dark:bg-[#151a23] text-slate-600 dark:text-slate-350 font-semibold text-[11px] rounded-xl shadow-[2.5px_2.5px_5px_#b8b9be,-2.5px_-2.5px_5px_#ffffff] dark:shadow-[2.5px_2.5px_5px_#07080b,-2.5px_-2.5px_5px_#1e2531] active:shadow-[inset_1.5px_1.5px_3px_#b8b9be,inset_-1.5px_-1.5px_3px_#ffffff] dark:active:shadow-[inset_1.5px_1.5px_3px_#07080b,inset_-1.5px_-1.5px_3px_#1e2531] flex items-center justify-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>

                <button
                  id="pitch-inject-btn"
                  onClick={handleInjectPitch}
                  className="flex-1 py-2 text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-[11px] rounded-xl shadow-[3px_3px_6px_rgba(79,70,229,0.3)] hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                  <span>Transfer Into Composer</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 text-center p-4 py-8 select-none">
              {genError ? (
                <div className="text-rose-500 text-[11px] max-w-sm font-sans flex flex-col items-center gap-1">
                  <span>⚠️ Calibration Error:</span>
                  <span>{genError}</span>
                </div>
              ) : (
                <>
                  <FileText className="w-8 h-8 text-slate-300 dark:text-slate-700 stroke-[1.5]" />
                  <span className="text-[11px] font-sans mt-2">Bespoke copy compilation area empty. Configure specifications and tap synthesizer button above.</span>
                </>
              )}
            </div>
          )}
        </div>

      </div>

      {/* SECTION B: PHYSICAL-STYLE MESSAGE COMPOSER CONTAINER */}
      <div 
        id="visitor-message-composer"
        className="bg-slate-100 dark:bg-[#12151c] p-6 md:p-8 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#07080b,-8px_-8px_16px_#1e2531] border border-slate-200/50 dark:border-slate-800/20 flex flex-col justify-between transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {!submitSuccess ? (
            <form id="composer-form" onSubmit={handleSubmitMessage} className="flex flex-col justify-between h-full space-y-5">
              <div className="select-none">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">Tactile Dialogue Center</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">Let Alex hear from you. Submissions are persisted safely.</p>
              </div>

              {/* Inputs */}
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 select-none font-sans">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Your Name *</label>
                    <div className="relative flex items-center">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5" />
                      <input
                        id="comp-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full text-xs font-sans pl-10 pr-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] border-none focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 select-none font-sans">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Email Address *</label>
                    <div className="relative flex items-center">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5" />
                      <input
                        id="comp-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full text-xs font-sans pl-10 pr-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] border-none focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 select-none sm:col-span-1 font-sans">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Job Context</label>
                    <select
                      id="comp-job-select"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-3.5 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl border-none shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] focus:outline-none text-slate-650 dark:text-slate-300 appearance-none cursor-pointer transition-all duration-300"
                    >
                      <option value="Full-Time" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Full-Time</option>
                      <option value="Contract" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Contract</option>
                      <option value="Part-Time" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Part-Time</option>
                      <option value="Just Greeting" className="bg-slate-100 dark:bg-[#151a23] text-slate-700 dark:text-slate-200">Hello!</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 select-none sm:col-span-2 font-sans">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">Organization (Optional)</label>
                    <div className="relative flex items-center">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3.5" />
                      <input
                        id="comp-comp"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Inc."
                        className="w-full text-xs font-sans pl-10 pr-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] border-none focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 select-none">Message Content *</span>
                  <textarea
                    id="comp-msg"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly detail your query, project spec or role proposal here..."
                    className="w-full text-xs font-sans px-4 py-3 bg-slate-100 dark:bg-[#11141b] rounded-2xl shadow-[inset_2.5px_2.5px_5px_#b8b9be,inset_-2.5px_-2.5px_5px_#ffffff] dark:shadow-[inset_2.5px_2.5px_5px_#07080b,inset_-2.5px_-2.5px_5px_#1a202d] border-none focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 select-text resize-none transition-all duration-300"
                  />
                </div>
              </div>

              <button
                id="composer-submit-btn"
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className={`w-full py-3.5 font-sans font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 select-none transition-all cursor-pointer
                  ${(isSubmitting || !formData.name || !formData.email || !formData.message)
                    ? "text-slate-400 dark:text-slate-550 bg-slate-100 dark:bg-[#151a23] shadow-[inset_2px_2px_5px_#b8b9be,inset_-2px_-2px_5px_#ffffff] dark:shadow-[inset_2px_2px_5px_#07080b,inset_-2px_-2px_5px_#1e2531] opacity-60"
                    : "bg-indigo-500 text-white shadow-[4px_4px_8px_rgba(79,70,229,0.35)] hover:bg-indigo-600 hover:shadow-lg focus:outline-none active:scale-[0.99]"
                  }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Transmitting Dialogue..." : "Transmit Dialogue"}</span>
              </button>
            </form>
          ) : (
            <motion.div
              id="composer-success-banner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center text-center py-10 h-full select-none"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#151a23] flex items-center justify-center shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#07080b,-5px_-5px_10px_#1e2531] mb-6 transition-all duration-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">Transmission Secured!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm font-sans mt-2 leading-relaxed">
                Your message has been stored. You can crack open the <span className="font-semibold">Confidential Safe</span> widget in the playground pane using code <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-mono">1337</span> to verify your queued message in the decrypted logbook stream!
              </p>

              <button
                id="success-composer-reset"
                onClick={() => {
                  playTactileClick('light');
                  setSubmitSuccess(false);
                }}
                className="mt-8 px-5 py-3 bg-slate-100 dark:bg-[#151a23] text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-450 text-xs font-bold rounded-2xl shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#07080b,-4px_-4px_8px_#1e2531] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#07080b,inset_-2px_-2px_4px_#1e2531] transition-all flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Compose Another</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
