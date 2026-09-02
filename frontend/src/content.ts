// Single source of truth for all portfolio content.
// Edit this file to update site copy — no text should be hardcoded in components.

export const profile = {
  name: "Atharv Joshi",
  role: "Agentic AI Developer",
  company: "Capgemini",
  location: "Pune, India",
  tagline: "Production GenAI systems builder",
  subtagline:
    "RAG pipelines, autonomous multi-agent systems, and FastAPI backends that run at 99.5% uptime.",
  typingLines: [
    "> orchestrating agents since 2023",
    "> RAG pipelines in production",
    "> 99.5% uptime, always on",
  ],
  email: "joshiatharv67@gmail.com",
  phone: "+91 8329794009",
  linkedin: "https://linkedin.com/in/atharv-avinash-joshi-9b5765228",
  github: "https://github.com/atharv2001j",
  resumeUrl: "/resume.pdf",
  openToWork: true,
};

export type MetricChip = { label: string; value: string };

export type ExperienceBullet = {
  text: string;
  metric?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: ExperienceBullet[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    id: "capgemini",
    company: "Capgemini",
    role: "Agentic AI Developer",
    period: "Aug 2026 — Present",
    location: "Pune, India",
    bullets: [
      {
        text: "Working on building AI agents, integration of GenAI solutions to automate workflows, and building production-grade applications.",
      },
    ],
    tags: ["GenAI", "AI Agents", "Python"],
  },
  {
    id: "benchmark-it",
    company: "Benchmark IT Solutions",
    role: "Associate Software Engineer (GenAI)",
    period: "Nov 2024 — Aug 2026",
    location: "Pune, India",
    bullets: [
      {
        text: "Architected end-to-end GenAI solutions in Python, cutting manual processing time across core business workflows.",
        metric: "45% less manual processing",
      },
      {
        text: "Engineered RAG pipelines for document validation using Qdrant and FAISS as vector stores.",
        metric: "92% accuracy · 60% fewer errors",
      },
      {
        text: "Built and deployed production RESTful APIs with FastAPI and Flask, serving high daily request volume.",
        metric: "500+ req/day · 99.5% uptime",
      },
      {
        text: "Orchestrated autonomous AI agents and multi-agent workflows with LangChain, LangGraph, and CrewAI.",
        metric: "35% more operational capacity",
      },
    ],
    tags: [
      "Python",
      "FastAPI",
      "Flask",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Qdrant",
      "FAISS",
      "Celery",
      "Redis",
      "OpenAI GPT-4",
      "Gemini",
    ],
  },
  {
    id: "hesa-one",
    company: "HESA-ONE LLP",
    role: "AI Engineer Intern",
    period: "Sept 2023 — Jun 2024",
    location: "Nashik, India",
    bullets: [
      {
        text: "Constructed an industry-focused CycleGAN generative model synthesizing thousands of realistic images.",
        metric: "5,000+ images · 85% realism score",
      },
      {
        text: "Streamlined the full ML pipeline — data collection, preprocessing, training, fine-tuning, and evaluation.",
        metric: "22% faster · 30% less training time",
      },
    ],
    tags: ["Python", "TensorFlow", "PyTorch", "CNN", "CycleGAN", "Data Augmentation"],
  },
];

