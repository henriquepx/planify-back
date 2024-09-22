import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

if (!process.env.DB_URL) {
  console.error('A variável de ambiente DB_URL não foi carregada.');
  process.exit(1);
}

console.log(process.env.DB_URL);

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Definindo o modelo 'User' com o schema 'userdata' e nome de tabela 'DM_USER'
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  schema: 'userdata', // Adicionando a opção schema
  tableName: 'DM_USER' // Nome da tabela desejado
});

// Sincronizando o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabela DM_USER sincronizada no schema userdata');
  })
  .catch(err => console.log('Erro ao sincronizar:', err));

export default User;
