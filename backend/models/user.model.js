import dotenv from 'dotenv';
const { Sequelize, DataTypes } = require('sequelize');
dotenv.config();  // Carrega as variáveis de ambiente

console.log(process.env.DB_URL);  // Verifica se a variável está sendo carregada

const sequelize = new Sequelize(process.env.DB_URL);

// Definindo o modelo 'User'
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,  // Representa VARCHAR no banco
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,  // Representa VARCHAR no banco
    allowNull: false
  }
}, { 
  timestamps: true  // Adiciona as colunas 'createdAt' e 'updatedAt'
});

// Sincronizando o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabela de usuários sincronizada');
  })
  .catch(err => console.log('Erro ao sincronizar:', err));

// Agora a variável 'User' está pronta para ser utilizada
export default User;