export type Project = {
  id: string;
  name: string;
  headline: string;
  bullets: string[];
  tags: string[];
  statusTag: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "packaging-doc-validation",
    name: "AI-Powered Packaging Document Validation System",
    headline: "94% accuracy processing 500+ packaging documents daily",
    bullets: [
      "Verified Textual Content, logo placement, icon alignment, and visual compliance using VLMs and Azure Custom Vision, cutting manual review by 70%.",
      "Automated validation workflows with OpenCV and Azure AI, scaling efficiency by 55% and eliminating 80% of manual errors.",
      "Processed jobs asynchronously via Celery and Redis, with Langfuse tracing pipeline quality and SMTP alerts cutting reporting delays by 65%.",
    ],
    tags: [
      "Python",
      "OpenCV",
      "VLM",
      "Azure AI",
      "Azure Custom Vision",
      "Qdrant",
      "Redis",
      "Celery",
      "SMTP",
      "Langfuse",
      "FastAPI",
      "Docker",
    ],
    statusTag: "[VLM · 94% accuracy · production]",
    link: "https://www.benchmarkit.solutions/laibel/",
  },
  {
    id: "asgard-world",
    name: "Asgard World — AI-Powered Job Portal",
    headline: "85% job-match search accuracy gain, 85% relevance for 1,000+ candidates",
    bullets: [
      "Built an AI-driven job portal with CV parsing, cover letter generation, and personalized job matching for 1,000+ candidates at an 85% relevance score.",
      "Deployed a RAG pipeline with LangChain and AWS OpenSearch for semantic profile-to-job matching, advancing search accuracy by 42%.",
      "Integrated Temporal for durable, fault-tolerant CV analysis and job-recommendation workflows, plus OpenAI real-time interview simulations, on a serverless FastAPI + AWS Lambda backend.",
      "Incorporated OpenAI real-time API for AI-driven interview simulations, substantially enhancing candidate preparation experience.",
    ],
    tags: [
      "LangChain",
      "OpenAI GPT-4",
      "Gemini",
      "Temporal",
      "AWS Lambda",
      "AWS OpenSearch",
      "FastAPI",
      "PostgreSQL",
      "Qdrant",
      "RAG",
      "Docker",
    ],
    statusTag: "[RAG · 85% accuracy gain · production]",
    link: "https://asgardjobs.ai/",
  },
  {
    id: "cyclegan-age-progression",
    name: "Facial Age Progression using CycleGAN",
    headline: "78% accuracy, 18% accuracy boost via data augmentation",
    bullets: [
      "Designed a CycleGAN-based facial aging simulation achieving 78% accuracy while preserving facial characteristics with minimal distortion.",
      "Applied data augmentation and preprocessing pipelines, lifting accuracy by 18% and cutting overfitting by 25%.",
    ],
    tags: ["Python", "TensorFlow", "PyTorch", "CNN", "CycleGAN", "Data Augmentation"],
    statusTag: "[CycleGAN · 78% accuracy · research]",
  },
];

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Python", "C++", "C"],
  },
  {
    category: "Generative AI & LLMs",
    items: [
      "LLMs",
      "RAG",
      "Generative AI (GenAI)",
      "Prompt Engineering",
      "Function Calling",
      "Few-Shot Prompting",
      "Chain-of-Thought Reasoning",
      "Embeddings",
      "Semantic Search",
      "MCP",
    ],
  },
  {
    category: "AI Agents & Orchestration",
    items: ["Autonomous AI Agents", "Multi-Agent Systems", "LangChain", "LangGraph", "CrewAI", "Temporal"],
  },
  {
    category: "ML/DL",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "GANs",
      "Supervised Learning",
      "Unsupervised Learning",
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: ["FastAPI", "Flask", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "Gradio", "Streamlit"],
  },
  {
    category: "Vector Databases",
    items: ["Qdrant", "FAISS", "Pinecone", "ChromaDB", "AWS OpenSearch"],
  },
  {
    category: "AI APIs & Platforms",
    items: ["OpenAI GPT-4", "Google Gemini", "Azure OpenAI Service", "Anthropic Claude", "Vertex AI"],
  },
  {
    category: "Async/Task Queue",
    items: ["Celery", "Redis (Message Broker)", "SMTP"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS Lambda", "AWS S3", "Azure AI", "Azure Custom Vision", "Docker", "CI/CD"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Monitoring & Observability",
    items: ["Langfuse", "LLM Tracing", "AI Pipeline Monitoring"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "JIRA", "Cursor AI", "Windsurf", "VS Code", "Claude Code"],
  },
];

export const education = {
  institution: "Sanjivani College of Engineering, Kopargaon",
  degree: "B.Tech, Computer Engineering",
  period: "2020 — 2024",
  cgpa: "9.05 / 10",
};

export const footer = {
  openToWorkLine: "Open to GenAI / backend engineering opportunities.",
};
