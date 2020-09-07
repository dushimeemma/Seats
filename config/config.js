import dotenv from 'dotenv';
dotenv.config();
module.exports = {
  development: {
    host: process.env.HOST,
    name: process.env.NAME_DEV,
    port: process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET,
  },
  test: {
    host: process.env.HOST,
    name: process.env.NAME_TEST,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
  },
  production: {
    mongoURI: process.env.MONGO_URI_PROD,
    jwtSecret: process.env.JWT_SECRET,
  },
};
