import cron from 'node-cron';
import { queueConfig } from '../config';
// import { FetchWeatherUseCase } from '../presentation/todos/usecase/fetch-weather.usecase';
import {GetFileLatLonUseCase} from '../presentation/notifications/usecase/get-flies-lat-lon.usecase'

const  usecase =  new GetFileLatLonUseCase();

class WeatherScheduler {
    constructor() {
        this.scheduleJobs();
    }


    private scheduleJobs() {
        // Configura la tarea cron para ejecutarse a diario a las 8 AM
        cron.schedule('0 0 * * *', async () => {
            console.log('-- Watheer scheduler start --.');
            // Supongamos que tienes un método para obtener los tickets
            const resposne = await usecase.execute({});
            console.log(resposne);
            queueConfig.weatherQueue.add({data: resposne.data, index: 0});

            console.log('-- Watheer scheduler finish --.');
        });
    }
}

new WeatherScheduler();
