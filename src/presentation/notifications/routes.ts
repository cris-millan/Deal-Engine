import { Router } from 'express';
import { NotificationsController } from './controller';


export class NotificationRoutes {


  static get routes(): Router {

    const router = Router();

    const todoController = new NotificationsController();

    router.get('/', todoController.sendNotifications );


    return router;
  }


}

