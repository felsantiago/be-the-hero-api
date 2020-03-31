const dotenv = require('dotenv');

let path;

if (process.env.NODE_ENV === 'test') path = '.env.test';
else if (process.env.NODE_ENV === 'development') path = '.env.development';
else if (process.env.NODE_ENV === 'production') path = '.env.production';

dotenv.config({
  path,
});
