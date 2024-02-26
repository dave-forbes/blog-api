import path from "path";
import multer from "multer";

const parentDir = path.resolve(__dirname, "../..");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(parentDir, "public/img"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
