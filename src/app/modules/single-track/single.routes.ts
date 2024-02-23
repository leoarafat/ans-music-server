import express from 'express';

import { upload } from '../../../utils/multer';
import { SingleMusicController } from './single.controller';
// import { StaticsService } from '../statics/statics.service';
const router = express.Router();

router.post('/upload', upload, SingleMusicController.uploadSingle);
router.get('/all-music', SingleMusicController.myAllMusic);
router.get('/:id', SingleMusicController.singleMusic);
router.patch('/update/:id', SingleMusicController.updateSingleMusic);
router.delete('/delete/:id', SingleMusicController.deleteSingleMusic);
// router.post('/edit-music/:id', upload, SingleMusicController.updateSingleTrack);
// router.post('/statics', upload, StaticsService.insertIntoDB);

export const SingleMusicRoutes = router;
