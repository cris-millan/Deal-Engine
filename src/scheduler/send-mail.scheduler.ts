import cron from 'node-cron';
import { queueConfig } from '../config';
import {GetFileLatLonUseCase} from '../presentation/notifications/usecase/get-flies-lat-lon.usecase'

// Instantiate the use case for retrieving coordinates
const  usecase =  new GetFileLatLonUseCase();

class WeatherScheduler {
    constructor() {
        // Call the method to schedule jobs upon initializing the class
        this.scheduleJobs();
    }


    private scheduleJobs() {
        // Schedule a task to run every day at midnight (00:00)
        cron.schedule('0 0 * * *', async () => {
            console.log('-- Weather scheduler start --');

            try {
                // Retrieve an array of unique locations (latitude and longitude)
                const response = await usecase.execute({});

                // Add a job to the weatherQueue to get weather information from the API
                queueConfig.weatherQueue.add({ data: response.data, index: 0 });

                console.log('-- Weather scheduler finish --');
            } catch (error) {
                // Error handling: log any issues that occur during task execution
                if (error instanceof Error) {
                    console.error('Error in Weather Scheduler:', error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        });
    }
}

new WeatherScheduler();
