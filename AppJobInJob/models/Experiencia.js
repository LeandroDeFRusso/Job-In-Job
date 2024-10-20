import oracledb from 'oracledb';

const createExperienciaTable = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    const tableExists = await connection.execute(
      `SELECT table_name FROM user_tables WHERE table_name = 'EXPERIENCIA'`
    );

    if (tableExists.rows.length === 0) {
      await connection.execute(`
        CREATE TABLE EXPERIENCIA (
          EXPERIENCIA_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          CURRICULO_FK NUMBER NOT NULL,
          NOME_EMPRESA VARCHAR2(100),
          CARGO VARCHAR2(120),
          DATA_ENTRADA DATE,
          DATA_SAIDA DATE,
          CONSTRAINT FK_CURRICULO FOREIGN KEY (CURRICULO_FK) REFERENCES CURRICULO(CURRICULO_ID),
        )
      `);
      console.log('Tabela EXPERIENCIA criada com sucesso.');
    } else {
      console.log('Tabela EXPERIENCIA já existe.');
    }
  } catch (err) {
    console.error('Erro ao verificar ou criar a tabela:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const createExperiencia = async (curriculoFk, nomeEmpresa, cargo, dataEntrada, dataSaida) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO EXPERIENCIA (CURRICULO_FK, NOME_EMPRESA, CARGO, DATA_ENTRADA, DATA_SAIDA )
       VALUES (:curriculoFk, :nomeEmpresa, :cargo, TO_DATE(:dataEntrada, 'YYYY-MM-DD'), TO_DATE(:dataSaida, 'YYYY-MM-DD'))`,
      { curriculoFk, nomeEmpresa, cargo, dataEntrada, dataSaida  },
      { autoCommit: true }
    );
    console.log('Experiencia inserido com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir Experiencia:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const getAllExperiencias = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT EXPERIENCIA_ID, NOME_EMPRESA, CARGO, DATA_ENTRADA, DATA_SAIDA  FROM EXPERIENCIA`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar Experiencias:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const findByCurriculoId = async (curriculoId) => {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM EXPERIENCIA WHERE CURRICULO_FK = :curriculoId`,
      [curriculoId]
    );
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar experiências:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Erro ao fechar conexão:', err);
      }
    }
  }
};

const experienciaModel = {
  createExperienciaTable,
  createExperiencia,
  getAllExperiencias,
  findByCurriculoId
};

export default experienciaModel;