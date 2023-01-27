import dotenv from "dotenv";
dotenv.config();
const {
  PORT,
  ENV,
  POSTGRS_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;
export default {
  port: PORT,
  host: POSTGRS_HOST,
  dbport: POSTGRES_PORT,
  database: ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  papper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokensecret: TOKEN_SECRET,
};
