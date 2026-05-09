# 🏗️ SOLID Architecture Prompt
## Personal Developer Portfolio — Next.js 14 + MongoDB Atlas + TypeScript

> **المعمارية:** SOLID Principles تُطبَّق بالكامل على كل طبقة  
> **Stack:** Next.js 14 App Router · TypeScript Strict · Mongoose · Repository Pattern · Service Layer  
> **المبدأ:** كل ملف له سبب واحد للتغيير، وكل طبقة تعرف فقط ما تحتاجه

---

## 📐 SOLID — تعريف سريع قبل الكود

```
S — Single Responsibility  : كل class/function لها مهمة واحدة فقط
O — Open/Closed            : مفتوح للتوسع، مغلق للتعديل
L — Liskov Substitution    : الـ subclass تحل محل الـ base class بأمان
I — Interface Segregation  : لا تُجبر class على implement واجهات لا تحتاجها
D — Dependency Inversion   : اعتمد على abstractions لا على implementations
```

---

## 📦 PROMPT 1 — هيكل المجلدات SOLID

```
Restructure the Next.js 14 portfolio project to follow strict SOLID principles.
Use this folder structure — every layer has ONE responsibility:

portfolio/
├── app/                          ← Presentation Layer ONLY (routing + UI)
│   ├── (public)/
│   ├── (admin)/
│   └── api/                      ← HTTP Controllers ONLY (thin — no business logic)
│
├── src/
│   ├── domain/                   ← [S] Core business entities & rules (no framework deps)
│   │   ├── entities/
│   │   │   ├── Project.entity.ts
│   │   │   ├── Certificate.entity.ts
│   │   │   ├── Experience.entity.ts
│   │   │   ├── BlogPost.entity.ts
│   │   │   ├── Message.entity.ts
│   │   │   └── Skill.entity.ts
│   │   └── value-objects/
│   │       ├── Email.vo.ts
│   │       ├── Slug.vo.ts
│   │       └── ImageAsset.vo.ts
│   │
│   ├── application/              ← [S][O] Use Cases — one file per use case
│   │   ├── projects/
│   │   │   ├── GetAllProjects.usecase.ts
│   │   │   ├── GetProjectBySlug.usecase.ts
│   │   │   ├── CreateProject.usecase.ts
│   │   │   ├── UpdateProject.usecase.ts
│   │   │   └── DeleteProject.usecase.ts
│   │   ├── certificates/
│   │   │   ├── GetAllCertificates.usecase.ts
│   │   │   ├── CreateCertificate.usecase.ts
│   │   │   ├── UpdateCertificate.usecase.ts
│   │   │   └── DeleteCertificate.usecase.ts
│   │   ├── experience/
│   │   │   ├── GetAllExperience.usecase.ts
│   │   │   ├── CreateExperience.usecase.ts
│   │   │   ├── UpdateExperience.usecase.ts
│   │   │   └── DeleteExperience.usecase.ts
│   │   ├── blog/
│   │   │   ├── GetAllPosts.usecase.ts
│   │   │   ├── GetPostBySlug.usecase.ts
│   │   │   ├── CreatePost.usecase.ts
│   │   │   ├── UpdatePost.usecase.ts
│   │   │   └── DeletePost.usecase.ts
│   │   ├── contact/
│   │   │   └── SendContactMessage.usecase.ts
│   │   └── analytics/
│   │       ├── TrackPageView.usecase.ts
│   │       └── GetAnalyticsSummary.usecase.ts
│   │
│   ├── contracts/                ← [D][I] Abstractions — interfaces only, no implementations
│   │   ├── repositories/
│   │   │   ├── IProjectRepository.ts
│   │   │   ├── ICertificateRepository.ts
│   │   │   ├── IExperienceRepository.ts
│   │   │   ├── IBlogRepository.ts
│   │   │   ├── IMessageRepository.ts
│   │   │   ├── ISkillRepository.ts
│   │   │   └── IAnalyticsRepository.ts
│   │   └── services/
│   │       ├── IEmailService.ts
│   │       ├── IStorageService.ts
│   │       ├── ISlugService.ts
│   │       └── ICacheService.ts
│   │
│   ├── infrastructure/           ← [D] Concrete implementations of contracts
│   │   ├── repositories/
│   │   │   ├── MongoProjectRepository.ts
│   │   │   ├── MongoCertificateRepository.ts
│   │   │   ├── MongoExperienceRepository.ts
│   │   │   ├── MongoBlogRepository.ts
│   │   │   ├── MongoMessageRepository.ts
│   │   │   ├── MongoSkillRepository.ts
│   │   │   └── MongoAnalyticsRepository.ts
│   │   ├── services/
│   │   │   ├── NodemailerEmailService.ts
│   │   │   ├── CloudinaryStorageService.ts
│   │   │   ├── SlugifySlugService.ts
│   │   │   └── InMemoryCacheService.ts
│   │   └── database/
│   │       ├── connection.ts
│   │       └── models/
│   │           ├── ProjectModel.ts
│   │           ├── CertificateModel.ts
│   │           ├── ExperienceModel.ts
│   │           ├── BlogPostModel.ts
│   │           ├── MessageModel.ts
│   │           ├── SkillModel.ts
│   │           └── AnalyticsModel.ts
│   │
│   └── container/                ← [D] Dependency Injection Container
│       └── container.ts          ← Wires everything together
│
└── lib/
    ├── validations/              ← Zod schemas (presentation validation only)
    └── utils/                    ← Pure utility functions (no side effects)

RULE: app/api routes import ONLY from src/application (use cases).
      Use cases import ONLY from src/contracts (interfaces).
      Infrastructure implements contracts — never imported by use cases directly.
      Domain has ZERO imports from any framework or library.
```

