import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import ProductRoutes from '../modules/product/product.route';
import BrandRoutes from '../modules/brand/brand.route';
import CategoryRoutes from '../modules/category/category.route';
import TagRoutes from '../modules/tag/tag.route';
import OrderRoute from '../modules/order/order.route';
import IconRoutes from '../modules/icon/icon.routes';
import ImageRoutes from '../modules/image/image.routes';
import CollectionRoutes from '../modules/collection/collection.routes';
import VariantRoutes, { OptionRoutes } from '../modules/variant/variant.routes';
import ProjectRoutes from '../modules/project/project.route';

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
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/collections',
    route: CollectionRoutes,
  },

  {
    path: '/tags',
    route: TagRoutes,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/icons',
    route: IconRoutes,
  },
  {
    path: '/images',
    route: ImageRoutes,
  },
  {
    path: '/variants',
    route: VariantRoutes,
  },
  {
    path: '/options',
    route: OptionRoutes,
  },
];

routerModules.forEach((routerModule) => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
