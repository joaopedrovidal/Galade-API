const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/PessoaController');
const ProdutoController = require('../controllers/ProdutoController');
const CnpjController = require('../controllers/CnpjController');

//Rotas de INSERT
router.post('/novaPessoa', PessoaController.novaPessoa);
router.post('/novoProduto', ProdutoController.novoProduto);

//Rotas de SELECT
router.get('/consultaCnpj/:cnpj', CnpjController.consultaCnpj);


module.exports = router;
