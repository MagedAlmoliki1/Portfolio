import { NextResponse } from "next/server";
import { MongoInquiryRepository } from "@/infrastructure/repositories/MongoInquiryRepository";
import { CreateInquiryUseCase } from "@/application/contact/CreateInquiry.usecase";
import { InquiryCreateSchema } from "@/lib/validation/schemas";
import crypto from "crypto";

const inquiryRepository = new MongoInquiryRepository();

// Simple in-memory idempotency cache
const idempotencyCache = new Map<string, { timestamp: number; response: any }>();
const IDEMPOTENCY_WINDOW = 5000; // 5 seconds

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    
    // 1. Validation
    const validationResult = InquiryCreateSchema.safeParse(rawData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      );
    }
    const data = validationResult.data;

    // 2. Idempotency Check (prevent duplicate submissions)
    const requestHash = crypto
      .createHash("md5")
      .update(JSON.stringify(data))
      .digest("hex");
    
    const now = Date.now();
    const cached = idempotencyCache.get(requestHash);
    if (cached && now - cached.timestamp < IDEMPOTENCY_WINDOW) {
      return NextResponse.json(cached.response, { status: 201 }); // Return same response for duplicate
    }

    // 3. Execution
    const createInquiryUseCase = new CreateInquiryUseCase(inquiryRepository);
    const inquiry = await createInquiryUseCase.execute(data);

    // 4. Cache for idempotency
    idempotencyCache.set(requestHash, { timestamp: now, response: inquiry });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send inquiry" },
      { status: 500 }
    );
  }
}

