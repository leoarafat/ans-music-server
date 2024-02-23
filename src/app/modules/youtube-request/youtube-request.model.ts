import { Schema, model } from 'mongoose';
import {
  IArtistChannelRequest,
  IClaimRequest,
  IWhitelistRequest,
} from './youtube-request.interface';

const claimRequestSchema = new Schema<IClaimRequest>(
  {
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedStatus: {
      type: String,
      enum: ['pending', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const artistChannelRequestSchema = new Schema<IArtistChannelRequest>(
  {
    channel_link: {
      type: String,
      required: true,
    },
    topic_link: {
      type: String,
      required: true,
    },
    upc_1: {
      type: String,
      required: true,
    },
    upc_2: {
      type: String,
      required: true,
    },
    upc_3: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedStatus: {
      type: String,
      enum: ['pending', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const whitelistRequestSchema = new Schema<IWhitelistRequest>(
  {
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedStatus: {
      type: String,
      enum: ['pending', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const ClaimRequest = model('ClaimRequest', claimRequestSchema);
export const ArtistChannelRequest = model(
  'ArtistChannelRequest',
  artistChannelRequestSchema,
);
export const WhitelistRequest = model(
  'WhitelistRequest',
  whitelistRequestSchema,
);
