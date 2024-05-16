/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import multer from 'multer';

export const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = '';

      if (file.fieldname === 'nidFront' || file.fieldname === 'nidBack') {
        uploadPath = 'uploads/images/nid';
      } else if (
        file.fieldname === 'dashboardScreenShot' ||
        file.filename === 'copyrightNoticeImage'
      ) {
        uploadPath = 'uploads/images/dashboard';
      } else if (file.fieldname === 'video') {
        uploadPath = 'uploads/video';
      } else if (file.fieldname === 'image') {
        uploadPath = 'uploads/images/image';
      } else if (file.fieldname === 'audio') {
        uploadPath = 'uploads/audio';
      } else if (file.fieldname === 'bulk') {
        uploadPath = 'uploads/bulk';
      } else if (file.fieldname === 'statics') {
        uploadPath = 'uploads/statics';
      } else {
        uploadPath = 'uploads';
      }

      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'video/mp4'
      ) {
        cb(null, uploadPath);
      } else {
        //@ts-ignore
        cb(new Error('Invalid file type'));
      }
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name);
    },
  });

  const fileFilter = (req: Request, file: any, cb: any) => {
    const allowedFieldnames = [
      'image',
      'nidFront',
      'nidBack',
      'dashboardScreenShot',
      'copyrightNoticeImage',
      'audio',
      'title',
      'artist',
      'data',
      'bulk',
      'statics',
    ];

    if (file.fieldname === undefined) {
      // Allow requests without any files
      cb(null, true);
    } else if (allowedFieldnames.includes(file.fieldname)) {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'video/mp4'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    } else {
      cb(new Error('Invalid fieldname'));
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'nidFront', maxCount: 1 },
    { name: 'nidBack', maxCount: 1 },
    { name: 'dashboardScreenShot', maxCount: 1 },
    { name: 'copyrightNoticeImage', maxCount: 1 },
    { name: 'bulk', maxCount: 1 },
    { name: 'statics', maxCount: 1 },
    { name: 'audio' },
    { name: 'title' },
    { name: 'artist' },
    { name: 'data' },
  ]);

  return upload;
};
