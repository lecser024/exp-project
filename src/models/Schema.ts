import { model, Schema } from "mongoose";
import { Video } from "../types/video";

export enum Resolution {
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
}

export const schema = new Schema<Video>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  canBeDownloaded: {
    type: Boolean,
    default: false,
  },
  minAgeRestriction: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  availableResolutions: {
    type: Array<Resolution>,
    default: null,
  },
});

export const VideoModel = model<Video>("Video", schema);
