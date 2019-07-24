const env = process.env.NODE_ENV || 'development';

const DATABASE_URL = (
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'nyc_dev'
);

const TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  global.TEST_DATABASE_URL ||
  'test_nyc_dev'
);

const DATABASE_USER = process.env.DATABASE_USER;

const DATABASE_PWD = process.env.DATABASE_PWD;


module.exports = {
  PORT: process.env.PORT || '8080',
  DATABASE_URL: process.env === 'test' ? TEST_DATABASE_URL : DATABASE_URL,
  DATABASE_USER: DATABASE_USER,
  DATABASE_PWD: DATABASE_PWD,
  SEQUELIZE_OPTIONS: {
    logging: env === 'test' ? false : console.log,
    host: 'localhost',
    dialect: 'postgres'
  }
}

