import { Router } from 'express';

import { NotificationRoutes } from './notifications/routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/notifications', NotificationRoutes.routes );
    
    return router;
  }
}

