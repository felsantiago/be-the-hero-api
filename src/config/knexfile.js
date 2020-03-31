require('../bootstrap');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // connection: {
    //   database: process.env.DB_NAME,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   filename: process.env.STORAGE,
    //   ssl: true,
    // },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // tableName: 'migrations',
      directory: '../database/migrations',
    },
    useNullAsDefault: true,
  },
};
