import { Sequelize } from 'sequelize';
import dbConfig from './dbconfig.js';

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
});

export const getConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o MySQL estabelecida com sucesso.');
    return sequelize;
  } catch (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    throw err;
  }
};