---

## 📦 PROMPT 2 — S: Single Responsibility Principle

```
Apply Single Responsibility Principle throughout the project.
Each class/module has ONE reason to change.

─────────────────────────────────────────────
[S] Domain Entities — pure data + business rules ONLY
─────────────────────────────────────────────

// src/domain/entities/Project.entity.ts
// Responsibility: Define what a Project IS and its business rules
// NO database logic, NO HTTP logic, NO framework imports

export class ProjectEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly techStack: string[],
    public readonly status: 'draft' | 'published',
    public readonly featured: boolean,
    public readonly category: ProjectCategory,
    public readonly liveUrl: string | null,
    public readonly githubUrl: string | null,
    public readonly order: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // Business rules belong HERE — not in services or controllers
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

  // Factory method — controls how entities are created
  static create(props: CreateProjectProps): ProjectEntity {
    if (!props.title || props.title.trim().length < 3) {
      throw new Error('Project title must be at least 3 characters')
    }
    if (props.techStack.length === 0) {
      throw new Error('Project must have at least one technology')
    }
    return new ProjectEntity(
      props.id ?? crypto.randomUUID(),
      props.title.trim(),
      props.slug,
      props.description.trim(),
      props.techStack,
      props.status ?? 'draft',
      props.featured ?? false,
      props.category,
      props.liveUrl ?? null,
      props.githubUrl ?? null,
      props.order ?? 0,
      props.createdAt ?? new Date(),
      props.updatedAt ?? new Date(),
    )
  }
}

export type ProjectCategory = 'web' | 'mobile' | 'saas' | 'api' | 'other'
export type CreateProjectProps = Omit<
  ConstructorParameters<typeof ProjectEntity>[0],
  never
> & { id?: string; createdAt?: Date; updatedAt?: Date }

─────────────────────────────────────────────
[S] Value Objects — immutable, self-validating types
─────────────────────────────────────────────

// src/domain/value-objects/Email.vo.ts
// Responsibility: Represent and validate an email address
export class Email {
  private readonly _value: string

  constructor(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new Error(`Invalid email address: ${value}`)
    }
    this._value = value.toLowerCase().trim()
  }

  get value(): string { return this._value }
  toString(): string { return this._value }
  equals(other: Email): boolean { return this._value === other._value }
}

// src/domain/value-objects/Slug.vo.ts
// Responsibility: Represent and validate a URL slug
export class Slug {
  private readonly _value: string

  constructor(value: string) {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(value)) {
      throw new Error(`Invalid slug format: ${value}`)
    }
    if (value.length > 100) {
      throw new Error('Slug must be 100 characters or less')
    }
    this._value = value
  }

  get value(): string { return this._value }
  toString(): string { return this._value }

  static fromTitle(title: string): Slug {
    const raw = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 100)
    return new Slug(raw)
  }
}

// src/domain/value-objects/ImageAsset.vo.ts
// Responsibility: Represent a stored image with its metadata
export class ImageAsset {
  constructor(
    public readonly url: string,
    public readonly publicId: string,
    public readonly alt: string,
    public readonly width?: number,
    public readonly height?: number,
  ) {
    if (!url.startsWith('https://')) {
      throw new Error('Image URL must be HTTPS')
    }
  }

  get isCloudinary(): boolean {
    return this.publicId.length > 0
  }
}

─────────────────────────────────────────────
[S] Use Cases — ONE use case per file
─────────────────────────────────────────────

// src/application/projects/CreateProject.usecase.ts
// Responsibility: Handle ONLY the create project operation
// Each use case class has exactly ONE public method: execute()

import type { IProjectRepository } from '@/src/contracts/repositories/IProjectRepository'
import type { IStorageService } from '@/src/contracts/services/IStorageService'
import type { ISlugService } from '@/src/contracts/services/ISlugService'
import { ProjectEntity } from '@/src/domain/entities/Project.entity'

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

    // 2. Upload image if provided
    let imageAsset = null
    if (input.imageFile && input.imageName) {
      imageAsset = await this.storageService.upload(
        input.imageFile,
        { folder: 'portfolio/projects', filename: input.imageName }
      )
    }

    // 3. Create domain entity (validates business rules)
    const project = ProjectEntity.create({
      title: input.title,
      slug: uniqueSlug,
      description: input.description,
      techStack: input.techStack,
      category: input.category as any,
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
```

