import { body } from "express-validator";

const videoValidation = [
  body("title").isString(),
  body("author").isString(),
  body("canBeDownloaded").isBoolean().optional(),
  body("minAgeRestriction").isNumeric().optional(),
  body("createdAt").isDate().optional(),
  body("publicationDate").isDate().optional(),
  body("availableResolutions").isArray().optional(),
];
