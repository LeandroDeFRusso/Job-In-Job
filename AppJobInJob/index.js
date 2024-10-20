import oracledb from 'oracledb';
import dbConfig from './dbconfig.js';

oracledb.outFormat = oracledb.OBJECT;

export async function getConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error(err);
  }
}
