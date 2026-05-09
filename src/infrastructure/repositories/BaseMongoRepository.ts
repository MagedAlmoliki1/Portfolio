// src/infrastructure/repositories/BaseMongoRepository.ts
import mongoose, { Model, Document } from 'mongoose'
import { connectDB } from '@/infrastructure/database/connection'
import { PaginationOptions, PaginatedResult } from '@/contracts/repositories/base/IPagination'

export abstract class BaseMongoRepository<TEntity, TDocument extends Document> {
  constructor(protected readonly model: Model<TDocument>) {}

  protected async connect(): Promise<void> {
    await connectDB()
  }

  protected abstract toEntity(doc: TDocument): TEntity
  protected abstract toDocument(entity: TEntity): Partial<TDocument>

  async findById(id: string): Promise<TEntity | null> {
    try {
      await this.connect()
      const doc = await this.model.findById(id).lean()
      return doc ? this.toEntity(doc as TDocument) : null
    } catch (error) {
      console.error(`Error in findById for ${this.model.modelName}:`, error)
      return null
    }
  }

  async findAll(
    filter: Record<string, any> = {},
    options?: PaginationOptions & { sort?: Record<string, 1 | -1> }
  ): Promise<PaginatedResult<TEntity>> {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 10
    const skip = (page - 1) * limit
    const sort = options?.sort ?? { createdAt: -1 }

    try {
      await this.connect()
      const [docs, total] = await Promise.all([
        this.model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        this.model.countDocuments(filter),
      ])

      return {
        data: (docs as TDocument[]).map(d => this.toEntity(d)),
        total,
        page,
        limit,
        hasMore: skip + docs.length < total,
      }
    } catch (error) {
      console.error(`Error in findAll for ${this.model.modelName}:`, error)
      return { data: [], total: 0, page, limit, hasMore: false }
    }
  }

  async save(entity: TEntity): Promise<TEntity> {
    try {
      await this.connect()
      const doc = new this.model(this.toDocument(entity))
      const saved = await doc.save()
      return this.toEntity(saved as TDocument)
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error(`Duplicate key error: ${Object.keys(error.keyPattern).join(', ')} already exists`)
      }
      console.error(`Error in save for ${this.model.modelName}:`, error)
      throw error
    }
  }

  async update(id: string, update: Record<string, any>): Promise<TEntity | null> {
    // Basic sanitization: Prevent arbitrary $ operators if passed as raw object
    // (In a strictly typed repository, the 'update' param should be well-defined)
    
    try {
      await this.connect()
      const updated = await this.model
        .findByIdAndUpdate(id, update, { new: true, runValidators: true })
        .lean()
      return updated ? this.toEntity(updated as TDocument) : null
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Update failed: Unique constraint violation')
      }
      console.error(`Error in update for ${this.model.modelName}:`, error)
      throw error
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.connect()
      const result = await this.model.findByIdAndDelete(id)
      return result !== null
    } catch (error) {
      console.error(`Error in delete for ${this.model.modelName}:`, error)
      return false
    }
  }
}

