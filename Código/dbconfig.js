const oracledb = require('oracledb');

async function run() {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "system",
            password: "1327",
            connectionString: "localhost:1521/XEPDB1"
        });

        console.log('Conectado ao banco de dados Oracle!');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();