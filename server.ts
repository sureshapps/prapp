import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client (server side only)
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// 1. API: AIAssistant Chat proxy route
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!ai) {
    return res.status(503).json({ 
      error: "Gemini API key is not configured in Secrets. Please define GEMINI_API_KEY in Secrets." 
    });
  }

  try {
    const formattedMessages = messages || [];
    const lastUserMsg = formattedMessages.length > 0 ? formattedMessages[formattedMessages.length - 1].text : "Hello";

    // System instruction detailing the profile
    const systemInstruction = `You are Alex Mercer, a Lead Full-Stack & Neumorphic UX Architect (the owner of this portfolio website).
Answer the recruiter or visitor's questions directly in a professional, polite, and confident tone.
Speak in the first person ("I"). Keep your responses relatively concise (under 150 words) to fit comfortably in a chat window.
Highlight your expertise in React, TypeScript, Tailwind CSS, high-fidelity tactile design (Neumorphism), the Gemini SDK, and modular full-stack engineering.
Never break character. You are proud of your attention to detail, tactile aesthetics, and performance-driven applications.
If asked about contact or hiring, encourage them to fill out the Recruiter Form on the page, or leave a message.
Background:
- Experience: 6 years leading front-end architecture and fluid system designs.
- Philosophy: Digital interfaces should feel satisfying, like mechanical keyboards and soft offline tactile decks.
- Key projects include: Tactile Audio-Synth Dashboard, AI Recopilot, Neumorphic Data Engine, and Ambient Deck Interface.
- Currently: Seeking Senior Front-End, UX Architect, or Full-Stack roles that value design craft and high-fidelity layouts.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: lastUserMsg,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred talking to Gemini." });
  }
});

// 2. API: Draft cover letter route
app.post("/api/draft-letter", async (req, res) => {
  const { company, jobTitle, jobType, keyPoints } = req.body;
  if (!ai) {
    return res.status(503).json({ 
      error: "Gemini API key is not configured in Secrets. Please define GEMINI_API_KEY in Secrets." 
    });
  }

  try {
    const prompt = `Compose a highly engaging, custom cover letter/introduction pitch on behalf of Alex Mercer (Full-Stack & Neumorphic UX Architect) applying to:
Company: ${company || 'your target company'}
Position: ${jobTitle || 'Fullstack Engineer / UX Architect'}
Employment Type: ${jobType || 'Full-Time'}
Additional Target Points: ${keyPoints || 'No specific focus specified'}

Rules of composition:
- Written in the 1st person ("I") with the exact voice of Alex Mercer.
- Confident, precise, and professional. Speak directly about how my combination of highly polished front-end craft (designing soft-UI physical-feeling systems with satisfying micro-interactions) and core backend capability solves real product engineering challenges.
- Refer to my profile details: 6 years experience, React/TypeScript/Tailwind expert, Gemini SDK fullstack builder.
- Keep it under 200 words, elegant, punchy, divided into clear short paragraphs.
- Ends with a friendly recruiter call-to-action signature. No template brackets like "[My Name]". It should be signed cleanly: "Best regards, Alex Mercer".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.75,
      }
    });

    res.json({ letter: response.text });
  } catch (error: any) {
    console.error("Gemini Letter Error:", error);
    res.status(500).json({ error: error.message || "An error occurred compiling the cover letter." });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
