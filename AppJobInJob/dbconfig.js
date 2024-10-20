import oracledb from 'oracledb';

// Configurações do banco de dados Oracle
const dbConfig = {
  user: "system",             
  password: "1209200412Le@",           
  connectionString: "localhost/xepdb1"  
};

export async function initialize() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectionString
    });

    console.log('Pool de conexões Oracle inicializado com sucesso.');
  } catch (err) {
    console.error('Erro ao inicializar pool de conexões Oracle:', err);
    throw err;
  }
}

export async function close() {
  try {
    await oracledb.getPool().close(0);
    console.log('Pool de conexões Oracle fechado com sucesso.');
  } catch (err) {
    console.error('Erro ao fechar pool de conexões Oracle:', err);
  }
}

export async function getConnection() {
  try {
    return await oracledb.getConnection();
  } catch (err) {
    console.error('Erro ao obter conexão do pool:', err);
    throw err;
  }
}

export default dbConfig;

