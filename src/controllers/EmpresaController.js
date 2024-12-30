const client = require('../database/connection')

const novaEmpresa = async (req, res) => {
    const {razaosocial, nomefantasia, cpfcnpj, cep, cidade, uf, logradouro, bairro, numero, complemento, telefone, email, ie} = req.body
    try {
        const result = await client.query(
            `INSERT INTO empresa (razaosocial, nomefantasia, cpfcnpj, cep, cidade, uf, logradouro, bairro, numero, complemento, telefone, email, ie)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, 
            [razaosocial, nomefantasia, cpfcnpj, cep, cidade, uf, logradouro, bairro, numero, complemento, telefone, email, ie]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao tentar cadastrar uma empresa' });    
    }
};


module.exports = { novaEmpresa }; 