import { IInquiryRepository } from "@/contracts/repositories/IInquiryRepository";
import { InquiryEntity } from "@/domain/entities/Inquiry.entity";

export class GetAllInquiriesUseCase {
  constructor(private inquiryRepository: IInquiryRepository) {}

  async execute(): Promise<InquiryEntity[]> {
    const result = await this.inquiryRepository.findAll();
    return result.data;
  }
}
