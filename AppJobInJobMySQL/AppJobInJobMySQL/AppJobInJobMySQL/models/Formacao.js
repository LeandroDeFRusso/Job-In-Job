import { DataTypes } from "sequelize";
import { sequelize } from "../dbconfig";

const Formacao = sequelize.define('Formacao', {
  formacaoId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  universidade: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cursoGraduacao: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  dataInicio: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  dataTermino: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, {
  tableName: 'Formacao',
  timestamps: false,
});

const createFormacaoTable = async () => {
  try {
    await Formacao.sync();
    console.log('Tabela Formacao criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar tabela Formacao:', err);
  }
};

const createFormacao = async (universidade, cursoGraduacao, dataInicio, dataTermino) => {
  try {
    await Formacao.create({
      universidade,
      cursoGraduacao,
      dataInicio,
      dataTermino,
    });
    console.log('Formação inserida com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir Formação:', err);
  }
};

const findByCurriculoId = async (curriculoId) => {
  try {
    const formacoes = await Formacao.findAll({
      where: { curriculoFk: curriculoId },
    });
    return formacoes;
  } catch (err) {
    console.error('Erro ao buscar formações:', err);
    throw err;
  }
};

const formacaoModel = {
  createFormacaoTable,
  createFormacao,
  findByCurriculoId,
};

export default formacaoModel;
