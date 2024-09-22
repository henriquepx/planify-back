import User from '../models/user.model.js';
// pacote de criptografia
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const {email, user_password } = req.body;
    // criptografando a senha de usuário
    const hashedPassword = bcryptjs.hashSync(user_password, 10);
    const newUser = new User({email, user_password: hashedPassword});
    try{
        await newUser.save()
        res.status(201).json({message: "Usuário criado com sucesso!"})
    } catch (error) {
        next(error);
    }
};  