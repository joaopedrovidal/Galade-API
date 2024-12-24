const { Client } = require ('pg')
require ('dotenv').config();

const client = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

client.connect()
    .then(() => console.log("Conectado ao PostegreSQL com sucesso!"))
    .catch(err => console.error("Erro ao conectar ao PostgreSQL: ",  err));

module.exports = client