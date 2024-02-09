import { Resolution } from "../models/Schema";

export interface Video {
  title: String;
  author: String;
  canBeDownloaded?: Boolean;
  minAgeRestriction?: Number;
  createdAt?: Date;
  publicationDate?: Date;
  availableResolutions?: Array<Resolution>;
}
