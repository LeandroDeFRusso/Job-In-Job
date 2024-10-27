import { DataTypes } from "sequelize";
import { sequelize } from '../dbconfig.js'; 

const Empresa = sequelize.define('Empresa', {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING(18),
    primaryKey: true,
  },
  cidade: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
}, {
  tableName: 'Empresa',
  timestamps: false,
});

const createEmpresaTable = async () => {
  try {
    await Empresa.sync();
    console.log('Tabela Empresa criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar tabela Empresa:', err);
  }
};

const checkIfCnpjExists = async (cnpj) => {
  try {
    const empresa = await Empresa.findOne({ where: { cnpj } });
    return !!empresa;
  } catch (err) {
    console.error('Erro ao verificar CNPJ:', err);
    throw new Error('Erro ao verificar CNPJ');
  }
};

const createEmpresa = async (nome, cnpj, cidade, estado, email, senha) => {
  try {
    await Empresa.create({ nome, cnpj, cidade, estado, email, senha });
    console.log('Empresa inserida com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir Empresa:', err);
  }
};

const findEmpresaByEmail = async (email, senha) => {
  try {
    const empresa = await Empresa.findOne({
      where: {
        email: email, 
        senha: senha 
      } 
    });
    if (!empresa) {
      return null;
    }

    if (empresa.senha === senha) {
      return empresa;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Erro ao buscar empresa por e-mail:', err);
    throw err;
  }
};

const getEmpresaById = async (empresaId) => {
  try {
    const empresa = await Empresa.findByPk(empresaId);
    return empresa;
  } catch (err) {
    console.error('Erro ao buscar empresa por ID:', err);
    throw err;
  }
};

const empresaModel = {
  createEmpresaTable,
  createEmpresa,
  findEmpresaByEmail,
  getEmpresaById,
  checkIfCnpjExists
};

export default empresaModel;
