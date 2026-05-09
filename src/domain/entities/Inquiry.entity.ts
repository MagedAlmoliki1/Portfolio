import { InquiryCreateSchema, InquirySchema } from "@/lib/validation/schemas";
import { z } from "zod";

export type InquiryProps = z.infer<typeof InquirySchema>;
export type CreateInquiryProps = z.infer<typeof InquiryCreateSchema>;

export class InquiryEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly subject: string,
    public readonly budget: string | null,
    public readonly message: string,
    public readonly status: 'new' | 'read' | 'replied',
    public readonly createdAt: Date
  ) {}

  static create(props: any): InquiryEntity {
    // Validate input using Zod
    const validated = InquirySchema.partial({ id: true, status: true, createdAt: true }).parse(props);
    
    return new InquiryEntity(
      validated.id ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7)),
      validated.name,
      validated.email,
      validated.subject,
      validated.budget ?? null,
      validated.message,
      validated.status ?? 'new',
      validated.createdAt instanceof Date ? validated.createdAt : new Date()
    );
  }

  static fromJSON(json: any): InquiryEntity {
    const validated = InquirySchema.parse(json);
    return new InquiryEntity(
      validated.id,
      validated.name,
      validated.email,
      validated.subject,
      validated.budget ?? null,
      validated.message,
      validated.status,
      validated.createdAt instanceof Date ? validated.createdAt : new Date(validated.createdAt)
    );
  }
}

