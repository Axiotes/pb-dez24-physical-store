# Physical Store - Desafio 02
API REST desenvolvida com objetivo gerenciar lojas físicas de um eCommerce, permitindo a busca de lojas dentro de um raio de 100 km a partir de um CEP fornecido pelo usuário

## Principais Tecnologias Utilizadas
- Express
- TypeScript
- MySQL
- Winston
- Axios

## Instalação do Projeto
### Pré-requisitos
1. **Git**
    - É necessário que tenha o **git** na sua última versão
    - Verificar se o git está instalado:
    ```bash
    git --version
    ```
    - Caso não esteja instalado, é possível instalar através do [Downloads - Git](https://git-scm.com/downloads)
2. MySQL
    - É necessário que tenha o **MySQL** na sua última versão
    - Verificar se o MySQL está instalado:
    ```bash
    mysql --version
    ```
    - Caso não esteja instalado, é possível instalar através do [MySQL Downloads](https://www.mysql.com/downloads/)

### Processo de instalação e execução do projeto
1. Clonar o repositório na sua máquina
    ```bash
    git clone git@github.com:Axiotes/pb-dez24-physical-store.git
    ```
2. Entrar no diretório
    ```bash
    cd pb-dez24-physical-store
    ```
3. Variáveis de ambiente  
    Renomeie o arquivo `env_example` para `.env` e atribua valores ao respectivas variáveis, exemplo:
    ```
    DB_HOST="localhost"
    DB_PORT=3306
    DB_USERNAME="root"
    DB_PASSWORD="root"
    DATABASE="physical_store_db"
    ```
    Na aplicação são utilizadas APIs do Google Maps, portanto é necessário obter uma API KEY para utilizá-las  

4. Criação de um banco de dados  
    No seu SGBD do MySQL crie o banco de dados
    ```sql
    CREATE DATABASE physical_store_db
    ```

5. Instalar dependências
    ```bash
    npm i
    ```

6. Executar aplicação  
    Existem dois scripts para execução da aplicação
    ```bash
    npm start # Executa API
    ```
    ```bash
    npm run dev # Executa API em desenvolvimento
    ```

7. Executar migrations
    Para a criação da estrutura do banco de dados, utilize o seguinte comando
    ```bash
    npm run migrations
    ```

9. Executar seeders **(Opcional)**  
    Caso deseje criar dados falso para teste ou desenvolvimento, utilizae o seguinte comando
    ```bash
    npm run seed
    ```
