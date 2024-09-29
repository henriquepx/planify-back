import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { email, user_password } = req.body;
    
    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return next(errorHandler(400, 'User already exists'));
        
        // Criptografa a senha do usuário
        const hashedPassword = bcryptjs.hashSync(user_password, 10);
        
        // Cria novo usuário
        const newUser = await User.create({
            email,
            user_password: hashedPassword,
        });

        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, user_password } = req.body;

    try {
        // Procura o usuário pelo email
        const validUser = await User.findOne({ where: { email } });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        // Verifica a senha
        const validPassword = bcryptjs.compareSync(user_password, validUser.user_password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        // Gera o token JWT
        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expira em 1 hora, por exemplo
        });
        
        // Remover a senha antes de enviar a resposta (opcional)
        const { user_password: hashedPassword, ...rest } = validUser.dataValues; // Acessa diretamente 'dataValues'

        // Define o cookie com o token JWT
        res.cookie('access_token', token, {
            httpOnly: true, // O cookie só pode ser acessado via HTTP, não por JavaScript
            secure: process.env.NODE_ENV === 'production', // Envia cookie apenas em conexões HTTPS no ambiente de produção
        })
        .status(200)
        .json({ message: "Login bem-sucedido", user: rest }); // Envia o usuário sem a senha
    } catch (error) {
        next(error);
    }
};
