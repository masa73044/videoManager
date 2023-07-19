import express from "express";
import ffmpeg from "fluent-ffmpeg";

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

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      res.status(200).send("Video process finished successfully.");
    })
    .on("error", (err) => {
      console.log(`An error occured: ${err.message}`);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Video processing service on  http://localhost:${port}`);
});
