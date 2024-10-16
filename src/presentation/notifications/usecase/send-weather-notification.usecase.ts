import * as fs from 'fs';
import * as Papa from 'papaparse';
import { BASE_PATH } from "../../../config/config";
import * as path from 'path';
import { RedisAdapter } from "../../adapter/redis.adapter";


export class SendWeatherNotificationsUseCase {

    constructor() {}

    async execute(data: any): Promise<any> {
        const filePath = path.join(BASE_PATH, 'data', 'dataset.csv'); // Path to the CSV file

        try {
            // Read the CSV file synchronously
            const archivo = fs.readFileSync(filePath, 'utf8');

            // Parse the CSV file
            const resultado = Papa.parse(archivo, {
                header: true, // Use the first row as headers
                skipEmptyLines: true,
            });

            const redisAdapter = new RedisAdapter();

            // Process each row in the parsed data
            await Promise.all(resultado.data.map(async (row: any) => {
                const originPair = `${row.origin_latitude},${row.origin_longitude}`;
                const destinationPair = `${row.destination_latitude},${row.destination_longitude}`;

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
                    console.log(destinationData);
                    console.log('Sending email notification...');

                } catch (redisError) {
                    console.error('Error retrieving data from Redis:', redisError);
                }
            }));

            return {
                data: 'success'
            };

        } catch (fileError) {
            // Handle errors related to file reading and parsing
            if (fileError instanceof Error) {
                console.error('Error in SendWeatherNotificationsUseCase:', fileError.message);
            } else {
                console.error('Unexpected error:', fileError);
            }

            // Optionally, you can throw an error to be handled by the caller
            throw new Error('Failed to execute SendWeatherNotificationsUseCase');
        }
    }
}