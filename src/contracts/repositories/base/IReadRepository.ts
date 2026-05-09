// src/contracts/repositories/base/IReadRepository.ts
import { PaginationOptions, PaginatedResult } from './IPagination'

export interface IReadRepository<TEntity> {
  findById(id: string): Promise<TEntity | null>
  findAll(filter?: unknown, options?: PaginationOptions): Promise<PaginatedResult<TEntity>>
}
