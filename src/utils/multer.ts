/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import * as fs from 'fs';
import multer from 'multer';
const uploadsDirectory = 'uploads/album';
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
//!
const uploadsBulkDirectory = 'uploads/bulk';
if (!fs.existsSync(uploadsBulkDirectory)) {
  fs.mkdirSync(uploadsBulkDirectory, { recursive: true });
}
export const storageBulk = multer.diskStorage({
  //@ts-ignore
  destination: function (req: Request, file: any, cb: any) {
    cb(null, uploadsBulkDirectory);
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
    cb(null, 'ANS-MUSIC' + '-' + uniqueSuffix + file.originalname);
  },
});
//!
const uploadsStaticsDirectory = 'uploads/statics';
if (!fs.existsSync(uploadsStaticsDirectory)) {
  fs.mkdirSync(uploadsStaticsDirectory, { recursive: true });
}
export const storageStatics = multer.diskStorage({
  //@ts-ignore
  destination: function (req: Request, file: any, cb: any) {
    cb(null, uploadsStaticsDirectory);
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'ANS-MUSIC' + '-' + uniqueSuffix + file.originalname);
  },
});
//!
const uploadsSingleDirectory = 'uploads/single-track';
if (!fs.existsSync(uploadsSingleDirectory)) {
  fs.mkdirSync(uploadsSingleDirectory, { recursive: true });
}
export const storageSingle = multer.diskStorage({
  //@ts-ignore
  destination: function (req: Request, file: any, cb: any) {
    cb(null, uploadsSingleDirectory);
  },
  filename: function (req: Request, file, cb) {
    cb(null, file.originalname);
  },
});
//!

export const singleUpload = multer({ storage: storage }).single('image');
export const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 20 },
  { name: 'nidFront', maxCount: 20 },
  { name: 'nidBack', maxCount: 20 },
  { name: 'dashboardScreenShot', maxCount: 20 },
  { name: 'copyrightNoticeImage', maxCount: 20 },
  { name: 'audio', maxCount: 30 },
  { name: 'title' },
  { name: 'artist' },
  { name: 'data' },
]);
export const uploadSingle = multer({ storage: storageSingle }).fields([
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
export const uploadBulk = multer({ storage: storageBulk }).fields([
  { name: 'bulk' },
]);
export const uploadStatics = multer({ storage: storageStatics }).fields([
  { name: 'statics' },
]);
