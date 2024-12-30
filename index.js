require('dotenv').config(); 
const express = require('express'); 
const client = require('./src/database/connection'); 
const router = require ('./src/routes/routes')

const app = express(); 

require('dotenv').config();

app.use(express.json());

client.query('SELECT NOW()')
    .then(res => console.log('Conexão com o PostgreSQL ativa. Hora atual:', res.rows[0]))
    .catch(err => console.error('Erro ao consultar o banco:', err));

app.use('/api', router);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});

app.get('/', (request, response) => {
    response.send('Aplicação Galade API rodando');
});

process.on('SIGINT', () => {
    client.end(() => {
        console.log("Conexão com o banco de dados encerrada");
        process.exit();
    });
});
