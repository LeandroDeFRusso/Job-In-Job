import oracledb from 'oracledb';

const createEmpresaTable = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    const tableExists = await connection.execute(
      `SELECT table_name FROM user_tables WHERE table_name = 'EMPRESA'`
    );

    if (tableExists.rows.length === 0) {
      await connection.execute(`
        CREATE TABLE EMPRESA (
          NOME_E VARCHAR2(100) NOT NULL,
          CNPJ VARCHAR2(18) PRIMARY KEY,
          CIDADE_E VARCHAR2(100) NOT NULL,
          ESTADO_E VARCHAR2(100) NOT NULL,
          EMAIL_E VARCHAR2(100) NOT NULL,
          SENHA_E VARCHAR2(100) NOT NULL,
          FAVORITO_FK NUMBER,
          CONSTRAINT FK_FAVORITO FOREIGN KEY (FAVORITO_FK) REFERENCES FAVORITO(FAVORITO_ID)
        )
      `);
      console.log('Tabela EMPRESA criada com sucesso.');
    } else {
      console.log('Tabela EMPRESA já existe.');
    }
  } catch (err) {
    console.error('Erro ao verificar ou criar a tabela:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const createEmpresa = async (nome, cnpj, cidade, estado, email, senha) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO EMPRESA (NOME_E, CNPJ, CIDADE_E, ESTADO_E, EMAIL_E, SENHA_E)
       VALUES (:nome, :cnpj, :cidade, :estado, :email, :senha)`,
      { cnpj, nome, cidade, email, estado, senha },
      { autoCommit: true }
    );
    console.log('Empresa inserida com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir Empresa:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const getAllEmpresas = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT CNPJ, NOME_E, CIDADE_E, ESTADO_E, EMAIL_E FROM EMPRESA`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar Empresas:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const findEmpresaByEmail = async (email, senha) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    const result = await connection.execute(
      `SELECT * FROM EMPRESA WHERE EMAIL_E = :email`,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return null;
    }

    const empresa = result.rows[0];

    if (empresa.SENHA_E === senha) {
      return empresa; 
    } else {
      return null;
    }

  } catch (err) {
    console.error('Erro ao buscar empresa por e-mail:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const empresaModel = {
  createEmpresaTable,
  createEmpresa,
  findEmpresaByEmail,
  getAllEmpresas
};

export default empresaModel;