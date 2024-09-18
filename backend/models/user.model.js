import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize'; // Certifique-se de que Sequelize é importado

dotenv.config();  // Carrega as variáveis de ambiente

// Verifica se a variável de ambiente está sendo carregada corretamente
if (!process.env.DB_URL) {
  console.error('A variável de ambiente DB_URL não foi carregada.');
  process.exit(1);  // Encerra o processo se a variável não estiver definida
}

console.log(process.env.DB_URL);  // Verifica se a variável está correta

// Inicializando a instância do Sequelize com a URL do banco de dados
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,         // Requer SSL para conexão
      rejectUnauthorized: false // Não rejeita certificados autoassinados (comum em alguns provedores)
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Definindo o modelo 'User'
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,  // Representa VARCHAR no banco
    allowNull: false,
    unique: true
  },
  user_password: {
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
