import mysql from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const connection: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "physical_store_db",
});

export default connection;
