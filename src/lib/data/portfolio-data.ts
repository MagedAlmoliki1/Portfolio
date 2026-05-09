// src/lib/data/portfolio-data.ts
// Centralized portfolio content — extracted from Maged Almoliky's CV
// This file is the single source of truth for all portfolio content.

// ─── Personal Info ──────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Maged Almoliky",
  title: "Software Engineer",
  email: "almolikimaged@gmail.com",
  phone: "0574849199",
  location: "Riyadh, Saudi Arabia",
  visa: "Transferable Iqama",
  availability: "Available Immediately",
  socials: {
    github: "https://github.com/MagedAlmoliki1",
    linkedin: "https://www.linkedin.com/in/maged-almoliki-488188323/",
    x: "https://x.com/maged_almoliky",
  },
} as const;

// ─── Professional Summary ───────────────────────────────────────────────────

export const professionalSummary =
  "Results-driven Software Engineer with 3+ years of experience designing and building scalable backend systems, RESTful APIs, and event-driven microservices using Node.js, TypeScript, NestJS, and Express.js. Proficient in GraphQL, message brokers (RabbitMQ, Kafka, BullMQ), and both SQL and NoSQL databases. Hands-on experience with containerization (Docker, Kubernetes), CI/CD pipelines, and AWS cloud services. Strong understanding of Clean Architecture, SOLID principles, and Domain-Driven Design (DDD).";

export const heroTagline = "Software Engineer";

export const heroHeadline = "Software\nEngineering";

export const heroDescription =
  "I build production-grade distributed systems and AI-powered microservices with a focus on clean architecture and technical precision. Delivered systems that automated 80% of HR operations and improved matching accuracy by 85%.";

// ─── Technical Skills ───────────────────────────────────────────────────────

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const technicalSkills: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Node.js", "TypeScript", "JavaScript (ES2022+)", "Python", "PHP"],
  },
  {
    name: "Frameworks & Libraries",
    skills: ["NestJS", "Express.js", "FastAPI", "Laravel", "LangChain", "LangGraph"],
  },
  {
    name: "APIs & Protocols",
    skills: ["RESTful APIs", "GraphQL", "gRPC", "WebSockets"],
  },
  {
    name: "Message Brokers",
    skills: ["RabbitMQ", "Kafka", "BullMQ"],
  },
  {
    name: "SQL Databases",
    skills: ["PostgreSQL", "MySQL", "Prisma ORM", "TypeORM", "Query Optimization", "Indexing"],
  },
  {
    name: "NoSQL Databases",
    skills: ["MongoDB", "Redis", "Firebase Firestore"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Nginx"],
  },
  {
    name: "Architecture & Design",
    skills: ["Microservices", "Clean Architecture", "SOLID Principles", "DDD", "MVVM", "MVC"],
  },
  {
    name: "Testing & Quality",
    skills: ["Jest", "Unit Testing", "Integration Testing", "TDD", "Code Review"],
  },
  {
    name: "Auth & Security",
    skills: ["JWT", "OAuth 2.0", "RBAC", "Sanctum", "Passport"],
  },
  {
    name: "AI / ML",
    skills: [
      "LangChain", "LangGraph", "OpenAI API", "RAG", "FAISS",
      "Pinecone", "GPT-4", "Claude", "LLaMA", "Mixtral",
      "ONNX Runtime", "YOLOv10/v11",
    ],
  },
  {
    name: "Other Tools",
    skills: ["Git", "Linux", "Agile/Scrum", "Arabic NLP", "Prompt Engineering"],
  },
];

// Flat list for quick rendering
export const topSkills = [
  "Node.js", "TypeScript", "NestJS", "Express.js", "PostgreSQL",
  "MongoDB", "Redis", "Docker", "Kubernetes", "AWS",
  "GraphQL", "RabbitMQ", "LangChain", "FastAPI",
];

// ─── Work Experience ────────────────────────────────────────────────────────

