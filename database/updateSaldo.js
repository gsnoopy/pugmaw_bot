const db = require('../database');


async function updateSaldoByUser(nomeUsuario, amountToAdd) {
  try {

    const updateSql = 'UPDATE users SET `saldo` = `saldo` + ? WHERE user = ?';
    const result = await db.query(updateSql, [amountToAdd, nomeUsuario]);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = updateSaldoByUser;