---

## 📦 PROMPT 3 — O: Open/Closed Principle

```
Apply Open/Closed Principle — classes are open for extension, closed for modification.
New features are added by adding new classes, NOT by editing existing ones.

─────────────────────────────────────────────
[O] Base Repository — extend without modifying
─────────────────────────────────────────────

// src/infrastructure/repositories/BaseMongoRepository.ts
// Responsibility: Common CRUD operations reusable by all repositories
// Adding a new repository = extend this, never edit it

import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose'
import { connectDB } from '@/src/infrastructure/database/connection'

export interface PaginationOptions {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export abstract class BaseMongoRepository<TEntity, TDocument extends Document> {
  constructor(protected readonly model: Model<TDocument>) {}

  protected async connect(): Promise<void> {
    await connectDB()
  }

  // Subclasses MUST implement these two mapping methods
  protected abstract toEntity(doc: TDocument): TEntity
  protected abstract toDocument(entity: TEntity): Partial<TDocument>

  async findById(id: string): Promise<TEntity | null> {
    await this.connect()
    const doc = await this.model.findById(id).lean()
    return doc ? this.toEntity(doc as TDocument) : null
  }

  async findAll(
    filter: FilterQuery<TDocument> = {},
    options?: PaginationOptions & { sort?: Record<string, 1 | -1> }
  ): Promise<PaginatedResult<TEntity>> {
    await this.connect()
    const page = options?.page ?? 1
    const limit = options?.limit ?? 10
    const skip = (page - 1) * limit
    const sort = options?.sort ?? { createdAt: -1 }

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
  }

  async save(entity: TEntity): Promise<TEntity> {
    await this.connect()
    const doc = new this.model(this.toDocument(entity))
    const saved = await doc.save()
    return this.toEntity(saved as TDocument)
  }

  async update(id: string, update: UpdateQuery<TDocument>): Promise<TEntity | null> {
    await this.connect()
    const updated = await this.model
      .findByIdAndUpdate(id, update, { new: true, runValidators: true })
      .lean()
    return updated ? this.toEntity(updated as TDocument) : null
  }

  async delete(id: string): Promise<boolean> {
    await this.connect()
    const result = await this.model.findByIdAndDelete(id)
    return result !== null
  }
}

─────────────────────────────────────────────
[O] Concrete Repository — extends base, adds specific methods
─────────────────────────────────────────────

// src/infrastructure/repositories/MongoProjectRepository.ts
// EXTENDS base — never modifies it
// Only adds project-specific queries

import { BaseMongoRepository } from './BaseMongoRepository'
import { ProjectModel, IProjectDocument } from '../database/models/ProjectModel'
import { ProjectEntity } from '@/src/domain/entities/Project.entity'
import type { IProjectRepository } from '@/src/contracts/repositories/IProjectRepository'

export class MongoProjectRepository
  extends BaseMongoRepository<ProjectEntity, IProjectDocument>
  implements IProjectRepository
{
  constructor() {
    super(ProjectModel)
  }

  // Map database document → domain entity
  protected toEntity(doc: IProjectDocument): ProjectEntity {
    return ProjectEntity.create({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      techStack: doc.techStack,
      status: doc.status,
      featured: doc.featured,
      category: doc.category,
      liveUrl: doc.liveUrl ?? null,
      githubUrl: doc.githubUrl ?? null,
      order: doc.order,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })
  }

  // Map domain entity → database document
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

  // Project-specific methods (not in base)
  async findBySlug(slug: string): Promise<ProjectEntity | null> {
    await this.connect()
    const doc = await ProjectModel.findOne({ slug, status: 'published' }).lean()
    return doc ? this.toEntity(doc as IProjectDocument) : null
  }

  async findPublished(options?: { category?: string; featured?: boolean }): Promise<ProjectEntity[]> {
    await this.connect()
    const filter: any = { status: 'published' }
    if (options?.category) filter.category = options.category
    if (options?.featured !== undefined) filter.featured = options.featured

    const docs = await ProjectModel.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean()
    return (docs as IProjectDocument[]).map(d => this.toEntity(d))
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

─────────────────────────────────────────────
[O] Email Service — extensible without modification
─────────────────────────────────────────────

// Adding a new email provider = add new class, don't touch existing one

// src/infrastructure/services/NodemailerEmailService.ts
export class NodemailerEmailService implements IEmailService {
  async sendContactNotification(message: ContactMessage): Promise<void> {
    // Nodemailer implementation
  }
  async sendAutoReply(to: string, name: string): Promise<void> {
    // Nodemailer implementation
  }
}

// If you want to add SendGrid later — NEW class, same interface:
// src/infrastructure/services/SendGridEmailService.ts
export class SendGridEmailService implements IEmailService {
  async sendContactNotification(message: ContactMessage): Promise<void> {
    // SendGrid implementation
  }
  async sendAutoReply(to: string, name: string): Promise<void> {
    // SendGrid implementation
  }
}
// Swap in container.ts — zero changes to use cases or controllers
```

