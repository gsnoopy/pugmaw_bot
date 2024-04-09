const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.HOST, // Endereço do servidor MySQL
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados estabelecida com sucesso.');
});

module.exports = connection;
