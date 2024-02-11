import { Router } from "express";
import {
  createVideo,
  deleteVideo,
  editVideo,
  getVideoById,
  getVideos,
} from "../../controllers/videoController";
import { editVideoValidation } from "../../validations/editVideo/editVideo";
import { createVideoValidation } from "../../validations/createVideo/createVideo";

export const videoRouter = Router({});

videoRouter.get("/:id", getVideoById);
videoRouter.put("/:id", editVideoValidation, editVideo);
videoRouter.delete("/:id", deleteVideo);
videoRouter.get("/", getVideos);
videoRouter.post("/", createVideoValidation, createVideo);
