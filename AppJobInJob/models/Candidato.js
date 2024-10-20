import oracledb from 'oracledb';

const createCandidatoTable = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    const tableExists = await connection.execute(
      `SELECT table_name FROM user_tables WHERE table_name = 'CANDIDATO'`
    );

    if (tableExists.rows.length === 0) {
      await connection.execute(`
        CREATE TABLE CANDIDATO (
          NOME VARCHAR2(100) NOT NULL,
          CPF VARCHAR2(14) PRIMARY KEY,
          DATA_NASCIMENTO DATE NOT NULL,
          GENERO VARCHAR2(20) NOT NULL,
          TELEFONE VARCHAR2(15) NOT NULL,
          EMAIL VARCHAR2(100) NOT NULL,
          SENHA VARCHAR2(100) NOT NULL
        )
      `);
      console.log('Tabela CANDIDATO criada com sucesso.');
    } else {
      console.log('Tabela CANDIDATO já existe.');
    }
  } catch (err) {
    console.error('Erro ao verificar ou criar a tabela:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const createCandidato = async (nome, cpf, dataNascimento, genero, telefone, email, senha) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO CANDIDATO (NOME, CPF, DATA_NASCIMENTO, GENERO, TELEFONE, EMAIL, SENHA)
       VALUES (:nome, :cpf, TO_DATE(:dataNascimento, 'YYYY-MM-DD'), :genero, :telefone, :email, :senha)`,
      { cpf, nome, dataNascimento, genero, email, telefone, senha },
      { autoCommit: true }
    );
    console.log('Candidato inserido com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir candidato:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const getAllCandidatos = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT CPF, NOME, DATA_NASCIMENTO, GENERO, EMAIL, TELEFONE FROM CANDIDATO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar candidatos:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const findCandidatoByEmail = async (email, senha) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    const result = await connection.execute(
      `SELECT * FROM CANDIDATO WHERE EMAIL = :email`,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return null; 
    }

    const candidato = result.rows[0];

    if (candidato.SENHA === senha) {
      return candidato;  
    } else {
      return null; 
    }

  } catch (err) {
    console.error('Erro ao buscar candidato por e-mail:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const candidatoModel = {
  createCandidatoTable,
  createCandidato,
  findCandidatoByEmail,
  getAllCandidatos
};

export default candidatoModel;