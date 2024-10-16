import * as fs from 'fs';
import * as Papa from 'papaparse';
import { BASE_PATH } from "../../../config/config";
import * as path from 'path';


export class GetFileLatLonUseCase {

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

            // Create a set to store unique pairs of latitude and longitude
            const uniquePairs = new Set<string>();
            resultado.data.forEach((row: any) => {
                const originPair = `${row.origin_latitude},${row.origin_longitude}`;
                const destinationPair = `${row.destination_latitude},${row.destination_longitude}`;
                
                uniquePairs.add(originPair);
                uniquePairs.add(destinationPair);
            });

            // Return the unique pairs as an array
            return {
                data: Array.from(uniquePairs)
            };
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