import * as fs from 'fs';
import * as Papa from 'papaparse';
import { BASE_PATH } from "../../../config/config";
import * as path from 'path';
import { RedisAdapter } from '../../adapter/redis.adapter';


export class GetFlyUseCase {

    constructor() {}

    async execute(data: any): Promise<any> {
        // data.fly_number = 104;
        const filePath = path.join(BASE_PATH, 'data', 'dataset.csv'); // Path to the CSV file
        const redisAdapter = new RedisAdapter();

        try {
            // Read the CSV file synchronously
            const archivo = fs.readFileSync(filePath, 'utf8');
            
            // Parse the CSV file
            const resultado = Papa.parse(archivo, {
                header: true, // Use the first row as headers
                skipEmptyLines: true,
            });

            // Create a set to store unique pairs of latitude and longitude
            const fly_data: any = resultado.data.find((row: any) => row.flight_num == data.fly_number);

            if (!fly_data) {
                return {status: "error"};
            }
            const originPair = `${fly_data.origin_latitude},${fly_data.origin_longitude}`;
            const destinationPair = `${fly_data.destination_latitude},${fly_data.destination_longitude}`;


            try {
                // Retrieve data from Redis for the origin pair
                const originData = await redisAdapter.get(originPair);

                if (!originData) {
                    console.log('Origin data not found:', originPair);
                    return;
                }

                // Retrieve data from Redis for the destination pair
                const destinationData = await redisAdapter.get(destinationPair);
                if (!destinationData) {
                    console.log('Destination data not found:', destinationPair);
                    return;
                }

                // Log the destination data and send email notification
                console.log('Sending email notification...');

                 // Return the unique pairs as an array
                return {
                    data: {
                        origin_weather: {
                            city_name: originData.location.name,
                            region: originData.location.region,
                            country: originData.location.country,
                            lat: originData.location.lat,
                            lon: originData.location.lon,
                            temp_c: originData.current.temp_c,
                            condition: originData.current.condition.text,
                        },

                        destination_weather: {
                            city_name: originData.location.name,
                            region: originData.location.region,
                            country: originData.location.country,
                            lat: originData.location.lat,
                            lon: originData.location.lon,
                            temp_c: originData.current.temp_c,
                            condition: originData.current.condition.text,
                        }
                    }
                };

            } catch (redisError) {
                console.error('Error retrieving data from Redis:', redisError);
            }

        } catch (error) {
            // Handle errors related to file reading and parsing
            if (error instanceof Error) {
                console.error('Error in GetFileLatLonUseCase:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }

            // Optionally, you can throw the error to be handled by the caller
            throw new Error('Failed to execute GetFileLatLonUseCase');
        }
    }
}