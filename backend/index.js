import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Conectado à porta 3000");
});


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Use com cuidado em produção
  },
});


// Função para conectar ao banco de dados com lógica de reconexão
async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('Conexão bem-sucedida ao banco de dados');
    client.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  }
}

connectToDatabase();

// Define as rotas da API
app.use("/api/user", userRoute);
app.use('/api/auth', authRoute);

// Rota principal da API
app.get('/', (req, res) => {
  res.json({
    message: 'API is working!',
  });
});