---

## 📦 PROMPT 4 — L: Liskov Substitution Principle

```
Apply Liskov Substitution Principle.
Any implementation of an interface must be fully substitutable without breaking behavior.

─────────────────────────────────────────────
[L] Storage Service — substitutable implementations
─────────────────────────────────────────────

// src/contracts/services/IStorageService.ts
// This contract is the "promise" every storage implementation must keep

export interface UploadOptions {
  folder: string
  filename?: string
  maxWidth?: number
  tags?: string[]
}

export interface UploadResult {
  url: string             // Always HTTPS
  publicId: string        // Always non-empty for deletion
  width: number           // Always > 0
  height: number          // Always > 0
  format: string          // Always a valid image format
  bytes: number           // Always > 0
}

export interface IStorageService {
  upload(file: Buffer, options: UploadOptions): Promise<UploadResult>
  delete(publicId: string): Promise<void>
  getOptimizedUrl(publicId: string, preset: 'thumbnail' | 'card' | 'hero'): string
}

// Cloudinary Implementation — must honor ALL contract promises above
// src/infrastructure/services/CloudinaryStorageService.ts
export class CloudinaryStorageService implements IStorageService {
  async upload(file: Buffer, options: UploadOptions): Promise<UploadResult> {
    // Must return: url (HTTPS), non-empty publicId, positive dimensions
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
          { width: options.maxWidth ?? 1200, crop: 'limit' },
        ],
      },
      (error, result) => { if (error) throw error; return result }
    )
    return {
      url: result.secure_url,        // always HTTPS ✓
      publicId: result.public_id,    // always set ✓
      width: result.width,           // always > 0 ✓
      height: result.height,         // always > 0 ✓
      format: result.format,         // always set ✓
      bytes: result.bytes,           // always > 0 ✓
    }
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId, { invalidate: true })
  }

  getOptimizedUrl(publicId: string, preset: 'thumbnail' | 'card' | 'hero'): string {
    const widths = { thumbnail: 400, card: 800, hero: 1200 }
    return cloudinary.url(publicId, {
      width: widths[preset], quality: 'auto', fetch_format: 'auto', crop: 'limit',
    })
  }
}

// Local Storage Implementation (for testing / dev)
// Can substitute CloudinaryStorageService ANYWHERE — same behavior guaranteed
// src/infrastructure/services/LocalStorageService.ts
export class LocalStorageService implements IStorageService {
  async upload(file: Buffer, options: UploadOptions): Promise<UploadResult> {
    const filename = `${Date.now()}-${options.filename ?? 'upload'}.jpg`
    const filepath = path.join(process.cwd(), 'public/uploads', filename)
    await fs.writeFile(filepath, file)
    const dimensions = await sizeOf(file)
    return {
      url: `https://yourdomain.com/uploads/${filename}`,  // HTTPS ✓
      publicId: filename,                                  // non-empty ✓
      width: dimensions.width ?? 0,
      height: dimensions.height ?? 0,
      format: 'jpg',
      bytes: file.length,
    }
  }

  async delete(publicId: string): Promise<void> {
    const filepath = path.join(process.cwd(), 'public/uploads', publicId)
    await fs.unlink(filepath).catch(() => {})
  }

  getOptimizedUrl(publicId: string, preset: 'thumbnail' | 'card' | 'hero'): string {
    return `https://yourdomain.com/uploads/${publicId}`
  }
}
```

---

## 📦 PROMPT 5 — I: Interface Segregation Principle

```
Apply Interface Segregation — split large interfaces into small focused ones.
Clients implement ONLY what they need — no empty or throw-not-implemented methods.

─────────────────────────────────────────────
[I] Repository Interfaces — segregated by capability
─────────────────────────────────────────────

// src/contracts/repositories/base/IReadRepository.ts
// For read-only data consumers
export interface IReadRepository<TEntity> {
  findById(id: string): Promise<TEntity | null>
  findAll(filter?: unknown, options?: PaginationOptions): Promise<PaginatedResult<TEntity>>
}

// src/contracts/repositories/base/IWriteRepository.ts
// For write operations only
export interface IWriteRepository<TEntity> {
  save(entity: TEntity): Promise<TEntity>
  update(id: string, data: Partial<TEntity>): Promise<TEntity | null>
  delete(id: string): Promise<boolean>
}

// src/contracts/repositories/base/ISlugRepository.ts
// Only for entities that have slugs
export interface ISlugRepository {
  findBySlug(slug: string): Promise<unknown | null>
  ensureUniqueSlug(baseSlug: string): Promise<string>
}

