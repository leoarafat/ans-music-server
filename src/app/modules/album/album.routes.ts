import express from 'express';
import { upload } from '../../../utils/multer';
import { AlbumService } from '../album/album.service';
import { AlbumController } from './album.controller';

const router = express.Router();

router.post('/upload', upload, AlbumService.uploadMultiple);
router.get('/all-album', AlbumController.myAllAlbum);
router.get('/:id', AlbumController.singleAlbum);
router.patch('/:id', AlbumController.updateSingleAlbum);
router.delete('/:id', AlbumController.deleteSingleAlbum);

export const AlbumRoutes = router;
