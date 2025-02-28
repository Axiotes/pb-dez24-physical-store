import connection from "../connection";
import { STORES } from "../mocks/stores.mock";

export default (): void => {
  connection.connect();

  STORES.forEach((store) => {
    const sql = `
        INSERT INTO stores (name, cep, street, city, number, neighborhood, state, region, lat, lng)
        VALUES ('${store.name}', '${store.cep}', '${store.street}', '${store.city}', ${store.number}, 
        '${store.neighborhood}', '${store.state}', '${store.region}', '${store.lat}', '${store.lng}');
    `;

    connection.query(sql, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });

  connection.end();
};