export interface Experience {
  role: string;
  company: string;
  project?: string;
  location: string;
  period: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer (Team Lead)",
    company: "Al Jazeera University — Graduation Project",
    project: "Electronic AI-Powered Recruitment Platform",
    location: "Ibb, Yemen",
    period: "2024 – 2025",
    achievements: [
      "Architected a production-grade microservices platform using Node.js, TypeScript, NestJS, and Express.js.",
      "Designed RESTful APIs and GraphQL endpoints with real-time WebSocket notifications.",
      "Integrated RabbitMQ event-driven pipelines for asynchronous resume parsing and AI-powered job matching — reduced processing latency by 60%.",
      "Managed PostgreSQL and MongoDB schemas using Prisma and TypeORM.",
      "Implemented Redis caching and pub/sub messaging — reduced database load by 60%.",
      "Deployed services on AWS using Docker, Kubernetes, GitHub Actions CI/CD, and Nginx.",
      "Built AI microservices using FastAPI and LangChain with OpenAI API.",
      "Automated 80% of HR operations and improved candidate-job matching accuracy by 85%.",
      "Implemented unit and integration testing using Jest.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Production Projects (Node.js / Laravel / PHP)",
    location: "Remote",
    period: "2024 – 2025",
    achievements: [
      "Built scalable RESTful APIs and GraphQL services with NestJS, Express.js, and Laravel.",
      "Managed database schemas, migrations, seeders, and query optimization.",
      "Used BullMQ for background job processing and multi-step data pipelines.",
      "Configured Docker and Kubernetes with GitHub Actions CI/CD pipelines.",
      "Integrated third-party services: Stripe, Tamara BNPL, SMS providers, AWS S3, and Lambda.",
      "Applied JWT, OAuth 2.0, and RBAC for secure authentication and authorization.",
    ],
  },
  {
    role: "Flutter & Node.js Mobile Developer",
    company: "Personal & Academic Projects",
    location: "Remote",
    period: "2023 – 2025",
    achievements: [
      "Developed cross-platform Flutter applications with Node.js backend APIs.",
      "Implemented WebSocket streams and offline-first caching using SQLite and Hive.",
      "Built native platform channels integrating Dart with Python/C++ inference engines.",
      "Achieved 30 FPS live-feed streaming on Android devices using ONNX Runtime and YOLO models.",
    ],
  },
  {
    role: "Programming Instructor",
    company: "Educational Institute",
    location: "Yemen",
    period: "2023 – 2024",
    achievements: [
      "Taught PHP, Laravel, JavaScript, and Node.js to aspiring developers.",
      "Designed project-based curricula and conducted code reviews.",
      "Focused on Clean Architecture and SOLID principles.",
    ],
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: "web" | "mobile" | "saas" | "api" | "other";
  status: "draft" | "published";
  featured: boolean;
  order: number;
  highlights: string[];
  stats?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    title: "AI-Powered SaaS HR & Recruitment Platform",
    slug: "ai-hr-recruitment-platform",
    description: "Designed and developed a multi-tenant AI-powered SaaS recruitment platform with scalable microservices architecture and real-time communication features.",
    longDescription: "Designed and developed a multi-tenant AI-powered SaaS recruitment platform with scalable microservices architecture and real-time communication features.",
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "BullMQ", "Docker", "Kubernetes", "AWS EC2/S3", "LangChain", "OpenAI API", "GitHub Actions", "Nginx"],
    category: "saas",
    status: "published",
    featured: true,
    order: 1,
    highlights: [
      "Built event-driven microservices using RabbitMQ for asynchronous resume parsing and AI-powered candidate-job matching.",
      "Reduced processing latency by 60%.",
      "Developed role-based dashboards with real-time WebSocket notifications.",
      "Integrated LangChain and OpenAI API to automate 80% of HR-related queries.",
      "Optimized PostgreSQL and MongoDB performance using Prisma, TypeORM, and Redis caching.",
      "Reduced database load by 60% and improved page load speed by 40%.",
      "Deployed the platform using Docker, Kubernetes, AWS EC2, and GitHub Actions CI/CD pipelines."
    ],
  },
  {
    title: "Multi-Tenant SaaS Platform with Full DevOps Pipeline",
    slug: "multi-tenant-saas-devops",
    description: "Developed a scalable SaaS platform with isolated tenant architecture and a complete automated DevOps deployment pipeline.",
    longDescription: "Developed a scalable SaaS platform with isolated tenant architecture and a complete automated DevOps deployment pipeline.",
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "Kubernetes", "GitHub Actions", "Nginx", "AWS EC2/S3/Lambda"],
    category: "saas",
    status: "published",
    featured: true,
    order: 2,
    highlights: [
      "Implemented PostgreSQL tenant schema isolation using Prisma ORM.",
      "Built automated CI/CD pipelines with Docker image builds and Kubernetes rolling deployments.",
      "Configured Nginx load balancing and SSL termination for high availability.",
      "Integrated AWS S3 for file storage and AWS Lambda for serverless scheduled tasks.",
      "Reduced infrastructure costs by approximately 30%.",
      "Used Redis pub/sub and TTL-based cache invalidation to minimize database load."
    ],
  },
  {
    title: "High-Performance Analytics & Reporting Microservice",
    slug: "analytics-reporting-microservice",
    description: "Built a dedicated analytics and reporting microservice capable of aggregating and processing large-scale data from multiple databases without affecting transactional systems.",
    longDescription: "Built a dedicated analytics and reporting microservice capable of aggregating and processing large-scale data from multiple databases without affecting transactional systems.",
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "MySQL", "MongoDB", "Prisma", "TypeORM", "Redis", "BullMQ", "GraphQL", "DataLoader"],
    category: "api",
    status: "published",
    featured: true,
    order: 3,
    highlights: [
      "Implemented real-time analytics using PostgreSQL window functions, CTEs, and materialized views.",
      "Offloaded heavy report generation tasks to BullMQ background workers.",
      "Reduced repeated computations using Redis caching with TTL-based invalidation.",
      "Built optimized GraphQL APIs using DataLoader to solve N+1 query issues.",
      "Supported dynamic reporting with flexible filtering and scalable schema management."
    ],
  },
  {
    title: "RAG-Based Multilingual Information Retrieval System",
    slug: "rag-multilingual-retrieval",
    description: "Developed a multilingual AI-powered retrieval system supporting Arabic and English semantic search using RAG architecture and vector databases.",
    longDescription: "Developed a multilingual AI-powered retrieval system supporting Arabic and English semantic search using RAG architecture and vector databases.",
    techStack: ["LangGraph", "LangChain", "FAISS", "Pinecone", "LLaMA", "Mixtral", "Node.js", "FastAPI", "React", "WebSockets", "Arabic NLP"],
    category: "web",
    status: "published",
    featured: false,
    order: 4,
    highlights: [
      "Built semantic search pipelines using FAISS and Pinecone vector databases.",
      "Implemented LangGraph agentic workflows for retrieval, re-ranking, and generation.",
      "Used LLaMA and Mixtral local inference models for privacy-focused document processing.",
      "Applied Arabic NLP preprocessing and multilingual embedding strategies.",
      "Developed a real-time RTL-compatible React frontend with streaming responses."
    ],
  },
  {
    title: "Live Computer Vision Edge Deployment Dashboard",
    slug: "computer-vision-edge-dashboard",
    description: "Created a real-time computer vision dashboard for object detection on mobile and edge devices using optimized AI models.",
    longDescription: "Created a real-time computer vision dashboard for object detection on mobile and edge devices using optimized AI models.",
    techStack: ["FastAPI", "Node.js", "Flutter", "YOLOv10/v11", "ONNX Runtime", "Docker", "Python", "WebSockets", "SQLite"],
    category: "mobile",
    status: "published",
    featured: false,
    order: 5,
    highlights: [
      "Built cross-platform real-time object detection systems using YOLOv10/v11.",
      "Achieved 30 FPS inference performance on mid-range Android devices.",
      "Used ONNX Runtime for optimized edge AI inference.",
      "Streamed live inference results through WebSockets to Flutter and React dashboards.",
      "Integrated Flutter platform channels with Python/C++ inference engines for minimal latency.",
      "Containerized the full stack using Docker for reproducible deployments."
    ],
  },
];

