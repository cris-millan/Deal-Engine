import axios, { AxiosError } from 'axios';
import gateways from '../config/gateway.config';
import { error } from 'console';

export class OpenWeatherMapGateway {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        const config = gateways.find(gateway => gateway.name === 'OpenWeatherMap');

        if ( !config ) throw error('config file not found');
        
        this.apiKey = config.apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    public async getWeather(latitude: number, longitude: number): Promise<any> {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    appid: this.apiKey,
                    units: 'metric', // O 'imperial' según tu preferencia
                },
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(`OpenWeatherMap Error: ${error.message}`);
            }
            throw error;
        }
    }
}
