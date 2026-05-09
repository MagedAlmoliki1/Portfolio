// src/contracts/repositories/base/ISlugRepository.ts
export interface ISlugRepository {
  findBySlug(slug: string): Promise<any | null>
  ensureUniqueSlug(baseSlug: string): Promise<string>
}
