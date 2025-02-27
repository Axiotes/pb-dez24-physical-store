import mysql from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import * as dotenv from "dotenv";

dotenv.config();

const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

export default connection;
