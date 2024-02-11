import { body } from "express-validator";
import { Resolution } from "../../models/Schema";

export const editVideoValidation = [
  body("title").isString().isLength({ min: 0, max: 40 }),
  body("author").isString().isLength({ min: 0, max: 20 }),
  body("availableResolutions")
    .optional()
    .isArray()
    .custom((value: Resolution[]) => {
      if (!Array.isArray(value)) {
        throw new Error("Available resolutions must be an array");
      }
      // Проверка, что все элементы массива являются допустимыми значениями enum Resolution
      const isValidResolutions = value.some((resolution: Resolution) =>
        Object.values(Resolution).includes(resolution)
      );

      if (!isValidResolutions) {
        throw new Error("Invalid resolutions");
      }

      return true;
    }),
  body("minAgeRestriction")
    .isNumeric()
    .custom((value: number) => {
      if (value < 0 || value > 18) {
        throw new Error("Invalid age restriction");
      }

      return true;
    }),
  body("canBeDownloaded").isBoolean().optional(),
  body("publicationDate").isString().optional(),
];
