const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../database/connection');
const SECRET_KEY = process.env.JWT_SECRET || 'chave_default_secreta';

const LoginController = {
    async cadastro(req, res) {
        const { nome, email, senha } = req.body;

        try {
            const userExists = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            if (userExists.rows.length > 0) {
                return res.status(400).json({ message: 'Email já está em uso.' });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);

            await client.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
                [nome, email, hashedPassword]
            );

            res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
    },

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const userResult = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            const user = userResult.rows[0];

            if (!user) {
                return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
            }

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    nome: user.nome,
                },
                SECRET_KEY,
                {
                    expiresIn: '1h',
                }
            );

            res.json({ token, message: 'Login realizado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao realizar login.' });
        }
    }
};

module.exports = LoginController;
