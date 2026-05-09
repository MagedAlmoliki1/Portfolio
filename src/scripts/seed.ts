import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { ProjectModel } from "../infrastructure/database/models/ProjectModel";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// ─── Real project data from CV ──────────────────────────────────────────────

const projects = [
  {
    title: "AI-Powered SaaS HR & Recruitment Platform",
    slug: "ai-hr-recruitment-platform",
    description:
      "A multi-tenant SaaS recruitment platform with AI-powered resume parsing, candidate matching, and automated HR chatbot — reducing DB load by 60% and page load time by 40%.",
    techStack: [
      "NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Redis",
      "RabbitMQ", "BullMQ", "Docker", "Kubernetes", "AWS",
      "LangChain", "OpenAI API",
    ],
    status: "published",
    featured: true,
    category: "saas",
    order: 1,
    stats: [
      { label: "HR Automation", value: "80%" },
      { label: "Matching Accuracy", value: "85%" },
      { label: "DB Load Reduction", value: "60%" },
    ],
  },
  {
    title: "Multi-Tenant SaaS Platform with Full DevOps Pipeline",
    slug: "multi-tenant-saas-devops",
    description:
      "Enterprise-grade multi-tenant SaaS platform with PostgreSQL schema isolation, Kubernetes rolling deployments, and Nginx load balancing — reducing infrastructure costs by 30%.",
    techStack: [
      "PostgreSQL", "Kubernetes", "Nginx", "AWS S3",
      "AWS Lambda", "Docker", "GitHub Actions", "NestJS",
    ],
    status: "published",
    featured: true,
    category: "saas",
    order: 2,
    stats: [
      { label: "Cost Reduction", value: "~30%" },
      { label: "Deployment", value: "Zero-Downtime" },
      { label: "Architecture", value: "Multi-Tenant" },
    ],
  },
  {
    title: "High-Performance Analytics & Reporting Microservice",
    slug: "analytics-reporting-microservice",
    description:
      "A polyglot-persistence analytics service aggregating data from PostgreSQL, MySQL, and MongoDB with GraphQL APIs and BullMQ workers for dynamic report generation.",
    techStack: [
      "PostgreSQL", "MySQL", "MongoDB", "BullMQ",
      "GraphQL", "DataLoader", "NestJS", "TypeScript",
    ],
    status: "published",
    featured: true,
    category: "api",
    order: 3,
    stats: [
      { label: "Data Sources", value: "3 DBs" },
      { label: "Query Type", value: "Real-Time" },
      { label: "API Layer", value: "GraphQL" },
    ],
  },
  {
    title: "RAG-Based Multilingual Information Retrieval System",
    slug: "rag-multilingual-retrieval",
    description:
      "A semantic search system supporting Arabic and English using FAISS, Pinecone, and LangGraph agentic pipelines with LLaMA and Mixtral for local inference.",
    techStack: [
      "FAISS", "Pinecone", "LangGraph", "LLaMA",
      "Mixtral", "React", "Arabic NLP", "Python", "FastAPI",
    ],
    status: "published",
    featured: false,
    category: "web",
    order: 4,
    stats: [
      { label: "Languages", value: "AR + EN" },
      { label: "Search Type", value: "Semantic" },
      { label: "Inference", value: "Local LLM" },
    ],
  },
  {
    title: "Live Computer Vision Edge Deployment Dashboard",
    slug: "computer-vision-edge-dashboard",
    description:
      "A real-time object detection system using YOLOv10/v11 and ONNX Runtime achieving 30 FPS inference on Android devices with a Flutter UI and FastAPI backend.",
    techStack: [
      "YOLOv10/v11", "ONNX Runtime", "FastAPI",
      "Flutter", "WebSockets", "Docker", "Python", "C++",
    ],
    status: "published",
    featured: false,
    category: "mobile",
    order: 5,
    stats: [
      { label: "FPS", value: "30" },
      { label: "Models", value: "YOLOv10/v11" },
      { label: "Platform", value: "Mobile Edge" },
    ],
  },
];

// ─── Seed Runner ────────────────────────────────────────────────────────────

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  // Safety check: refuse to run in production
  if (process.env.NODE_ENV === "production") {
    console.error("❌ Refusing to seed in production environment!");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing projects
    await ProjectModel.deleteMany({});
    console.log("🗑️  Cleared existing projects");

    // Insert new projects
    await ProjectModel.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