// src/contracts/repositories/IProjectRepository.ts
// Project needs all three capabilities
export interface IProjectRepository
  extends IReadRepository<ProjectEntity>,
          IWriteRepository<ProjectEntity>,
          ISlugRepository {
  findPublished(options?: { category?: string; featured?: boolean }): Promise<ProjectEntity[]>
}

// src/contracts/repositories/IAnalyticsRepository.ts
// Analytics only needs specific write + read — NOT slug capability
export interface IAnalyticsRepository {
  trackView(page: string, date: Date): Promise<void>
  getTopPages(limit: number): Promise<{ page: string; views: number }[]>
  getDailyViews(days: number): Promise<{ date: string; views: number }[]>
  getTotalViews(): Promise<number>
}

// src/contracts/repositories/IMessageRepository.ts
// Messages are write-heavy from public, read-heavy from admin
export interface IMessageRepository
  extends IWriteRepository<MessageEntity> {
  findUnread(): Promise<MessageEntity[]>
  markAsRead(id: string): Promise<void>
  markAsReplied(id: string): Promise<void>
  getUnreadCount(): Promise<number>
}

─────────────────────────────────────────────
[I] Email Service — split by responsibility
─────────────────────────────────────────────

// DON'T do this — one fat interface forces all implementations
// to implement everything even if unused:
// ❌ interface IEmailService {
//      sendContactNotification(): Promise<void>
//      sendAutoReply(): Promise<void>
//      sendPasswordReset(): Promise<void>   ← Contact form doesn't need this
//      sendNewsletter(): Promise<void>      ← Portfolio doesn't have newsletter
//    }

// DO this — segregated:
// src/contracts/services/IContactEmailService.ts
export interface IContactEmailService {
  sendContactNotification(message: ContactMessageData): Promise<void>
  sendAutoReply(to: string, name: string): Promise<void>
}

// src/contracts/services/IAdminEmailService.ts
// Only admin-related emails — separate from contact
export interface IAdminEmailService {
  sendLoginAlert(ip: string, timestamp: Date): Promise<void>
}

─────────────────────────────────────────────
[I] Storage Service — read vs write separation
─────────────────────────────────────────────

// src/contracts/services/IStorageWriter.ts
export interface IStorageWriter {
  upload(file: Buffer, options: UploadOptions): Promise<UploadResult>
  delete(publicId: string): Promise<void>
}

// src/contracts/services/IStorageReader.ts
export interface IStorageReader {
  getOptimizedUrl(publicId: string, preset: ImagePreset): string
}

// Full service implements both — admin upload route uses IStorageWriter
// Public image display uses IStorageReader — no upload access exposed
export interface IStorageService extends IStorageWriter, IStorageReader {}
```

---

## 📦 PROMPT 6 — D: Dependency Inversion Principle

```
Apply Dependency Inversion — high-level modules depend on abstractions (interfaces),
not on concrete implementations. Wire everything in one central container.

─────────────────────────────────────────────
[D] Dependency Injection Container
─────────────────────────────────────────────

// src/container/container.ts
// The ONLY file that knows about concrete implementations
// Everything else depends on interfaces

import { MongoProjectRepository }      from '@/src/infrastructure/repositories/MongoProjectRepository'
import { MongoCertificateRepository }  from '@/src/infrastructure/repositories/MongoCertificateRepository'
import { MongoExperienceRepository }   from '@/src/infrastructure/repositories/MongoExperienceRepository'
import { MongoBlogRepository }         from '@/src/infrastructure/repositories/MongoBlogRepository'
import { MongoMessageRepository }      from '@/src/infrastructure/repositories/MongoMessageRepository'
import { MongoSkillRepository }        from '@/src/infrastructure/repositories/MongoSkillRepository'
import { MongoAnalyticsRepository }    from '@/src/infrastructure/repositories/MongoAnalyticsRepository'
import { CloudinaryStorageService }    from '@/src/infrastructure/services/CloudinaryStorageService'
import { NodemailerEmailService }      from '@/src/infrastructure/services/NodemailerEmailService'
import { SlugifySlugService }          from '@/src/infrastructure/services/SlugifySlugService'

import { CreateProjectUseCase }        from '@/src/application/projects/CreateProject.usecase'
import { UpdateProjectUseCase }        from '@/src/application/projects/UpdateProject.usecase'
import { DeleteProjectUseCase }        from '@/src/application/projects/DeleteProject.usecase'
import { GetAllProjectsUseCase }       from '@/src/application/projects/GetAllProjects.usecase'
import { GetProjectBySlugUseCase }     from '@/src/application/projects/GetProjectBySlug.usecase'
import { SendContactMessageUseCase }   from '@/src/application/contact/SendContactMessage.usecase'
import { TrackPageViewUseCase }        from '@/src/application/analytics/TrackPageView.usecase'
import { GetAnalyticsSummaryUseCase }  from '@/src/application/analytics/GetAnalyticsSummary.usecase'
// ... import all other use cases

