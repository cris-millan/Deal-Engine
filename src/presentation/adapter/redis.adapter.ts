import Redis from 'ioredis';

export class RedisAdapter {
    private redis: Redis;

    constructor() {
        this.redis = new Redis(); // Conexión a Redis en localhost:6379
    }

    // Método para obtener un valor de la caché
    async get(key: string): Promise<any | null> {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null; // Retorna null si no hay valor
    }

    // Método para guardar un valor en la caché
    async set(key: string, value: any, expiration: number = 3600): Promise<void> {
        await this.redis.set(key, JSON.stringify(value), 'EX', expiration);
    }

    // Método para eliminar un valor de la caché
    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    // Método para cerrar la conexión
    async quit(): Promise<void> {
        await this.redis.quit();
    }
}
