import express from 'express';
import { PrimaryArtistController } from './artists.controller';
import { LabelController } from '../label/label.controller';
const router = express.Router();

router.post('/add-artist', PrimaryArtistController.addPrimaryArtist);
router.get('/get-artist/:id', PrimaryArtistController.getPrimaryArtist);
router.patch('/edit-artist/:id', PrimaryArtistController.updatePrimaryArtist);
router.patch('/edit-writer/:id', PrimaryArtistController.updateWriter);

//! Label
router.post('/add-label', LabelController.addLabel);
router.get('/get-label/:id', LabelController.getLabel);
router.patch('/edit-label/:id', LabelController.updateLabel);

export const ArtistsRoutes = router;
