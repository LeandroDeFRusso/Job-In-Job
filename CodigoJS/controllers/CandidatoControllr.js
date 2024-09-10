const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

// Função para buscar todos os candidatos
const getCandidatos = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT cpf, nome, data_nascimento, email, senha, telefone FROM CANDIDATO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar candidatos', details: error.message });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Função para criar um novo candidato
const createCandidato = async (req, res) => {
  const { cpf, nome, dataNascimento, email, telefone } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO CANDIDATO (cpf, nome, data_nascimento, email, senha, telefone)
       VALUES (:cpf, :nome, TO_DATE(:dataNascimento, 'YYYY-MM-DD'), :email, :senha, :telefone)`,
      { cpf, nome, dataNascimento, email, telefone },
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Candidato criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar candidato', details: error.message });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = {
  getCandidatos,
  createCandidato,
};