// ─── Education ──────────────────────────────────────────────────────────────

export interface Education {
  degree: string;
  university: string;
  location: string;
  period: string;
  coursework: string[];
}

export const education: Education = {
  degree: "Bachelor of Science in Information Technology",
  university: "Al Jazeera University",
  location: "Ibb, Yemen",
  period: "2021 – 2025",
  coursework: [
    "Software Engineering",
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures and Algorithms",
    "Computer Networks",
    "Database Systems",
    "Mobile Application Development",
  ],
};

// ─── Certifications ─────────────────────────────────────────────────────────

export interface Certification {
  title: string;
  issuer: string;
  platform?: string;
}

export const certifications: Certification[] = [
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    platform: "Coursera",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Andrew Ng",
    platform: "Coursera",
  },
  {
    title: "Agentic AI: Architectures, Frameworks and Applications",
    issuer: "DeepLearning.AI",
  },
  {
    title: "AI Agents in LangGraph",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Reinforcement Fine-Tuning LLMs with GRPO",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Large Language Models (LLMs)",
    issuer: "Hugging Face",
  },
];

// ─── Languages ──────────────────────────────────────────────────────────────

export const languages = [
  { language: "Arabic", level: "Native" },
  { language: "English", level: "Fluent (Professional Working Proficiency)" },
] as const;

