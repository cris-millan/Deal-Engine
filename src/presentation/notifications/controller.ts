import { Request, Response } from 'express';
import { SendWeatherNotificationsUseCase } from './usecase/send-weather-notification.usecase';


const  usecase =  new SendWeatherNotificationsUseCase();
export class NotificationsController {

  //* DI
 
  constructor() { }

  async sendNotifications( req: Request, res: Response ) {
    const response = await usecase.execute([])
    return res.json( response );
  };

}