import express from "express";
import "dotenv/config";
import { deleteAllData } from "../src/controllers/videoController";
import { connectDB } from "../src/db/connect";
import { videoRouter } from "../src/routes/videoRouter/videoRouter";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.delete("/testing/all-data", deleteAllData);
app.use("/videos", videoRouter);

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
