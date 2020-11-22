import express from 'express';
import multer from 'multer';
import path from 'path';
const mime  = require("mime-types");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
   // cb(null, `${Date.now()}.jpg`);
   console.log(file);
    let ext = mime.extension(file.mimetype);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});


export default router;
