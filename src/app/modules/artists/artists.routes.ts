import express from 'express';
import { PrimaryArtistController } from './artists.controller';
const router = express.Router();

router.patch('/edit-artist/:id', PrimaryArtistController.updatePrimaryArtist);
export const ArtistsRoutes = router;
