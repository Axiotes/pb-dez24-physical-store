import app from ".";
import connection from "./db/connection";

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  app.listen(3000);
});
