import express from "express";
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  setupDirectories,
  uploadProcessedVideo,
} from "./storage";

setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
  let data;
  try {
    const message = Buffer.from(req.body.message.data, "base64").toString(
      "utf8"
    );
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error("Invalid message payload received.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("Bad Request: missing filename.");
  }

  const inputFileName = data.name;
  const outputFIleNAme = `processed-${inputFileName}`;

  // Download the raw video from Cloud Storage
  await downloadRawVideo(inputFileName);

  try {
    convertVideo;
  } catch (error) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFIleNAme),
    ]);
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error: video processing failed.");
  }

  // Upload the processed video to Cloud Storage
  await uploadProcessedVideo(outputFIleNAme);

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFIleNAme),
  ]);

  return res.status(200).send("Processing finished successfully");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Video processing service on  http://localhost:${port}`);
});
