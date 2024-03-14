import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { SingleMusicRoutes } from '../modules/single-track/single.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { SubUserRoutes } from '../modules/sub-user/sub-user.routes';
import { AlbumRoutes } from '../modules/album/album.routes';
import { NoteRoutes } from '../modules/note/note.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/sub-user',
    route: SubUserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/single-music',
    route: SingleMusicRoutes,
  },
  {
    path: '/album',
    route: AlbumRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/note',
    route: NoteRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
