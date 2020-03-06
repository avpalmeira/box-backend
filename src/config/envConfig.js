// set environment variables
const envConfig = () => {

  if (process.env.NODE_ENV != 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
  }

  // define url for development
  const protocol = process.env.PROTOCOL || 'http';
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3333;

  process.env.DEV_URL = `${protocol}://${host}:${port}`;

  return port;
}

module.exports = envConfig;