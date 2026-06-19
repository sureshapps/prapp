import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, RefreshCw, Volume2, VolumeX, X, MessageSquare } from "lucide-react";
import { playTactileClick } from "./AudioClick";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

const QUICK_PROMPTS = [
  "What is your stack?",
  "Tell me about your experience",
  "Are you open to relocate?",
  "How can I hire you?"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: "Hi! I'm Alex's AI Recruiter assistant. Ask me anything about my core skills, portfolio projects, or availability. I can also formulate custom pitch drafts!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(QUICK_PROMPTS);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;
    
    playTactileClick('heavy');
    const newMessages = [...messages, { sender: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { sender: 'assistant', text: data.reply }]);
        playTactileClick('success');
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'assistant', 
            text: `⚠️ ${data.error || "Something went wrong fetching the response. Please verify your GEMINI_API_KEY."}` 
          }
        ]);
        playTactileClick('heavy');
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'assistant', 
          text: "⚠️ Failed to connect to server. Ensure your dev server is active and Gemini is configured." 
        }
      ]);
      playTactileClick('heavy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    playTactileClick('light');
    handleSendMessage(prompt);
  };

  const handleClearChat = () => {
    playTactileClick('heavy');
    setMessages([
      {
        sender: 'assistant',
        text: "Inbox flushed. Nice and fresh! Ask me anything about Alex Mercer's architecture."
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="ai-floating-toggle"
          onClick={() => {
            playTactileClick('heavy');
            setIsOpen(!isOpen);
          }}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-300 select-none
            ${isOpen 
              ? "bg-slate-200 text-slate-800 shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff]" 
              : "bg-slate-100 text-slate-700 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff]"
            }`}
        >
          <Sparkles className={`w-5 h-5 text-indigo-500 ${isLoading ? "animate-spin" : ""}`} />
          <span className="text-sm font-sans tracking-tight">AI Assistant</span>
          {isOpen ? <X className="w-4 h-4 ml-1 text-slate-400" /> : <MessageSquare className="w-4 h-4 ml-1 text-slate-400" />}
        </button>
      </div>

      {/* Chat Draw Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-window-container"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[550px] max-h-[80vh] z-40 flex flex-col bg-slate-100 rounded-3xl overflow-hidden shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff] border border-slate-200"
          >
            {/* Header */}
            <div className="p-4 bg-slate-100 border-b border-slate-200/60 flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shadow-[inset_2px_2px_5px_#b8b9be,inset_-2px_-2px_5px_#ffffff]">
                  <Bot className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 font-sans tracking-tight leading-none">Alex's Co-pilot</h3>
                  <span className="text-[10px] text-slate-400 font-mono">GEMINI-3.5-FLASH</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  id="ai-clear-chat-btn"
                  onClick={handleClearChat}
                  title="Reset Dialogue"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff] active:shadow-[inset_1px_1px_3px_#b8b9be,inset_-1px_-1px_3px_#ffffff] transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  id="ai-close-chat-btn"
                  onClick={() => {
                    playTactileClick('heavy');
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff] active:shadow-[inset_1px_1px_3px_#b8b9be,inset_-1px_-1px_3px_#ffffff] transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages body (Concave inner shadow) */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-100 shadow-[inset_4px_4px_10px_#d1d9e6,inset_-4px_-4px_10px_#ffffff] space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff]">
                      <Bot className="w-3 h-3 text-indigo-500" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-sans select-text
                      ${msg.sender === 'user'
                        ? 'bg-slate-300 text-slate-800 rounded-tr-none shadow-[2px_2px_5px_#b8b9be,-1px_-1px_3px_#ffffff]'
                        : 'bg-slate-50 text-slate-700 rounded-tl-none shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff]'
                      }`}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-[2px_2px_4px_#b8b9be,-2px_-2px_4px_#ffffff]">
                      <User className="w-3 h-3 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 shadow-[2px_2px_5px_#b8b9be,-2px_-2px_5px_#ffffff]">
                    <Bot className="w-3 h-3 text-indigo-500 animate-pulse" />
                  </div>
                  <div className="bg-slate-50 text-slate-400 py-2.5 px-4 rounded-2xl rounded-tl-none text-xs flex gap-1.5 items-center shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff]">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions & Input Tray */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 text-slate-800">
              {/* Suggestions chips */}
              {messages.length === 1 && !isLoading && (
                <div className="mb-3 space-y-1.5 select-none">
                  <p className="text-[10px] text-slate-400 px-1 font-mono uppercase tracking-wider">Quick Inquiries:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((p, i) => (
                      <button
                        key={i}
                        id={`ai-suggestion-${i}`}
                        onClick={() => handleSuggestionClick(p)}
                        className="text-[11px] px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans border border-slate-200/50 rounded-full shadow-[2px_2px_4px_#b8b9be,-2px_-2px_4px_#ffffff] active:shadow-[inset_1px_1px_2px_#b8b9be,inset_-1px_-1px_2px_#ffffff] transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text input form */}
              <form
                id="ai-chat-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex items-center gap-2 select-none"
              >
                <div className="flex-1 relative">
                  <input
                    id="ai-chat-input"
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a query for Alex..."
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-100 rounded-xl font-sans text-slate-700 shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] focus:outline-none placeholder-slate-400"
                  />
                </div>
                <button
                  id="ai-chat-send-btn"
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all ${
                    !inputText.trim() || isLoading
                      ? "text-slate-300 shadow-[inset_1px_1px_3px_#b8b9be,inset_-1px_-1px_3px_#ffffff]"
                      : "text-indigo-600 shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] hover:text-indigo-800 active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff]"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
