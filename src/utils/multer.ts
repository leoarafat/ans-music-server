/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import * as fs from 'fs';
import multer from 'multer';
const uploadsDirectory = 'uploads';
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true });
}
export const storage = multer.diskStorage({
  //@ts-ignore
  destination: function (req: Request, file: any, cb: any) {
    cb(null, uploadsDirectory);
  },
  filename: function (req: Request, file, cb) {
    cb(null, file.originalname);
  },
});

// export const upload = multer({ storage: storage }).array('images', 20);
export const singleUpload = multer({ storage: storage }).single('image');
export const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 20 },
  { name: 'nidFront', maxCount: 20 },
  { name: 'nidBack', maxCount: 20 },
  { name: 'dashboardScreenShot', maxCount: 20 },
  { name: 'copyrightNoticeImage', maxCount: 20 },
  { name: 'audio', maxCount: 30 },
  { name: 'statics' },
  { name: 'title' },
  { name: 'artist' },
  { name: 'data' },
  { name: 'actor' },
  { name: 'composer' },
  { name: 'director' },
  { name: 'bulk' },
]);