// ─── Repositories (singletons) ───────────────────────────────
const projectRepo      = new MongoProjectRepository()
const certificateRepo  = new MongoCertificateRepository()
const experienceRepo   = new MongoExperienceRepository()
const blogRepo         = new MongoBlogRepository()
const messageRepo      = new MongoMessageRepository()
const skillRepo        = new MongoSkillRepository()
const analyticsRepo    = new MongoAnalyticsRepository()

// ─── Services (singletons) ───────────────────────────────────
const storageService   = new CloudinaryStorageService()
const emailService     = new NodemailerEmailService()
const slugService      = new SlugifySlugService()

// ─── Use Cases (new instance per call) ───────────────────────
export const container = {
  // Projects
  createProject:      () => new CreateProjectUseCase(projectRepo, storageService, slugService),
  updateProject:      () => new UpdateProjectUseCase(projectRepo, storageService),
  deleteProject:      () => new DeleteProjectUseCase(projectRepo, storageService),
  getAllProjects:      () => new GetAllProjectsUseCase(projectRepo),
  getProjectBySlug:   () => new GetProjectBySlugUseCase(projectRepo),

  // Certificates
  createCertificate:  () => new CreateCertificateUseCase(certificateRepo, storageService),
  updateCertificate:  () => new UpdateCertificateUseCase(certificateRepo, storageService),
  deleteCertificate:  () => new DeleteCertificateUseCase(certificateRepo, storageService),
  getAllCertificates:  () => new GetAllCertificatesUseCase(certificateRepo),

  // Experience
  createExperience:   () => new CreateExperienceUseCase(experienceRepo),
  updateExperience:   () => new UpdateExperienceUseCase(experienceRepo),
  deleteExperience:   () => new DeleteExperienceUseCase(experienceRepo),
  getAllExperience:    () => new GetAllExperienceUseCase(experienceRepo),

  // Blog
  createPost:         () => new CreatePostUseCase(blogRepo, storageService, slugService),
  updatePost:         () => new UpdatePostUseCase(blogRepo, storageService),
  deletePost:         () => new DeletePostUseCase(blogRepo, storageService),
  getAllPosts:         () => new GetAllPostsUseCase(blogRepo),
  getPostBySlug:      () => new GetPostBySlugUseCase(blogRepo),

  // Contact
  sendContactMessage: () => new SendContactMessageUseCase(messageRepo, emailService),

  // Analytics
  trackPageView:      () => new TrackPageViewUseCase(analyticsRepo),
  getAnalytics:       () => new GetAnalyticsSummaryUseCase(analyticsRepo),
}

// TYPE: Export container type for TypeScript inference
export type Container = typeof container

─────────────────────────────────────────────
[D] API Route — depends ONLY on container (interface level)
─────────────────────────────────────────────

// app/api/projects/route.ts
// This controller knows NOTHING about MongoDB, Cloudinary, or Nodemailer
// It only talks to use cases through the container

import { NextRequest, NextResponse } from 'next/server'
import { container } from '@/src/container/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ProjectCreateSchema } from '@/lib/validations/project.schema'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') ?? undefined
    const featured = searchParams.get('featured') === 'true' ? true : undefined

    const useCase = container.getAllProjects()
    const result = await useCase.execute({ category, featured })

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('[GET /api/projects]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Auth check
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const limited = await rateLimit({ ip, limit: 20, windowMs: 60 * 60 * 1000 })
    if (!limited.success) {
      return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
    }

    // 3. Parse + validate
    const body = await request.json()
    const validated = ProjectCreateSchema.parse(body)

    // 4. Execute use case — controller doesn't know HOW it works
    const useCase = container.createProject()
    const result = await useCase.execute(validated)

    return NextResponse.json({ success: true, data: result.project }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('[POST /api/projects]', error)
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 })
  }
}
```

---

## 📦 PROMPT 7 — SOLID في الـ Middleware والحماية

```
Apply SOLID to the security and middleware layer.

─────────────────────────────────────────────
[S][O] Middleware — composable security pipeline
─────────────────────────────────────────────

// Each middleware function has ONE responsibility
// middleware.ts composes them — adding new middleware = add function, don't edit existing ones

// lib/middleware/withAuth.ts
// Responsibility: Check authentication ONLY
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function withAuth(
  request: NextRequest,
  next: () => NextResponse
): Promise<NextResponse> {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(loginUrl)
  }
  return next()
}

// lib/middleware/withSecurityHeaders.ts
// Responsibility: Add security headers ONLY
export function withSecurityHeaders(response: NextResponse): NextResponse {
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' *.vercel-analytics.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: res.cloudinary.com",
      "font-src 'self' fonts.gstatic.com",
      "connect-src 'self' *.vercel-analytics.com",
      "frame-ancestors 'none'",
    ].join('; '),
  }
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