// ─── Focus Areas (for homepage sections) ────────────────────────────────────

export const focusAreas = [
  {
    title: "System Design",
    description:
      "Constructing robust, fault-tolerant microservices architectures using event-driven patterns with RabbitMQ, Kafka, and BullMQ.",
  },
  {
    title: "Backend Engineering",
    description:
      "Building scalable APIs with NestJS, Express.js, GraphQL, and PostgreSQL — optimized for high-throughput production workloads.",
  },
  {
    title: "AI Integration",
    description:
      "Deploying LangChain/LangGraph agentic pipelines, RAG systems, and computer vision models at the edge.",
  },
] as const;

// ─── Expertise Accordion (for homepage) ─────────────────────────────────────

export const expertise = [
  {
    number: "01",
    title: "Backend & Microservices Development",
    content:
      "End-to-end backend development using NestJS, Express.js, and FastAPI. Expertise in event-driven architectures with RabbitMQ, Kafka, and BullMQ. Focus on Clean Architecture, SOLID principles, and Domain-Driven Design.",
  },
  {
    number: "02",
    title: "Cloud Infrastructure & DevOps",
    content:
      "Production deployment on AWS (EC2, S3, Lambda) with Docker and Kubernetes orchestration. Full CI/CD automation using GitHub Actions, Nginx load balancing, and zero-downtime rolling deployments.",
  },
  {
    number: "03",
    title: "AI & Machine Learning Integration",
    content:
      "Building AI-powered services using LangChain, LangGraph, and OpenAI API. RAG systems with FAISS and Pinecone. Computer vision edge deployment with YOLOv10/v11 and ONNX Runtime achieving 30 FPS on mobile.",
  },
  {
    number: "04",
    title: "Database Architecture & Optimization",
    content:
      "Designing polyglot persistence strategies across PostgreSQL, MySQL, MongoDB, and Redis. Advanced query optimization with window functions, CTEs, materialized views, and intelligent caching patterns that reduced DB load by 60%.",
  },
] as const;
