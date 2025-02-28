import connection from "../connection";

export default (): void => {
  connection.connect();

  const sql = `
        CREATE TABLE IF NOT EXISTS stores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            cep VARCHAR(8) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(60) NOT NULL,
            number INT NOT NULL,
            neighborhood VARCHAR(60) NOT NULL,
            state VARCHAR(20) NOT NULL,
            region VARCHAR(21) NOT NULL,
            lat VARCHAR(255) NOT NULL,
            lng VARCHAR(255) NOT NULL
        );
    `;

  connection.query(sql, (err): void => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Tabela 'stores' criada com sucesso ou já existente");
    connection.end();
  });
};
