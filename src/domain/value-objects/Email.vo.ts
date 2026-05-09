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
