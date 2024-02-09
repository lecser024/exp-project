import express, { Request, Response } from "express";
import "dotenv/config";
import { createVideoValidation } from "./validations/createVideo/createVideo";
import {
  createVideo,
  deleteVideo,
  getVideoById,
  getVideos,
} from "./controllers/videoController";
import { connectDB } from "./db/connect";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Samurai!");
});

app.get("api/videos/:id", getVideoById);
app.delete("api/videos/:id", deleteVideo);
app.get("api/videos", getVideos);
app.post("api/videos", createVideoValidation, createVideo);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL as string);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
