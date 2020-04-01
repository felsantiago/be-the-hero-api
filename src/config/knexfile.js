const path = require('path');
require('../bootstrap');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'be_the_hero',
      user: 'postgres',
      password: 'docker',
    },
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname, '..', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: process.env.DB_DIALECT,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname, '..', 'database', 'migrations'),
    },
    useNullAsDefault: true,
  },
};
