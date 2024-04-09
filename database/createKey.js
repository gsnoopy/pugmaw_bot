const db = require('../database'); // Supondo que database.js esteja no mesmo diretório
const crypto = require('crypto');

// Função para criar chaves na tabela de cupons
async function createKey(chave, valor) {
    
  try {
    // Consulta SQL para inserir uma nova linha na tabela de cupons
    const insertSql = 'INSERT INTO cupons (chave, valor) VALUES (?, ?)';

    const result = await db.query(insertSql, [chave,valor]);

    return result;
  } catch (error) {
    // Se ocorrer um erro, lança o erro para ser tratado pelo código que chama a função
    throw error;
  }
}

// Exporta a função createKey
module.exports = createKey;
