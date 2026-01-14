import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IApiKey extends Document {
  key: string;
  name: string;
  ownerAddress: string;
  createdAt: Date;
  lastUsedAt: Date | null;
  isActive: boolean;
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    ownerAddress: {
      type: String,
      required: true,
      index: true,
    },
    lastUsedAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate a secure API key
export function generateApiKey(): string {
  const prefix = 'mk_'; // mantle-links key
  const randomBytes = crypto.randomBytes(24).toString('hex');
  return `${prefix}${randomBytes}`;
}

export default mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema);
