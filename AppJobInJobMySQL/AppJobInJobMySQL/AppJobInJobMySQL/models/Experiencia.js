import { DataTypes } from "sequelize";
import { sequelize } from "../dbconfig";

const Experiencia = sequelize.define('Experiencia', {
  experienciaId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  curriculoFk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Curriculo',
      key: 'curriculoId',
    },
  },
  nomeEmpresa: {
    type: DataTypes.STRING(100),
  },
  cargo: {
    type: DataTypes.STRING(120),
  },
  dataEntrada: {
    type: DataTypes.STRING(10),
  },
  dataSaida: {
    type: DataTypes.STRING(10),
  }
}, {
  tableName: 'Experiencia',
  timestamps: false,
});

const createExperienciaTable = async () => {
  try {
    await Experiencia.sync();
    console.log('Tabela Experiencia criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar tabela Experiencia:', err);
  }
};

const createExperiencia = async (curriculoFk, nomeEmpresa, cargo, dataEntrada, dataSaida) => {
  try {
    await Experiencia.create({
      curriculoFk,
      nomeEmpresa,
      cargo,
      data_entrada,
      data_saida,
    });
    console.log('Experiencia inserida com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir Experiencia:', err);
  }
};

const findByCurriculoId = async (curriculoId) => {
  try {
    const experiencias = await Experiencia.findAll({
      where: { curriculoFk: curriculoId },
    });
    return experiencias;
  } catch (err) {
    console.error('Erro ao buscar experiências:', err);
    throw err;
  }
};

const experienciaModel = {
  createExperienciaTable,
  createExperiencia,
  findByCurriculoId,
};

export default experienciaModel;
