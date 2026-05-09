// src/infrastructure/repositories/MongoProjectRepository.ts
import { BaseMongoRepository } from './BaseMongoRepository'
import { ProjectModel, IProjectDocument } from '../database/models/ProjectModel'
import { ProjectEntity } from '@/domain/entities/Project.entity'
import type { IProjectRepository } from '@/contracts/repositories/IProjectRepository'

export class MongoProjectRepository
  extends BaseMongoRepository<ProjectEntity, IProjectDocument>
  implements IProjectRepository
{
  constructor() {
    super(ProjectModel)
  }

  protected toEntity(doc: IProjectDocument): ProjectEntity {
    return ProjectEntity.fromJSON({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      techStack: doc.techStack,
      status: doc.status,
      featured: doc.featured,
      category: doc.category,
      liveUrl: doc.liveUrl,
      githubUrl: doc.githubUrl,
      order: doc.order,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })
  }

  protected toDocument(entity: ProjectEntity): Partial<IProjectDocument> {
    return {
      title: entity.title,
      slug: entity.slug,
      description: entity.description,
      techStack: entity.techStack,
      status: entity.status,
      featured: entity.featured,
      category: entity.category,
      liveUrl: entity.liveUrl ?? undefined,
      githubUrl: entity.githubUrl ?? undefined,
      order: entity.order,
    }
  }

  async findBySlug(slug: string): Promise<ProjectEntity | null> {
    try {
      await this.connect()
      // Explicitly check for string to prevent NoSQL injection object attacks
      if (typeof slug !== 'string') return null
      
      const doc = await ProjectModel.findOne({ slug, status: 'published' }).lean()
      return doc ? this.toEntity(doc as IProjectDocument) : null
    } catch (error) {
      console.error('Error in findBySlug, falling back to static data:', error)
      try {
        const { projects: staticProjects } = require('@/lib/data/portfolio-data')
        const p = staticProjects.find((proj: any) => proj.slug === slug && proj.status === 'published')
        if (!p) return null
        
        return ProjectEntity.fromJSON({
          id: '000000000000000000000001',
          title: p.title,
          slug: p.slug,
          description: p.description,
          techStack: p.techStack,
          status: p.status,
          featured: p.featured,
          category: p.category,
          liveUrl: null,
          githubUrl: null,
          order: p.order,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      } catch (fallbackError) {
        return null
      }
    }
  }

  async findPublished(options?: { category?: string; featured?: boolean }): Promise<ProjectEntity[]> {
    try {
      await this.connect()
      const filter: any = { status: 'published' }
      
      if (options?.category && typeof options.category === 'string') {
        filter.category = options.category
      }
      
      if (options?.featured !== undefined) {
        filter.featured = !!options.featured
      }

      const docs = await ProjectModel.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .lean()
      return (docs as IProjectDocument[]).map(d => this.toEntity(d))
    } catch (error) {
      console.error('Error in findPublished, falling back to static data:', error)
      
      // Fallback to static data from portfolio-data.ts
      try {
        const { projects: staticProjects } = require('@/lib/data/portfolio-data')
        return staticProjects
          .filter((p: any) => p.status === 'published')
          .filter((p: any) => !options?.category || p.category === options.category)
          .filter((p: any) => options?.featured === undefined || p.featured === options.featured)
          .map((p: any, idx: number) => {
            // Generate a valid 24-character hex ID for fallback
            const hexId = (idx + 1).toString(16).padStart(24, '0')
            
            return ProjectEntity.fromJSON({
              id: hexId,
              title: p.title,
              slug: p.slug,
              description: p.description,
              techStack: p.techStack,
              status: p.status,
              featured: p.featured,
              category: p.category,
              liveUrl: null,
              githubUrl: null,
              order: p.order,
              createdAt: new Date(),
              updatedAt: new Date()
            })
          })
      } catch (fallbackError) {
        console.error('Fallback failed:', fallbackError)
        return []
      }
    }
  }

  async ensureUniqueSlug(baseSlug: string): Promise<string> {
    await this.connect()
    let slug = baseSlug
    let counter = 2
    while (await ProjectModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
    return slug
  }
}

