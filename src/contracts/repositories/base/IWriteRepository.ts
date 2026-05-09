// src/contracts/repositories/base/IWriteRepository.ts
export interface IWriteRepository<TEntity> {
  save(entity: TEntity): Promise<TEntity>
  update(id: string, data: Partial<TEntity>): Promise<TEntity | null>
  delete(id: string): Promise<boolean>
}
