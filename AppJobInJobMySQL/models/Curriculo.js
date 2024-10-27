import { DataTypes, where } from 'sequelize';
import { sequelize } from '../dbconfig.js';

const Curriculo = sequelize.define('Curriculo', {
  curriculoId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  candidatoFk: {
    type: DataTypes.STRING(14),
    allowNull: false,
    references: {
      model: 'Candidato', 
      key: 'cpf', 
    },
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  area: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  idioma: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'CURRICULO',
  timestamps: false
});

const Candidato = sequelize.define('Candidato', {
  cpf: {
    type: DataTypes.STRING(14),
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100)
  },
  dataNascimento: {
    type: DataTypes.STRING(15)
  },
  genero: {
    type: DataTypes.STRING(20)
  },
  telefone: {
    type: DataTypes.STRING(15)
  },
  email: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'CANDIDATO',
  timestamps: false
});

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

const createCurriculoTable = async () => {
  try {
    await Curriculo.sync({ alter: true });
    console.log('Tabela CURRICULO está pronta.');
  } catch (err) {
    console.error('Erro ao criar a tabela CURRICULO:', err);
  }
};

const getAllCurriculos = async () => {
  try {
    const query = `
      SELECT 
        c.nome, 
        c.dataNascimento, 
        c.telefone, 
        cu.*
      FROM 
        curriculo cu
      INNER JOIN 
        candidato c ON cu.candidatofk = c.cpf
    `;

    const curriculo = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(curriculo);
    return curriculo;
  } catch (err) {
    console.error('Erro ao buscar currículos:', err);
    throw err;
  }
};


const montarCurriculo = async (candidatoId, cidade, estado, area, nomeEmpresa, cargo, dataEntrada, dataSaida, universidade, cursoGraduacao, dataInicio, dataTermino, idioma) => {
  const transaction = await sequelize.transaction();

  try {
    if (!candidatoId || !cidade || !estado || !area || !universidade || !cursoGraduacao || !dataInicio) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const novoCurriculo = await Curriculo.create({
      candidatoFk: candidatoId,
      cidade,
      estado,
      area,
      idioma
    }, { transaction });

    const curriculoId = novoCurriculo.curriculoId;

    await sequelize.query(`
      INSERT INTO EXPERIENCIA (CURRICULOFK, NOMEEMPRESA, CARGO, DATAENTRADA, DATASAIDA)
      VALUES (:curriculoId, :nomeEmpresa, :cargo, :dataEntrada, :dataSaida)
    `, {
      replacements: { curriculoId, nomeEmpresa, cargo, dataEntrada, dataSaida },
      transaction
    });

    await sequelize.query(`
      INSERT INTO FORMACAO (CURRICULOFK, UNIVERSIDADE, CURSOGRADUACAO, DATAINICIO, DATATERMINO)
      VALUES (:curriculoId, :universidade, :cursoGraduacao, :dataInicio, :dataTermino)
    `, {
      replacements: { curriculoId, universidade, cursoGraduacao, dataInicio, dataTermino },
      transaction
    });

    await transaction.commit();
    console.log('Currículo criado com sucesso.');
  } catch (err) {
    await transaction.rollback();
    console.error('Erro ao criar currículo:', err);
    throw err;
  }
};

const getCurriculoByCandidatoId = async (candidatoId) => {
  try {
    const curriculo = await Curriculo.findOne({
      where: { candidatoFk: candidatoId }
    });
    return curriculo;
  } catch (err) {
    console.error('Erro ao buscar currículo por candidato:', err);
    throw err;
  }
};

const getCandidatoById = async (candidatoId) => {
  try {
    const candidato = await Candidato.findOne({
      where: { cpf: candidatoId },
      attributes: ['cpf', 'nome', 'dataNascimento', 'genero', 'telefone', 'email']
    });
    return candidato;
  } catch (err) {
    console.error('Erro ao buscar candidato:', err);
    throw err;
  }
};

const getExperienciasByCurriculoId = async (curriculoId) => {
  try {
    const experiencias = await Experiencia.findOne({
      where: { curriculoFk: curriculoId },
      attributes: ['nomeEmpresa', 'cargo', 'dataEntrada', 'dataSaida']
    });
    return experiencias;
  } catch (err) {
    console.error('Erro ao buscar experiências por currículo:', err);
    throw err; 
  }
};

