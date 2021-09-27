import { ConnectionOptions, createConnection } from 'typeorm';
import { env } from '../shared/env';

const connection = {
    connect() {
        let options: ConnectionOptions = {
            type: "mysql",
            database: env('DB_NAME'),
            entities: [
                "dist/database/entities/*.js"
            ],
            synchronize: true,
        };

        if (env('NODE_ENV') == 'production') {
            options = {
                url: env('DB_URL'),
                ...options,
            };
        } else {
            options = {
                ...options,
                host: env('DB_HOST'),
                port: Number(env('DB_PORT')  || 3306),
                username: env('DB_USER')  || 'root',
                password: env('DB_PASSWORD') || '',
            };
        }

        createConnection(options).then(connection => {
            console.log('Successfully connected to the database');
        }).catch(err => {
            console.log('Error', err);
        });
    }
}

export default connection;