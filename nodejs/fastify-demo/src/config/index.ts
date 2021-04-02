import dotenv from "dotenv";

dotenv.config();

const { APP_PORT, NODE_ENV: APP_ENV } = process.env;

export default {
  APP_PORT,
  APP_ENV,
};
