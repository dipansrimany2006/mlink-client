import mongoose, { Schema, Document, Types } from 'mongoose';
import crypto from 'crypto';

export type MLinkStatus = 'pending' | 'approved' | 'blocked';

export interface IMLink extends Document {
  _id: Types.ObjectId;
  mlinkId: string;
  actionUrl: string;
  name: string;
  description: string;
  icon: string;
  ownerAddress: string;
  apiKeyId: Types.ObjectId;
  status: MLinkStatus;
  statusReason?: string;
  statusUpdatedAt?: Date;
  statusUpdatedBy?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MLinkSchema = new Schema<IMLink>(
  {
    mlinkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    actionUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    icon: {
      type: String,
      required: true,
    },
    ownerAddress: {
      type: String,
      required: true,
      index: true,
    },
    apiKeyId: {
      type: Schema.Types.ObjectId,
      ref: 'ApiKey',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'blocked'],
      default: 'pending',
      index: true,
    },
    statusReason: {
      type: String,
      maxlength: 500,
    },
    statusUpdatedAt: {
      type: Date,
    },
    statusUpdatedBy: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 10;
        },
        message: 'Maximum 10 tags allowed',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient owner queries
MLinkSchema.index({ ownerAddress: 1, status: 1 });

// Generate a unique MLink ID using crypto.randomUUID
export function generateMlinkId(): string {
  return `ml_${crypto.randomUUID()}`;
}

export default mongoose.models.MLink || mongoose.model<IMLink>('MLink', MLinkSchema);
