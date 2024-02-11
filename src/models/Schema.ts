import { model, Schema } from "mongoose";
import { Video, VideoDocDB } from "../types/video";

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
const createdAt = new Date();
const publicationDate = new Date();

publicationDate.setDate(createdAt.getDate() + 1);
export const schema = new Schema<VideoDocDB>({
  id: { type: Number },
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
    default: createdAt.toISOString(),
  },
  publicationDate: {
    type: Date,
    default: publicationDate.toISOString(),
  },
  availableResolutions: {
    type: Array<Resolution>,
    default: null,
  },
});

export const VideoModel = model<VideoDocDB>("Video", schema);
