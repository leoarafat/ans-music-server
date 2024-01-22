import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { SingleMusicRoutes } from '../modules/single-track/single.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { SubUserRoutes } from '../modules/sub-user/sub-user.routes';

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
    path: '/music',
    route: SingleMusicRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
