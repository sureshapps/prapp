import React, { useState, useEffect } from "react";
import { Message } from "../types";
import { playTactileClick } from "./AudioClick";
import { Mail, Trash2, Calendar, ShieldAlert, FolderSync, ShieldX, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InboxProps {
  isUnlocked: boolean;
  onLock: () => void;
  updateCounter: number;
}

export default function Inbox({ isUnlocked, onLock, updateCounter }: InboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("alex_portfolio_messages");
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        // Hydrate with 2 satisfying mock messages so there is something neat to view immediately after hacking!
        const mockMsg: Message[] = [
          {
            id: "mock-1",
            name: "Emily Watson",
            email: "emily@techventures.io",
            company: "Tech Ventures",
            jobType: "Full-Time",
            text: "Alex! I loved your Neumorphic Audio Deck. We are building interactive WebGL components. Let's schedule a call next Tuesday to chat about our tech architect role.",
            timestamp: "Jun 18, 2026, 04:30 PM"
          },
          {
            id: "mock-2",
            name: "Marcus Aurelius",
            email: "marcus@philosophyinc.com",
            company: "Philosophy Inc",
            jobType: "Contract",
            text: "Highly cohesive tactile controls. Sending greetings from Rome, excellent craft Mercer.",
            timestamp: "Jun 19, 2026, 08:15 AM"
          }
        ];
        localStorage.setItem("alex_portfolio_messages", JSON.stringify(mockMsg));
        setMessages(mockMsg);
      }
    } catch (err) {
      console.error(err);
    }
  }, [updateCounter]);

  const handleDeleteMessage = (id: string) => {
    playTactileClick('heavy');
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    try {
      localStorage.setItem("alex_portfolio_messages", JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
  };

  const handleWipeMessages = () => {
    playTactileClick('heavy');
    setMessages([]);
    try {
      localStorage.removeItem("alex_portfolio_messages");
    } catch (err) {
      console.warn(err);
    }
  };

  if (!isUnlocked) {
    return (
      <div 
        id="inbox-locked-deck"
        className="bg-slate-100 p-8 rounded-3xl shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] border border-slate-200/55 text-center flex flex-col items-center justify-center min-h-[250px] select-none"
      >
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] mb-5">
          <ShieldAlert className="w-6 h-6 text-slate-400 stroke-[1.5]" />
        </div>
        <h4 className="text-sm font-bold text-slate-700 font-sans uppercase tracking-wider">Confidential Logbook Stack</h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1.5 leading-relaxed font-sans">
          Submitted recruitment queries and visitor messages are secure. Decode the safe keypad using code <span className="font-semibold text-indigo-500 font-mono">1337</span> above to decrypt physical flash logs.
        </p>
      </div>
    );
  }

  return (
    <div 
      id="inbox-decrypted-deck"
      className="bg-slate-100 p-6 md:p-8 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] border border-slate-200/55"
    >
      {/* Decrypted Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-200/60 select-none">
        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shadow-[inset_2px_2px_5px_#b8b9be,inset_-2px_-2px_5px_#ffffff]">
            <Database className="w-4 h-4 text-emerald-500 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">CRACKED CORE LOGBOOK</h4>
            <span className="text-[10px] text-slate-400 font-mono leading-none">TOTAL SECURED DIALOGUES: {messages.length}</span>
          </div>
        </div>

        <div className="flex gap-3 select-none">
          <button
            id="inbox-wipe-btn"
            onClick={handleWipeMessages}
            disabled={messages.length === 0}
            className="px-3.5 py-2 text-[10px] font-bold text-rose-500 bg-slate-100 rounded-xl shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] disabled:opacity-40 hover:text-rose-600 transition-colors"
          >
            Flush Database
          </button>
          <button
            id="inbox-lock-btn"
            onClick={() => {
              playTactileClick('heavy');
              onLock();
            }}
            className="px-3.5 py-2 text-[10px] font-bold text-slate-600 bg-slate-100 rounded-xl shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] hover:text-slate-850 transition-colors"
          >
            Lock Safe
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-10 select-none">
          <Mail className="w-8 h-8 text-slate-300 mx-auto stroke-[1.5] mb-2" />
          <span className="text-xs text-slate-400 font-sans block">LOGBOOK REGISTERED VACANT. No visitor transmissions queued.</span>
        </div>
      ) : (
        /* Message list container */
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-100 p-4 rounded-2xl shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] hover:shadow-[3px_3px_6px_#b8b9be,-2px_-2px_4px_#ffffff] transition-all flex flex-col sm:flex-row justify-between items-start gap-4 select-text"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 select-none">
                    <span className="text-xs font-bold text-slate-700 font-sans tracking-tight truncate max-w-[150px]">{msg.name}</span>
                    <span className="text-[9px] font-mono text-slate-400 font-bold bg-slate-100 shadow-[inset_1px_1px_2px_#b8b9be] px-1.5 py-0.5 rounded">
                      {msg.company}
                    </span>
                    <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50 font-bold px-1.5 py-0.5 rounded">
                      {msg.jobType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-mono select-none">{msg.email}</p>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-sans pr-2 pt-1 whitespace-pre-line">
                    {msg.text}
                  </p>

                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono select-none pt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                <button
                  id={`inbox-delete-${msg.id}`}
                  onClick={() => handleDeleteMessage(msg.id)}
                  title="Remove message log"
                  className="p-2 rounded-xl text-rose-500 hover:text-rose-700 bg-slate-100 shadow-[2px_2px_4px_#b8b9be,-1px_-1px_2px_#ffffff] active:shadow-[inset_1.5px_1.5px_3px_#b8b9be,inset_-1.5px_-1.5px_3px_#ffffff] transition-all shrink-0 align-self-end sm:align-self-start select-none"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
