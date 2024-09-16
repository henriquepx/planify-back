import User from '../models/user.model.js';
// pacote de criptografia
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const {username, email, password } = req.body;
    // criptografando a senha de usuário
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save()
        res.status(201).json({message: "Usuário criado com sucesso!"})
    } catch (error) {
        res.status(500).json(error.message)
    }
};  