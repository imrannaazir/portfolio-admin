import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd() + '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  data_limit: process.env.DATA_LIMIT,
  client_url: process.env.CLIENT_URL,
  super_admin: {
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
  },
};
