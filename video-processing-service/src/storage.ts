import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

// GCS & local file interactions

const storage = new Storage();

// videos that will be downloaded
const rawVideoBucketName = "mk-yt-raw-videos";
// videos that will be uploaded
const processedVideoBucketName = "mk-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

export function setupDirectories() {}

export function convertVideo(
  rawVideoName: string,
  processedVideoName: string
) {}
