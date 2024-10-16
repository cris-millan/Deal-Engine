import axios, { AxiosError } from 'axios';
import gateways from '../config/gateway.config';
import { CurrentResponse } from './interfaces/current.response.interfaces';

export class WeatherApiGateway {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        const config = gateways.find(gateway => gateway.name === 'WeatherApi');

        if ( !config ) throw new Error('config file not found');

        this.apiKey = config.apiKey;
        this.baseUrl = config.url;
    }

    public async getWeather(latitude: number, longitude: number): Promise<CurrentResponse> {
        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Invalid latitude or longitude');
        }

        try {
            const endpoint = `${this.baseUrl}/current.json`
            console.log(endpoint);
            const response = await axios.get<CurrentResponse>(endpoint , {
                params: {
                    key: this.apiKey,
                    q: `${latitude},${longitude}`,
                },
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                // console.log(error);
                console.error(`WeatherAPI Error: ${error.message}`);
            }
            throw error;
        }
    }
}
