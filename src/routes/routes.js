const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/PessoaController');
const ProdutoController = require('../controllers/ProdutoController');
const CnpjController = require('../controllers/CnpjController');
const EmpresaController = require('../controllers/EmpresaController');
const LoginController = require('../controllers/LoginController');

//Rotas de INSERT
router.post('/novaPessoa', PessoaController.novaPessoa);
router.post('/novoProduto', ProdutoController.novoProduto);
router.post('/novaEmpresa', EmpresaController.novaEmpresa);
router.post('/login', LoginController.login);
router.post('/cadastro', LoginController.cadastro);

//Rotas de SELECT
router.get('/consultaCnpj/:cnpj', CnpjController.consultaCnpj);


module.exports = router;
