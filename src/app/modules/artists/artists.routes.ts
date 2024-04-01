import express from 'express';
import { PrimaryArtistController } from './artists.controller';
const router = express.Router();

router.patch('/edit-artist/:id', PrimaryArtistController.updatePrimaryArtist);
router.patch('/edit-writer/:id', PrimaryArtistController.updateWriter);
export const ArtistsRoutes = router;
