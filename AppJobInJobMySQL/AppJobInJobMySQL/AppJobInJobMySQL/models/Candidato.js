import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

const Candidato = sequelize.define('Candidato', {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(14),
    primaryKey: true
  },
  dataNascimento: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Candidato',
  timestamps: false
});

const createCandidatoTable = async () => {
  try {
    await Candidato.sync();
    console.log('Tabela Candidato criada (ou já existente).');
  } catch (err) {
    console.error('Erro ao criar tabela Candidato:', err);
  }
};

const checkIfCpfExists = async (cpf) => {
  try {
    const candidato = await Candidato.findOne({ where: { cpf } });
    return !!candidato;
  } catch (err) {
    console.error('Erro ao verificar CPF:', err);
    throw new Error('Erro ao verificar CPF');
  }
};

const createCandidato = async (nome, cpf, dataNascimento, genero, telefone, email, senha) => {
  try {
    await Candidato.create({
      nome,
      cpf,
      dataNascimento,
      genero,
      telefone,
      email,
      senha
    });
    console.log('Candidato inserido com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir candidato:', err);
  }
};

const findCandidatoByEmail = async (email, senha) => {
  try {
    const candidato = await Candidato.findOne({
       where: {
        email: email, 
        senha: senha 
      } 
    });
    if (!candidato) {
      return null;
    }

    if (candidato.senha === senha) {
      return candidato;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Erro ao buscar candidato por e-mail:', err);
    throw err;
  }
};

const candidatoModel = {
  createCandidatoTable,
  createCandidato,
  findCandidatoByEmail,
  checkIfCpfExists
};

export default candidatoModel;
