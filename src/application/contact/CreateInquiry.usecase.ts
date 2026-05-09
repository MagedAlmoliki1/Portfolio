import { IInquiryRepository } from "@/contracts/repositories/IInquiryRepository";
import { InquiryEntity, CreateInquiryProps } from "@/domain/entities/Inquiry.entity";

export class CreateInquiryUseCase {
  constructor(private inquiryRepository: IInquiryRepository) {}

  async execute(data: CreateInquiryProps): Promise<InquiryEntity> {
    const inquiry = InquiryEntity.create(data);
    return this.inquiryRepository.save(inquiry);
  }
}
