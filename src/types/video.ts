import { Resolution } from "../models/Schema";

export interface Video {
  id: number;
  title: string;
  author: string;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  createdAt?: Date;
  publicationDate?: Date;
  availableResolutions?: Array<Resolution>;
}
export interface VideoDocDB extends Video {
  _id: string;
}
