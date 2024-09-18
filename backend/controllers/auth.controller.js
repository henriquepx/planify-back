import User from '../models/user.model.js';
// pacote de criptografia
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const {email, user_password } = req.body;
    // criptografando a senha de usuário
    const hashedPassword = bcryptjs.hashSync(user_password, 10);
    const newUser = new User({email, user_password: hashedPassword});
    try{
        await newUser.save()
        res.status(201).json({message: "Usuário criado com sucesso!"})
    } catch (error) {
        res.status(500).json(error.message)
    }
};  