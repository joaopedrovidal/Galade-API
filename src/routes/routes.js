const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/PessoaController');

router.post('/novaPessoa', PessoaController.novaPessoa);

module.exports = router;
