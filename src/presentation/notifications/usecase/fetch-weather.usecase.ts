import { OpenWeatherMapGateway } from "../../gateway/OpenWeatherMap.gateway";
import { WeatherApiGateway } from "../../gateway/WeatherAPI.gateway";
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { BASE_PATH } from "../../../config/config";
import * as path from 'path';
import { RedisAdapter } from "../../adapter/redis.adapter";
import { queueConfig } from "../../../config";


export class FetchWeatherUseCase {

    constructor (private readonly amount: number = 60) {}

    async execute (data: any): Promise<any> {

        console.log(`fech weather here`);

        // Obtener los primeros 20 elementos
        const current_batch: string[] = data.data.slice(0, this.amount);

        // Obtener los elementos desde el índice 20 hasta el final
        const next_batch = data.data.slice(5);

        console.log(current_batch);

        console.log(next_batch);

        const redisAdapter = new RedisAdapter();
        const weatherApiGateway = new WeatherApiGateway();

        current_batch.forEach(async cacheKey => {
            const [latitude, longitude] = cacheKey.split(',');
            
            const exists = await redisAdapter.get(cacheKey);
            
            if (exists) {
                console.log('Datos obtenidos de caché:', exists);
                return exists; // Retorna los datos de caché si existen
            }

            const response = await weatherApiGateway.getWeather(+latitude, +longitude );
            console.log('nueva ubicacion');
            const secondsInADay = 24 * 60 * 60;
            await redisAdapter.set(cacheKey, response, secondsInADay);
            console.log(`${latitude}, ${longitude}`);
        });

        if (next_batch.length) {
            //dispatch job to get weather information from all unuques pair lattitud, longitude.
            // queueConfig.weatherQueue.add({data: next_batch});
        }
        
        
        return {
            data: 'suceesss'
        };

    }
}