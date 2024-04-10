const db = require('../database'); 


async function createKey(chave, valor) {
  try {

    const insertSql = 'INSERT INTO cupons (chave, valor) VALUES (?, ?)';
    const result = await db.query(insertSql, [chave, valor]);
    
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = createKey;
