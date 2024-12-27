const client = require ('../database/connection')

const novoProduto = async (req, res) => {
    const {nome, valor, un, estoque, ncm, cest, gtin, grupo} = req.body;

    try {
        const result = await client.query(
            `INSERT INTO produto (nome, valor, un, estoque, ncm, cest, gtin, grupo)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [nome, valor, un, estoque, ncm, cest, gtin, grupo]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao tentar realizar o cadastro do produto. Verifique se todos os campos obrigatórios estão preenchidos." });
    }
}


module.exports = { novoProduto };