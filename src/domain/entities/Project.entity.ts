import { ProjectSchema, ProjectCreateSchema } from "@/lib/validation/schemas";
import { z } from "zod";

export type ProjectProps = z.infer<typeof ProjectSchema>;
export type CreateProjectProps = z.infer<typeof ProjectCreateSchema>;

export class ProjectEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly techStack: string[],
    public readonly status: 'draft' | 'published',
    public readonly featured: boolean,
    public readonly category: 'web' | 'mobile' | 'saas' | 'api' | 'other',
    public readonly liveUrl: string | null,
    public readonly githubUrl: string | null,
    public readonly order: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  isPublished(): boolean {
    return this.status === 'published'
  }

  isFeatured(): boolean {
    return this.featured && this.isPublished()
  }

  hasLiveDemo(): boolean {
    return this.liveUrl !== null && this.liveUrl.length > 0
  }

  hasTechnology(tech: string): boolean {
    return this.techStack
      .map(t => t.toLowerCase())
      .includes(tech.toLowerCase())
  }

  static create(props: any): ProjectEntity {
    // Validate input using Zod
    const validated = ProjectSchema.partial({ 
      id: true, 
      createdAt: true, 
      updatedAt: true 
    }).parse(props);

    return new ProjectEntity(
      validated.id ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7)),
      validated.title,
      validated.slug,
      validated.description,
      validated.techStack,
      validated.status ?? 'draft',
      validated.featured ?? false,
      validated.category,
      validated.liveUrl ?? null,
      validated.githubUrl ?? null,
      validated.order ?? 0,
      validated.createdAt instanceof Date ? validated.createdAt : new Date(),
      validated.updatedAt instanceof Date ? validated.updatedAt : new Date(),
    )
  }

  static fromJSON(json: any): ProjectEntity {
    const validated = ProjectSchema.parse(json);
    return new ProjectEntity(
      validated.id,
      validated.title,
      validated.slug,
      validated.description,
      validated.techStack,
      validated.status,
      validated.featured,
      validated.category,
      validated.liveUrl ?? null,
      validated.githubUrl ?? null,
      validated.order,
      validated.createdAt instanceof Date ? validated.createdAt : new Date(validated.createdAt),
      validated.updatedAt instanceof Date ? validated.updatedAt : new Date(validated.updatedAt),
    )
  }
}

