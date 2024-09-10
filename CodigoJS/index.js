const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');

oracledb.outFormat = oracledb.OBJECT;

async function getConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error(err);
  }
}