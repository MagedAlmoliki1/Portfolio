import { NextResponse } from "next/server";
import { MongoInquiryRepository } from "@/infrastructure/repositories/MongoInquiryRepository";
import { GetAllInquiriesUseCase } from "@/application/contact/GetAllInquiries.usecase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inquiryRepository = new MongoInquiryRepository();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const getAllInquiriesUseCase = new GetAllInquiriesUseCase(inquiryRepository);
    const inquiries = await getAllInquiriesUseCase.execute();

    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
