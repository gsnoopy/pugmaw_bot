const db = require('../database'); // Supondo que database.js esteja no mesmo diretório

// Função para atualizar o saldo de um usuário
async function updateSaldoByUser(nomeUsuario, amountToAdd) {
  try {
    // Consulta SQL para atualizar o saldo do usuário
    const updateSql = 'UPDATE users SET `saldo` = `saldo` + ? WHERE user = ?';

    // Executa a consulta SQL para atualizar o saldo do usuário com base no nome
    const result = await db.query(updateSql, [amountToAdd, nomeUsuario]);

    // Retorna o resultado da consulta
    return result;
  } catch (error) {
    // Se ocorrer um erro, lança o erro para ser tratado pelo código que chama a função
    throw error;
  }
}

// Exporta a função updateSaldoByUser
module.exports = updateSaldoByUser;
