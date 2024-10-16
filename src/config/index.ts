import Queue from 'bull';

class QueueConfig {
    public weatherQueue: Queue.Queue;

    constructor() {
        this.weatherQueue = new Queue('weather', {
            redis: {
                host: '127.0.0.1', // Cambia esto si usas un servicio de Redis diferente
                port: 6379,
            },
        });
    }
}

export const queueConfig = new QueueConfig();
