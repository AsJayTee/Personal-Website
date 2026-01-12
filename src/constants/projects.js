export const projects = [
  {
    id: 1,
    title: "Medical Q&A: Reward Model Overconfidence Penalization",
    image: "/images/showcase/medqa.png",
    description: "A research project developing reward models for medical question-answering that incorporate overconfidence penalization. Addresses the fundamental misalignment in RLHF where models are incentivized to guess confidently rather than express appropriate uncertainty. Implements risk-stratified confidence penalties and evaluates their impact on reward model calibration using the TREC-2017 LiveQA medical dataset.",
    technologies: [
      "Python",
      "PyTorch",
      "Transformers (LLaMA-3.2-3B-Instruct)",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "XML Parsing",
      "AdamW Optimizer",
      "Mixed Precision Training"
    ],
    features: [
      "Risk-stratified reward modeling with confidence-aware penalties",
      "Bradley-Terry pairwise ranking loss with weighted confidence penalties",
      "Rule-based confidence estimation using linguistic markers and medical terminology",
      "Expected Calibration Error (ECE) and pairwise accuracy evaluation",
      "Parameter-efficient training (3K trainable params on frozen LLaMA backbone)",
      "Safety-oriented metrics: high-confidence error rates by risk level"
    ],
    githubUrl: "https://github.com/AsJayTee/MedQA-Reward-Overconfidence"
  },
  {
    id: 2,
    title: "Psychology Blossom Chatbot",
    image: "/images/showcase/pb_chatbot.png",
    description: "An intelligent RAG-based chatbot built for Psychology Blossom, a Singapore-based counselling service. Designed to provide 24/7 client support, intelligent therapist matching, and scalable infrastructure for mental health services.",
    technologies: [
      "Python",
      "Google Cloud Platform",
      "JavaScript",
      "OpenAI API",
      "Facebook AI Similarity Search (FAISS)",
      "Github"
    ],
    features: [
      "24/7 automated customer support",
      "Smart therapist matching via multi-factor filtering",
      "Real-time response optimization",
      "Multi-language support capabilities",
      "Seamless handoff to human agents when needed",
      "Secure, cloud-based architecture using GCP",
      "Custom-built RAG system for optimized Q&A",
      "Reliable tool-calling framework with minimal LLM dependency",
      "Fuzzy matching and persistent preference memory"
    ],
    liveUrl: "https://psychologyblossom.com/",
    githubUrl: "https://github.com/AsJayTee/PB-Chatbot"
  },
  {
    id: 3,
    title: "TetrahouseTV Company Website",
    image: "/images/showcase/tetrahouse.png",
    description: "A full-service creative agency website for TetrahouseTV, specializing in film and content production. Features immersive video-heavy portfolio showcases, smooth scroll-triggered animations, and professional project presentations for commercial, documentary, music video, and social media content.",
    technologies: [
      "React",
      "Vite",
      "GSAP",
      "TailwindCSS",
      "React Router",
      "EmailJS",
      "React Icons",
      "Vercel",
      "Google Cloud Storage"
    ],
    features: [
      "Video-heavy portfolio showcase with custom video players",
      "Smooth scroll-triggered animations using GSAP & ScrollTrigger",
      "Fully responsive design optimized for all devices",
      "Interactive services section with hover animations",
      "Animated project detail pages with template system",
      "Contact form with EmailJS integration",
      "Release form with Google Sheets backend integration",
      "Immersive about page with storytelling sections",
      "Optimized performance with lazy loading and code splitting",
      "Custom typography with web fonts (OverusedGrotesk, HelveticaNeue)",
      "Social media integration (Instagram, LinkedIn)",
      "Video backgrounds with performance optimization"
    ],
    liveUrl: "https://tetrahouse.tv/",
    githubUrl: null
  }
];