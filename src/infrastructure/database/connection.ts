// src/infrastructure/database/connection.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var _mongooseCache: MongooseCache | undefined
}

let cached = global._mongooseCache

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null }
}

export async function connectDB() {
  if (!MONGODB_URI) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ MONGODB_URI is missing. Database features will not work.');
      return null;
    }
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('=> Connecting to MongoDB...')
    }

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('=> MongoDB connected successfully')
      }
      return mongoose
    })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    console.error('=> MongoDB connection error:', e)
    throw e
  }

  return cached!.conn
}
