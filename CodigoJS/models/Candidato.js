const oracledb = require('../dbconfig').oracledb;

const createCandidatoTable = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection();
    await connection.execute(`
      CREATE TABLE CANDIDATO (
        CPF VARCHAR2(14) PRIMARY KEY,
        NOME VARCHAR2(100) NOT NULL,
        DATA_NASCIMENTO DATE NOT NULL,
        EMAIL VARCHAR2(100) NOT NULL,
        SENHA VARCHAR2(100) NOT NULL,
        TELEFONE VARCHAR2(15) NOT NULL
      )
    `);
    console.log('Tabela CANDIDATO criada com sucesso.');
    await connection.commit();
  } catch (err) {
    console.error('Erro ao criar a tabela:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = {
  createCandidatoTable
};
