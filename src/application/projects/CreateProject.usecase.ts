// src/application/projects/CreateProject.usecase.ts
// Responsibility: Handle ONLY the create project operation
// Each use case class has exactly ONE public method: execute()

import type { IProjectRepository } from '@/contracts/repositories/IProjectRepository'
import type { IStorageService } from '@/contracts/services/IStorageService'
import type { ISlugService } from '@/contracts/services/ISlugService'
import { ProjectEntity } from '@/domain/entities/Project.entity'

export interface CreateProjectInput {
  title: string
  description: string
  techStack: string[]
  category: string
  liveUrl?: string
  githubUrl?: string
  imageFile?: Buffer
  imageName?: string
  featured?: boolean
  status?: 'draft' | 'published'
}

export interface CreateProjectOutput {
  project: ProjectEntity
}

export class CreateProjectUseCase {
  constructor(
    private readonly projectRepo: IProjectRepository,
    private readonly storageService: IStorageService,
    private readonly slugService: ISlugService,
  ) {}

  async execute(input: CreateProjectInput): Promise<CreateProjectOutput> {
    // 1. Generate unique slug
    const baseSlug = await this.slugService.generate(input.title)
    const uniqueSlug = await this.projectRepo.ensureUniqueSlug(baseSlug)

    // 2. Upload image if provided (future implementation)
    // For now, we skip image upload in this basic logic or handle it via service
    
    // 3. Create domain entity (validates business rules)
    const project = ProjectEntity.create({
      title: input.title,
      slug: uniqueSlug,
      description: input.description,
      techStack: input.techStack,
      category: input.category,
      liveUrl: input.liveUrl,
      githubUrl: input.githubUrl,
      featured: input.featured ?? false,
      status: input.status ?? 'draft',
    })

    // 4. Persist
    const saved = await this.projectRepo.save(project)

    return { project: saved }
  }
}
