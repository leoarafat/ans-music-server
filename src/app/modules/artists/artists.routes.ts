import express from 'express';
import { PrimaryArtistController } from './artists.controller';
const router = express.Router();

router.patch('/edit-artist/:id', PrimaryArtistController.updatePrimaryArtist);
router.patch('/edit-writer/:id', PrimaryArtistController.updateWriter);
router.post('/add-artist/:id', PrimaryArtistController.addPrimaryArtist);
router.patch('/edit-label/:id', PrimaryArtistController.updateLabel);

export const ArtistsRoutes = router;
