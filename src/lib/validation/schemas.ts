import { z } from "zod";

// --- Common Schemas ---
export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

// --- Inquiry Schemas ---
export const InquiryStatusSchema = z.enum(["new", "read", "replied"]);

export const InquiryCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  budget: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export const InquirySchema = InquiryCreateSchema.extend({
  id: z.string().uuid().or(ObjectIdSchema),
  status: InquiryStatusSchema.default("new"),
  createdAt: z.date().or(z.string().transform((val) => new Date(val))),
});

// --- Project Schemas ---
export const ProjectCategorySchema = z.enum(["web", "mobile", "saas", "api", "other"]);
export const ProjectStatusSchema = z.enum(["draft", "published"]);

export const ProjectImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
  alt: z.string(),
});

export const ProjectCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().min(10).max(500),
  longDescription: z.string().optional(),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  category: ProjectCategorySchema,
  status: ProjectStatusSchema.default("draft"),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  liveUrl: z.string().url().nullable().optional(),
  githubUrl: z.string().url().nullable().optional(),
});

export const ProjectSchema = ProjectCreateSchema.extend({
  id: z.string().uuid().or(ObjectIdSchema),
  createdAt: z.date().or(z.string().transform((val) => new Date(val))),
  updatedAt: z.date().or(z.string().transform((val) => new Date(val))),
});
