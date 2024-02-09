import express from "express";
import "dotenv/config";
import {deleteVideo, getVideoById} from "./src/controllers/videoController";
import {createVideoValidation} from "./src/validations/createVideo/createVideo";
import {getVideos} from "./dist/controllers/videoController";
import {createVideo} from "./dist/controllers/video";
import {connectDB} from "./src/db/connect";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Samurai!");
});

app.get("api/videos/:id", getVideoById);
app.delete("api/videos/:id", deleteVideo);
app.get("api/videos", getVideos);
app.post("api/videos", createVideoValidation, createVideo);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
