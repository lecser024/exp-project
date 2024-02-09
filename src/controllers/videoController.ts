import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { Video } from "../types/video";
import { VideoModel } from "../models/Schema";

export const createVideo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const createdVideo = await VideoModel.create(req.body);

  // Отправляем созданное видео и статус 201 Created
  return res
    .status(201)
    .json({ message: "Видео успешно создано", video: createdVideo });
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos: Video[] = await VideoModel.find();
    return res.status(200).json({ videos });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const video: Video | null = await VideoModel.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Видео не найдено" });
    }
    return res.status(200).json({ video });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const video: Video | null = await VideoModel.findByIdAndDelete(
      req.params.id
    );
    if (!video) {
      return res.status(404).json({ error: "Видео не найдено" });
    }
    return res.status(200).json({ message: "Видео успешно удалено" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
