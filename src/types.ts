export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Frontend' | 'Fullstack' | 'AI / GenAI' | 'Design';
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Frontend' | 'Backend' | 'Tools';
  icon: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  jobType: string;
  text: string;
  timestamp: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  experienceYears: number;
  coffeeCups: number;
  projectsCompleted: number;
  skills: Skill[];
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: "Alex Mercer",
  role: "Lead Full-Stack & Neumorphic UX Architect",
  headline: "Crafting tactile, high-fidelity digital systems with physical soul.",
  bio: "I build modern web applications that bridge the digital-physical divide. Specializing in advanced responsive layouts, server-side AI integrations, and tactile micro-interactions that make pixels feel satisfyingly heavy and responsive.",
  location: "San Francisco, CA (Open to Remote)",
  experienceYears: 6,
  coffeeCups: 1242,
  projectsCompleted: 24,
  skills: [
    { name: "React / Vite", level: 95, category: "Frontend", icon: "Code2" },
    { name: "TypeScript", level: 90, category: "Languages", icon: "Code2" },
    { name: "Node.js & Express", level: 88, category: "Backend", icon: "Server" },
    { name: "Tailwind CSS", level: 98, category: "Frontend", icon: "Palette" },
    { name: "Gemini API SDK", level: 92, category: "Tools", icon: "Sparkles" },
    { name: "D3.js / Recharts", level: 85, category: "Frontend", icon: "BarChart3" },
    { name: "PostgreSQL & Prisma", level: 80, category: "Backend", icon: "Database" },
    { name: "Git & Docker", level: 85, category: "Tools", icon: "Settings2" },
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "tactile-ui",
    title: "Tactile Audio-Synth Dashboard",
    description: "An offline-first synthesiser and performance grid featuring full fluid neumorphic animations and hardware-mode dial feedback.",
    longDescription: "A pure client-side modular audio synthesizer workspace built to push the limits of neumorphic aesthetics and high-performance AudioContext. It includes virtual analog oscillator knobs, interactive ADSR envelopes, low-frequency oscillators, and mechanical toggle switches that produce realistic synthesised physical click sounds.",
    category: "Frontend",
    tags: ["React", "Web Audio API", "Tailwind CSS", "Motion"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "gemini-recruiter",
    title: "AI Co-pilot for Recruiters",
    description: "A smart hiring suite that translates open roles into customized assessment workflows and dynamically creates tailored pitches using LLMs.",
    longDescription: "A full-stack, AI-powered application designed for tech recruiters. It utilizes the Gemini 3.5 API to read draft resumes and target job profiles, generating completely personalized engagement plans, cover letters, and live interview prompts with zero typical LLM fluff.",
    category: "AI / GenAI",
    tags: ["Express", "Gemini SDK", "TypeScript", "Tailwind"],
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "fluid-charts",
    title: "Neumorphic Data Engine",
    description: "A gorgeous, responsive analytics suite using customized D3 charts designed on convex and concave panels.",
    longDescription: "An advanced data visualization platform illustrating complex data streams. It uses custom svg overlays, motion animation transitions, and light/dark offset shadow variations to make real-time metrics, line graphs, and bento KPI cards physically pop out of the page.",
    category: "Fullstack",
    tags: ["D3.js", "Express", "Tailwind CSS", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "ambient-os",
    title: "Ambient Deck Interface",
    description: "A cozy browser-based minimalist OS interface complete with mechanical widgets, media deck, and interactive focus tools.",
    longDescription: "A physical system-style workspace providing widgets (vinyl record deck, task trackers, clocks) with micro-synthesised clicks, dark shadow toggle variations, and tactile sliding adjustments designed to elevate everyday development work.",
    category: "Design",
    tags: ["Figma Design", "Physics Canvas", "React", "Motion"],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  }
];