// lib/middleware/withRateLimit.ts
// Responsibility: Rate limiting ONLY
export async function withRateLimit(
  request: NextRequest,
  next: () => NextResponse,
  options: { limit: number; windowMs: number }
): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
  const result = await checkRateLimit(ip, options)
  if (!result.success) {
    const response = NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    response.headers.set('Retry-After', String(result.retryAfter))
    return response
  }
  return next()
}

// middleware.ts — Compose the pipeline (O: open for extension)
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/middleware/withAuth'
import { withSecurityHeaders } from '@/lib/middleware/withSecurityHeaders'
import { withRateLimit } from '@/lib/middleware/withRateLimit'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl
  let response: NextResponse

  // Admin routes require authentication
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response = await withAuth(request, () => NextResponse.next())
  }
  // Contact API has strict rate limit
  else if (pathname === '/api/contact') {
    response = await withRateLimit(
      request,
      () => NextResponse.next(),
      { limit: 3, windowMs: 60 * 60 * 1000 }
    )
  }
  // Auth endpoints have brute-force protection
  else if (pathname.startsWith('/api/auth')) {
    response = await withRateLimit(
      request,
      () => NextResponse.next(),
      { limit: 5, windowMs: 15 * 60 * 1000 }
    )
  }
  else {
    response = NextResponse.next()
  }

  // Security headers on EVERY response — always last
  return withSecurityHeaders(response)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 📦 PROMPT 8 — SOLID Testing Strategy

```
Write unit tests that prove SOLID principles are working correctly.
Use Jest + TypeScript.

─────────────────────────────────────────────
[D] Test with Mock Implementations — not real DB/services
─────────────────────────────────────────────

// tests/unit/application/CreateProject.usecase.test.ts
// Tests prove: use case works with ANY IProjectRepository implementation

import { CreateProjectUseCase } from '@/src/application/projects/CreateProject.usecase'
import type { IProjectRepository } from '@/src/contracts/repositories/IProjectRepository'
import type { IStorageService } from '@/src/contracts/services/IStorageService'
import type { ISlugService } from '@/src/contracts/services/ISlugService'
import { ProjectEntity } from '@/src/domain/entities/Project.entity'

// Mock repository — implements the interface, stores in memory
const mockProjectRepo: jest.Mocked<IProjectRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findBySlug: jest.fn(),
  findPublished: jest.fn(),
  ensureUniqueSlug: jest.fn().mockResolvedValue('my-project'),
}

const mockStorageService: jest.Mocked<IStorageService> = {
  upload: jest.fn().mockResolvedValue({
    url: 'https://res.cloudinary.com/test/image.jpg',
    publicId: 'portfolio/projects/image',
    width: 1200, height: 800, format: 'jpg', bytes: 50000,
  }),
  delete: jest.fn(),
  getOptimizedUrl: jest.fn().mockReturnValue('https://res.cloudinary.com/optimized.jpg'),
}

const mockSlugService: jest.Mocked<ISlugService> = {
  generate: jest.fn().mockResolvedValue('my-project'),
}

describe('CreateProjectUseCase — SOLID compliance', () => {
  let useCase: CreateProjectUseCase

  beforeEach(() => {
    jest.clearAllMocks()
    // [D] Use case receives interfaces — not concrete classes
    useCase = new CreateProjectUseCase(
      mockProjectRepo,
      mockStorageService,
      mockSlugService,
    )
  })

  it('[S] executes single responsibility: create project', async () => {
    const savedProject = ProjectEntity.create({
      id: 'abc123',
      title: 'My Project',
      slug: 'my-project',
      description: 'A great project',
      techStack: ['Next.js', 'MongoDB'],
      category: 'web',
      status: 'draft',
      featured: false,
      order: 0,
    })

    mockProjectRepo.save.mockResolvedValue(savedProject)

    const result = await useCase.execute({
      title: 'My Project',
      description: 'A great project',
      techStack: ['Next.js', 'MongoDB'],
      category: 'web',
    })

    expect(result.project.title).toBe('My Project')
    expect(result.project.slug).toBe('my-project')
    expect(mockProjectRepo.save).toHaveBeenCalledTimes(1)
    expect(mockSlugService.generate).toHaveBeenCalledWith('My Project')
  })

  it('[D] works with ANY storage service implementation', async () => {
    // Swap in local storage mock — use case should not care
    const localStorageMock: jest.Mocked<IStorageService> = {
      upload: jest.fn().mockResolvedValue({
        url: 'https://localhost/uploads/image.jpg',
        publicId: 'image.jpg',
        width: 800, height: 600, format: 'jpg', bytes: 30000,
      }),
      delete: jest.fn(),
      getOptimizedUrl: jest.fn(),
    }

    const useCaseWithLocalStorage = new CreateProjectUseCase(
      mockProjectRepo,
      localStorageMock,  // ← different implementation!
      mockSlugService,
    )

    mockProjectRepo.save.mockResolvedValue(
      ProjectEntity.create({
        id: 'xyz', title: 'Test', slug: 'test',
        description: 'Test desc', techStack: ['React'],
        category: 'web', status: 'draft', featured: false, order: 0,
      })
    )

    // [L] Both storage implementations satisfy the contract — use case works identically
    await expect(
      useCaseWithLocalStorage.execute({
        title: 'Test', description: 'Test desc',
        techStack: ['React'], category: 'web',
        imageFile: Buffer.from('fake'), imageName: 'test.jpg',
      })
    ).resolves.not.toThrow()
  })

  it('[O] rejects invalid business rules without modifying use case', async () => {
    // Business rule is in ProjectEntity.create — not in use case
    await expect(
      useCase.execute({
        title: 'AB',  // ← Too short — entity will reject this
        description: 'Valid description here',
        techStack: ['React'],
        category: 'web',
      })
    ).rejects.toThrow('Project title must be at least 3 characters')

    expect(mockProjectRepo.save).not.toHaveBeenCalled()
  })
})

// tests/unit/domain/Email.vo.test.ts
describe('Email Value Object — [S] single responsibility: validate email', () => {
  it('accepts valid email', () => {
    expect(() => new Email('user@example.com')).not.toThrow()
    expect(new Email('USER@EXAMPLE.COM').value).toBe('user@example.com')
  })

  it('rejects invalid email', () => {
    expect(() => new Email('not-an-email')).toThrow('Invalid email address')
    expect(() => new Email('')).toThrow()
    expect(() => new Email('missing@domain')).toThrow()
  })

  it('equals compares by value', () => {
    const a = new Email('test@test.com')
    const b = new Email('TEST@TEST.COM')
    expect(a.equals(b)).toBe(true)
  })
})
```

