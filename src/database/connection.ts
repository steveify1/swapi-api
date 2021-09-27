import { createConnection } from 'typeorm';

const connection = {
    connect() {
        createConnection({
            type: "mysql",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME,
            entities: [
                "dist/database/entities/*.js"
            ],
            synchronize: true,
        }).then(connection => {
            console.log('Successfully connected to the database');
        }).catch(err => {
            console.log('Error', err);
        });
    }
}

export default connection;