// src/infrastructure/database/models/ProjectModel.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProjectDocument extends Document {
  title: string
  slug: string
  description: string
  longDescription?: string
  techStack: string[]
  images: {
    url: string
    publicId: string
    alt: string
  }[]
  liveUrl?: string
  githubUrl?: string
  category: 'web' | 'mobile' | 'saas' | 'api' | 'other'
  status: 'draft' | 'published'
  featured: boolean
  order: number
  stats?: {
    label: string
    value: string
  }[]
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    longDescription: { type: String, trim: true },
    techStack: { type: [String], required: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    liveUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    category: {
      type: String,
      enum: ['web', 'mobile', 'saas', 'api', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    seoTitle: { type: String, maxlength: 60 },
    seoDescription: { type: String, maxlength: 160 },
  },
  {
    timestamps: true,
    strict: true,
  }
)

// Indexes
ProjectSchema.index({ slug: 1 }, { unique: true })
ProjectSchema.index({ status: 1 })
ProjectSchema.index({ featured: 1 })
ProjectSchema.index({ category: 1 })

export const ProjectModel: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema)
