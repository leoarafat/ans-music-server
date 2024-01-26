import express from 'express';
import { upload } from '../../../utils/multer';
import { MultipleMusicService } from '../album/album.service';

const router = express.Router();

router.post('/multiple', upload, MultipleMusicService.uploadMultiple);

export const AlbumRoutes = router;
