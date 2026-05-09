import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiryDocument extends Document {
  name: string;
  email: string;
  subject: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiryDocument>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { 
      type: String, 
      required: true, 
      trim: true, 
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    subject: { type: String, required: true, trim: true, minlength: 3, maxlength: 200 },
    budget: { type: String, trim: true },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
    status: { 
      type: String, 
      enum: ['new', 'read', 'replied'],
      default: "new" 
    },
  },
  { 
    timestamps: true,
    strict: true 
  }
);

// Indexes for admin dashboard performance
InquirySchema.index({ status: 1 });
InquirySchema.index({ createdAt: -1 });
InquirySchema.index({ email: 1 });

export const InquiryModel: Model<IInquiryDocument> =
  mongoose.models.Inquiry || mongoose.model<IInquiryDocument>("Inquiry", InquirySchema);