---

## 🗺️ خريطة SOLID في المشروع

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLOW OF A REQUEST                           │
│                                                                 │
│  HTTP Request                                                   │
│      │                                                          │
│      ▼                                                          │
│  middleware.ts  ←── [S] Auth + Headers + RateLimit (composable) │
│      │                                                          │
│      ▼                                                          │
│  app/api/route.ts  ←── [S] HTTP only: parse, validate, respond │
│      │                                                          │
│      │  calls container.createProject()                        │
│      ▼                                                          │
│  container.ts  ←── [D] Wires interfaces to implementations     │
│      │                                                          │
│      ▼                                                          │
│  CreateProjectUseCase  ←── [S] One job. [O] No framework code  │
│      │          │                                               │
│      │          └──► ISlugService  ←── [D] Interface, not impl │
│      │          └──► IStorageService ←─ [I] Only upload/delete │
│      │          └──► IProjectRepository ←─ [I] Only what needed│
│      │                                                          │
│      ▼                                                          │
│  ProjectEntity.create()  ←── [S] Business rules live here      │
│      │                                                          │
│      ▼                                                          │
│  MongoProjectRepository  ←── [L] Substitutable, honors contract│
│      │                                                          │
│      ▼                                                          │
│  MongoDB Atlas                                                  │
└─────────────────────────────────────────────────────────────────┘

SOLID Mapping:
  S → app/api (HTTP) | UseCase (logic) | Entity (rules) | Value Objects
  O → BaseMongoRepository | EmailService implementations
  L → CloudinaryStorageService / LocalStorageService (both ↔ IStorageService)
  I → IReadRepository + IWriteRepository + ISlugRepository (segregated)
  D → container.ts wires everything | UseCase never imports concrete class
```

---

## 📋 Checklist تطبيق SOLID

| المبدأ | كيف تتحقق منه | ✅ |
|---|---|---|
| **S** | كل ملف له سبب واحد للتغيير | Domain لا تعرف HTTP، API لا تعرف MongoDB |
| **S** | Use Case يحتوي على `execute()` واحدة فقط | لا logic في controllers |
| **O** | إضافة Repository جديد = extend BaseMongoRepository | لا تعدّل الـ Base |
| **O** | إضافة Email Provider = class جديدة | لا تعدّل NodemailerEmailService |
| **L** | LocalStorageService تحل محل CloudinaryStorageService | نفس النتائج المضمونة |
| **I** | IAnalyticsRepository لا يحتوي على findBySlug | كل interface صغيرة ومركزة |
| **I** | IStorageReader منفصلة عن IStorageWriter | Public لا تستطيع الرفع |
| **D** | UseCase تعتمد على IProjectRepository لا MongoProjectRepository | |
| **D** | container.ts هو الوحيد الذي يعرف التطبيقات الحقيقية | |
| **Test** | يمكن تبديل MongoDB بـ in-memory mock في الاختبارات | |

---

*Architecture: SOLID Principles · Clean Architecture · Repository Pattern · Dependency Injection*  
*Stack: Next.js 14 · TypeScript Strict · MongoDB Atlas · Mongoose · Vercel*