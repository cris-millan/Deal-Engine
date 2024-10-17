import { Request, Response } from 'express';
import { SendWeatherNotificationsUseCase } from './usecase/send-weather-notification.usecase';
import { GetFlyUseCase } from './usecase/get-fly-weather.usecase';


const  usecase =  new SendWeatherNotificationsUseCase();
const  getFlyUsecase =  new GetFlyUseCase();
export class NotificationsController {

  //* DI
 
  constructor() { }

  async sendNotifications( req: Request, res: Response ) {
    const response = await usecase.execute([])
    return res.json( response );
  };

  async getFly( req: Request, res: Response ) {
    const response = await getFlyUsecase.execute([])
    return res.json( response );
  };

}