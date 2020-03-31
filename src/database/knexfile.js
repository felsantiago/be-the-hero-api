require('../bootstrap');

module.exports = {
  development: {
    client: process.env.DB_DIALECT || 'sqlite3',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      filename: process.env.STORAGE || './src/database/db.sqlite',
    },
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
