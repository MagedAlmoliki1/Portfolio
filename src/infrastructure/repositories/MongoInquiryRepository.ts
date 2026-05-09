import { IInquiryRepository } from "@/contracts/repositories/IInquiryRepository";
import { InquiryEntity } from "@/domain/entities/Inquiry.entity";
import { InquiryModel, IInquiryDocument } from "../database/models/InquiryModel";
import { BaseMongoRepository } from "./BaseMongoRepository";

export class MongoInquiryRepository
  extends BaseMongoRepository<InquiryEntity, IInquiryDocument>
  implements IInquiryRepository
{
  constructor() {
    super(InquiryModel);
  }

  protected toEntity(doc: IInquiryDocument): InquiryEntity {
    return InquiryEntity.create({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      subject: doc.subject,
      budget: doc.budget,
      message: doc.message,
      status: doc.status,
      createdAt: doc.createdAt,
    });
  }

  protected toDocument(entity: InquiryEntity): Partial<IInquiryDocument> {
    return {
      name: entity.name,
      email: entity.email,
      subject: entity.subject,
      budget: entity.budget || undefined,
      message: entity.message,
      status: entity.status,
    };
  }
}
