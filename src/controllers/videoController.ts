import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { Video, VideoDocDB } from "../types/video";
import { VideoModel } from "../models/Schema";

export const createVideo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const a = errors
      .formatWith((error) => ({
        message: error.msg,
        //@ts-ignore
        field: error.path,
      }))
      .array();
    return res.status(400).send({ errorsMessages: a });
  }
  const createdVideo = await VideoModel.create({
    id: +new Date(),
    ...req.body,
  });

  const sanitizedVideo = {
    ...createdVideo.toObject(),
    _id: undefined,
    __v: undefined,
  };
  // Отправляем созданное видео и статус 201 Created
  return res.status(201).send(sanitizedVideo);
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await VideoModel.find().select(["-_id", "-__v"]).exec();
    return res.status(200).send(videos);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video: Video | null = await VideoModel.findOne({ id: req.params.id })
      .select(["-_id", "-__v"])
      .exec();
    if (!video) {
      return res.status(404).send({ error: "Видео не найдено" });
    }
    return res.status(200).send(video);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const videoForDel = await VideoModel.findOne({
      id: req.params.id,
    });
    const video = await VideoModel.findByIdAndDelete(videoForDel?._id);

    if (!video) {
      return res.status(404).send({ error: "Видео не найдено" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting video:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const deleteAllData = async (req: Request, res: Response) => {
  try {
    await VideoModel.deleteMany({});
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const editVideo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const a = errors
    .formatWith((error) => ({
      message: error.msg,
      //@ts-ignore
      field: error.path,
    }))
    .array();
  if (!errors.isEmpty()) {
    return res.status(400).send({ errorsMessages: a });
  }
  const id = +req.params.id;
  const editedVideo = await VideoModel.findOneAndUpdate({ id: id }, req.body);
  if (!editedVideo) {
    return res
      .status(404)
      .send({ errorsMessages: [{ message: "Видео не найдено" }] });
  }

  const updatedVideo = await VideoModel.findOne({ id: id })
    .select(["-_id", "-__v"])
    .exec();

  // Отправляем созданное видео и статус 201 Created
  return res.status(204).send(updatedVideo);
};
