import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());

app.listen(3000, () => { console.log("Conectado à porta 3000"); });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

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

app.use("/api/user", userRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res)=>{
  res.json({
    message :'API is working!',
  });
});