const getFormacoesByCurriculoId = async (curriculoId) => {
  try {
    const formacao = await Formacao.findOne({
      where: { curriculoFk: curriculoId },
      attributes: ['universidade', 'cursoGraduacao', 'dataInicio', 'dataTermino']
    });
    return formacao;
  } catch (err) {
    console.error('Erro ao buscar formações por currículo:', err);
    throw err;
  }
};

const getCurriculoById = async (curriculoId) => {
  try {
    const curriculo = await Curriculo.findOne({
      where: { curriculoId }
    });
    return curriculo;
  } catch (err) {
    console.error('Erro ao buscar currículo por ID:', err);
    throw err;
  }
};


const getCandidatoByCurriculoId = async (curriculoId) => {
  try {
    const candidato = await Candidato.findOne({
      where: { cpf: curriculoId},
      attributes: ['nome', 'email', 'telefone', 'dataNascimento', 'genero']
    });
    return candidato;
  } catch (err) {
    console.error('Erro ao buscar candidato pelo ID do currículo:', err);
    throw err;
  }
};

const atualizarCandidato = async (cpf, dadosAtualizados) => {
  try {
    const candidatoExistente = await Candidato.findOne({
      where: { cpf }
    });

    if (!candidatoExistente) {
      console.log(`Nenhuma candidato encontrada.`);
      return null; 
    }

    const resultado = await Candidato.update(dadosAtualizados, {
      where: { cpf }
    });

    if (resultado === 0) {
      throw new Error(`Falha ao atualizar candidato.`);
    }

    const candidatoAtualizada = await Candidato.findOne({
      where: { cpf }
    });

    return candidatoAtualizada;
  } catch (err) {
    console.error('Erro ao atualizar candidato:', err);
    throw err;
  }
};

const atualizarCurriculo = async (cpf, dadosAtualizados) => {
  try {
    const curriculoExistente = await Curriculo.findOne({
      where: { candidatoFk: cpf }
    });

    if (!curriculoExistente) {
      console.log(`Nenhum currículo encontrado para o candidato com CPF ${cpf}.`);
      return null; 
    }

    const resultado = await Curriculo.update(dadosAtualizados, {
      where: { candidatoFk: cpf }
    });

    if (resultado === 0) {
      throw new Error(`Falha ao atualizar o currículo para o candidato com CPF ${cpf}.`);
    }

    const curriculoAtualizado = await Curriculo.findOne({
      where: { candidatoFk: cpf }
    });

    return curriculoAtualizado;
  } catch (err) {
    console.error('Erro ao atualizar currículo:', err);
    throw err;
  }
};

const atualizarExperiencia = async (curriculoFk, dadosAtualizados) => {
  try {
    const experienciaExistente = await Experiencia.findOne({
      where: { curriculoFk }
    });

    if (!experienciaExistente) {
      console.log(`Nenhuma experiencia encontrada.`);
      return null; 
    }

    const resultado = await Experiencia.update(dadosAtualizados, {
      where: { curriculoFk }
    });

    if (resultado === 0) {
      throw new Error(`Falha ao atualizar experiencia.`);
    }

    const experienciaAtualizada = await Experiencia.findOne({
      where: { curriculoFk }
    });

    return experienciaAtualizada;
  } catch (err) {
    console.error('Erro ao atualizar experiência:', err);
    throw err;
  }
};

const atualizarFormacao = async (curriculoFk, dadosAtualizados) => {
  try {
    const formacaoExistente = await Formacao.findOne({
      where: { curriculoFk }
    });

    if (!formacaoExistente) {
      console.log(`Nenhuma formacao encontrada.`);
      return null; 
    }

    const resultado = await Formacao.update(dadosAtualizados, {
      where: { curriculoFk }
    });

    if (resultado === 0) {
      throw new Error(`Falha ao atualizar formacao.`);
    }

    const formacaoAtualizada = await Formacao.findOne({
      where: { curriculoFk }
    });

    return formacaoAtualizada;
  } catch (err) {
    console.error('Erro ao atualizar formação:', err);
    throw err;
  }
};

const curriculoModel = {
  createCurriculoTable,
  getAllCurriculos,
  montarCurriculo, 
  getCurriculoByCandidatoId,
  getCandidatoById, 
  getExperienciasByCurriculoId, 
  getFormacoesByCurriculoId,
  getCurriculoById,
  getCandidatoByCurriculoId,
  atualizarCandidato,
  atualizarCurriculo,
  atualizarExperiencia,
  atualizarFormacao
};

export default curriculoModel;
