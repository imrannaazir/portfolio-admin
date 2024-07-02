import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import TagRoutes from '../modules/tag/tag.route';
import IconRoutes from '../modules/icon/icon.routes';
import ImageRoutes from '../modules/image/image.routes';
import ProjectRoutes from '../modules/project/project.route';
import ExperienceRoutes from '../modules/experience/experience.routes';

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/experiences',
    route: ExperienceRoutes,
  },

  {
    path: '/tags',
    route: TagRoutes,
  },

  {
    path: '/icons',
    route: IconRoutes,
  },
  {
    path: '/images',
    route: ImageRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
