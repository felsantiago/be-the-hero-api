import knex from 'knex';
import configuration from './knexfile';

const config =
  process.env.NODE_ENV === 'development'
    ? configuration.development
    : configuration.production;

const connection = knex(config);

export default connection;
