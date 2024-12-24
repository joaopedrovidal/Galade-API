const client = require('../database/connection');

const novaPessoa = async (req, res) => {
    const { nome, nomefantasia, cpfcnpj, logradouro, bairro, uf, cidade, cep, numero, ie } = req.body;

    try {
        const result = await client.query(
            `INSERT INTO pessoa (nome, nomefantasia, cpfcnpj, logradouro, bairro, uf, cidade, cep, numero, ie)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [nome, nomefantasia, cpfcnpj, logradouro, bairro, uf, cidade, cep, numero, ie]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar a pessoa' });
    }
};

module.exports = { novaPessoa };
