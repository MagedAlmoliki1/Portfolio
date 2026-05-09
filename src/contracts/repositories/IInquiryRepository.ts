import { InquiryEntity } from "@/domain/entities/Inquiry.entity";
import { IReadRepository } from "./base/IReadRepository";
import { IWriteRepository } from "./base/IWriteRepository";

export interface IInquiryRepository
  extends IReadRepository<InquiryEntity>,
    IWriteRepository<InquiryEntity> {}
