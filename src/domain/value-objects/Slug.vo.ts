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
