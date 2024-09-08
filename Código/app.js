const express = require('express');
const db = require('./dbconfig');
const candidatoRoutes = require('./routes/candidato');

const app = express();

app.use(express.json());

db.run; 

app.use('/api', candidatoRoutes);

process.on('SIGINT', async () => {
  process.exit(0);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
