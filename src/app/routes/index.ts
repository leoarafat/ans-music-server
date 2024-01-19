import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { SingleMusicRoutes } from '../modules/single-track/single.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/music',
    route: SingleMusicRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
