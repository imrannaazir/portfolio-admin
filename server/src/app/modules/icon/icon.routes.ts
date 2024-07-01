import { Router } from 'express';
import IconControllers from './icon.controllers';

const router = Router();

// create icon
router.post('/', IconControllers.createIcons);

// get icons
router.get('/', IconControllers.getAllIcons);

const IconRoutes = router;
export default IconRoutes;
