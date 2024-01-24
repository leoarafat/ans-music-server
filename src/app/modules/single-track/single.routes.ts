import express from 'express';

import { upload } from '../../../utils/multer';
import { SingleMusicController } from './single.controller';
import { MultipleMusicService } from '../album/album.service';
import { StaticsService } from '../statics/statics.service';
const router = express.Router();

router.post('/upload', upload, SingleMusicController.uploadSingle);
// router.post('/edit-music/:id', upload, SingleMusicController.updateSingleTrack);
router.post('/multiple', upload, MultipleMusicService.uploadMultiple);
router.post('/statics', upload, StaticsService.insertIntoDB);

export const SingleMusicRoutes = router;
