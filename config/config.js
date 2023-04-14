require('dotenv').config();

const config = require('./config.json');

module.exports = {
    development: {
        ...config.development,
        database: process.env.DB_NAME,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_DEVELOPMENT_PASSWORD
    },
    test: {
        ...config.test,
        database: process.env.DB_NAME,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_TEST_PASSWORD
    },
    production: {
        ...config.production,
        database: process.env.DB_NAME,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PRODUCTION_PASSWORD
    }
}