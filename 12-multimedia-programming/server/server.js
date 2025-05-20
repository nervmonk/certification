const express = require("express");
const multer = require("multer");
const Minio = require("minio");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();

const app = express();
const port = 3000;

app.use(cors())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: false, // Set to true if using SSL
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const checkAndCreateBucket = async () => {
  try {
    const exists = await minioClient.bucketExists(process.env.MINIO_BUCKET);
    if (!exists) {
      await minioClient.makeBucket(process.env.MINIO_BUCKET, "");
    }
  } catch (err) {
    console.log(err);
  }
};

checkAndCreateBucket();

// Upload image
app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  const fileName = Date.now() + "-" + file.originalname;

  minioClient.putObject(
    process.env.MINIO_BUCKET,
    fileName,
    file.buffer,
    file.size,
    (err, etag) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ message: "File uploaded successfully", etag });
    }
  );
});

// Download image
app.get("/download/:filename", (req, res) => {
  const fileName = req.params.filename;

  minioClient.getObject(process.env.MINIO_BUCKET, fileName, (err, stream) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.set("Content-Type", "image/jpeg");
    stream.pipe(res);
  });
});

// List uploaded files
app.get("/files", (req, res) => {
  const files = []; // Declare the files array
  minioClient
    .listObjects(process.env.MINIO_BUCKET, "", true)
    .on("data", (obj) => {
      files.push(obj.name);
    })
    .on("end", () => {
      res.json(files);
    })
    .on("error", (err) => {
      console.error("Error listing files:", err);
      res.status(500).send(err);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
