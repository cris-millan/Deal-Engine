
import { queueConfig } from '../config';
import { FetchWeatherUseCase } from '../presentation/notifications/usecase/fetch-weather.usecase';

const usecase = new FetchWeatherUseCase();
class WeatherWorker {
    constructor() {
        this.processQueue();
    }

    private processQueue() {
        console.log(`processQueue`);
        queueConfig.weatherQueue.process(async (job) => {
            console.log('job data');
            console.log(job.data);
            usecase.execute(job.data);
        });

        queueConfig.weatherQueue.on('completed', (job, result) => {
            console.log(`Trabajo ${job.id} completado con éxito:`, result);
        }).on('failed', (job, err) => {
            console.log(`Trabajo ${job.id} fallido:`, err.message);
        });
    }
}

new WeatherWorker();
