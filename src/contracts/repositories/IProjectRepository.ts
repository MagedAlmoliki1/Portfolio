// src/contracts/repositories/IProjectRepository.ts
import { ProjectEntity } from '@/domain/entities/Project.entity'
import { IReadRepository } from './base/IReadRepository'
import { IWriteRepository } from './base/IWriteRepository'
import { ISlugRepository } from './base/ISlugRepository'

export interface IProjectRepository
  extends IReadRepository<ProjectEntity>,
          IWriteRepository<ProjectEntity>,
          ISlugRepository {
  findPublished(options?: { category?: string; featured?: boolean }): Promise<ProjectEntity[]>
}
