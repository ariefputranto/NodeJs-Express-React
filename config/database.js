require('dotenv').config();

module.exports = {
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8',
        // socketPath: process.env.SOCKET_PATH,
    },
    migrations: {
        tableName: 'migrations',
        directory: './database/migrations',
    },
    seeds: {
        directory: './database/seeder',
    },
    debug: true
};