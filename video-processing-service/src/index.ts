import express from "express";
import ffmpeg from "fluent-ffmpeg";
import { setupDirectories } from "./storage";

setupDirectories();

const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.post("/process-video", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad Request: Missing input file path");
  } else if (!outputFilePath) {
    res.status(400).send("Bad Request: Missing output file path");
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Video processing service on  http://localhost:${port}`);
});
