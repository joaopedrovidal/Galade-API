const client = require ('../database/connection')
const axios = require ('axios');
const PessoaController = require('./PessoaController');
const { response } = require('express');

const consultaCnpj = async (req, res) =>{
    const { cnpj } = req.params;

    try {
        const response =  await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);

        if(response.data && response.data.status === 'OK'){
            await PessoaController.cadastrarPessoaComCnpj(response.data);
            res.status(200).json({ message: 'Pessoa cadastrada com sucesso!' });
        } else{
            res.status(400).json({ error: 'CNPJ não encontrado ou inválido' });
        }
    } catch (error) {
        console.error('Erro ao consultar CNPJ:', error.message)
        res.status(500).json({ error: 'Erro ao consultar o CNPJ' });
    }
};

module.exports = { consultaCnpj }
