import curriculoModel from '../models/Curriculo.js';

export const showAddCurriculo = (req, res) => {
  res.render('candidato/montarcurriculo');
};

export const montarCurriculo = async (req, res) => {
  const { cidade, estado, area, nomeEmpresa, cargo, dataEntrada, dataSaida, universidade, cursoGraduacao, dataInicio, dataTermino, idioma } = req.body;
  const candidatoId = req.session.user.id;

  try {
    await curriculoModel.montarCurriculo(candidatoId, cidade, estado, area, nomeEmpresa, cargo, dataEntrada, dataSaida, universidade, cursoGraduacao, dataInicio, dataTermino, idioma);
    res.redirect('/candidato/perfilcandidato');
  } catch (err) {
    req.flash('error_msg', 'Erro ao criar o seu currículo, por favor, tente novamente!');
    res.redirect('/candidato/montarcurriculo');
  }
};



export const showMyCurriculo = async (req, res) => {
  const candidatoId = req.session.user.id;

  try {
    const candidato = await curriculoModel.getCandidatoById(candidatoId);
    const curriculo = await curriculoModel.getCurriculoByCandidatoId(candidatoId);

    if (!curriculo) {
      req.flash('error_msg', 'Currículo não encontrado, por favor, tente novamente!');
      return res.redirect('/candidato/perfil');
    }

    const experiencias = await curriculoModel.getExperienciasByCurriculoId(curriculo.id);
    const formacoes = await curriculoModel.getFormacoesByCurriculoId(curriculo.id);

    res.render('candidato/meucurriculo', {
      candidato,
      curriculo,
      experiencias,
      formacoes
    });
  } catch (err) {
    req.flash('error_msg', 'Erro ao buscar currículo, por favor, tente novamente!');
    res.redirect('/candidato/perfil');
  }
};

export const mostrarCurriculos = async (req, res) => {
  try {
    const curriculos = await curriculoModel.getAllCurriculos();
    res.render('empresa/visualizarcurriculos', { curriculos });
  } catch (err) {
    req.flash('error_msg', 'Erro ao mostrar currículos, por favor, tente novamente!');
    res.redirect('/empresa/perfilempresa');
  }
};

export const mostrarCurriculo = async (req, res) => {
  const curriculoId = req.params.id;

  try {
    const curriculo = await curriculoModel.getCurriculoById(curriculoId);
    const candidato = await curriculoModel.getCandidatoByCurriculoId(curriculo.candidatoFk);
    const experiencia = await curriculoModel.getExperienciasByCurriculoId(curriculoId);
    const formacao = await curriculoModel.getFormacoesByCurriculoId(curriculoId);

    console.log(curriculo, candidato);
    if (!curriculo) {
      req.flash('error_msg', 'Currículo não encontrado, tente novamente!');
      return res.redirect('/empresa/perfilempresa');
    }

    res.render('empresa/curriculo', {
      candidato,
      curriculo,
      experiencia,
      formacao,
      curriculoId
    });
  } catch (err) {
    req.flash('error_msg', 'Erro ao buscar currículo, tente novamente!');
    res.redirect('/empresa/perfilempresa');
  }
};

export const perfilCandidato = async (req, res) => {
  const candidatoId = req.session.user.id;
  console.log(candidatoId);

  try {
    const candidato = await curriculoModel.getCandidatoById(candidatoId);
    const curriculo = await curriculoModel.getCurriculoByCandidatoId(candidatoId);

    if (!curriculo) {
      return res.redirect('/candidato/montarcurriculo');
    }
    const experiencia = await curriculoModel.getExperienciasByCurriculoId(curriculo.curriculoId);
    const formacao = await curriculoModel.getFormacoesByCurriculoId(curriculo.curriculoId);

    console.log(candidato, curriculo, experiencia, formacao);

    res.render('candidato/perfilcandidato', { candidato, curriculo, experiencia, formacao });
  } catch (error) {
    console.error('Erro ao buscar dados do candidato:', error);
    req.flash('error_msg', 'Erro ao carregar perfil do candidato, tente novamente!');
    res.redirect('/candidato/login');
  }
};

export const atualizarInformacoes = async (req, res) => {
  const candidatoId = req.session.user.id;
  const {
    telefone, cidade, estado, nomeEmpresa, cargo, dataEntrada, dataSaida,
    universidade, curso, dataInicio, dataTermino, area, idioma
  } = req.body;

  try {
    const candidato = await curriculoModel.atualizarCandidato(candidatoId, { telefone });
    const curriculo = await curriculoModel.atualizarCurriculo(candidatoId, { cidade, estado, area, idioma });
    const experiencia = await curriculoModel.atualizarExperiencia(curriculo.curriculoId, { nomeEmpresa, cargo, dataEntrada, dataSaida });
    const formacao = await curriculoModel.atualizarFormacao(curriculo.curriculoId, { universidade, curso, dataInicio, dataTermino });

    res.render('candidato/perfilcandidato', {
      candidato,
      curriculo,
      experiencia,
      formacao,
    });
  } catch (error) {
    console.error('Erro ao atualizar informações do candidato:', error);
    req.flash('error_msg', 'Erro ao atualizar informações do currículo, tente novamente!');
    res.redirect('/candidato/login');
  }
};

export const renderizarAtualizacao = async (req, res) => {
  const candidatoId = req.session.user.id;

  try {
    const candidato = await curriculoModel.getCandidatoById(candidatoId);
    const curriculo = await curriculoModel.getCurriculoByCandidatoId(candidatoId);
    const experiencia = await curriculoModel.getExperienciasByCurriculoId(curriculo.curriculoId);
    const formacao = await curriculoModel.getFormacoesByCurriculoId(curriculo.curriculoId);

    res.render('candidato/atualizarcandidato', {
      candidato,
      curriculo,
      experiencia,
      formacao
    });
  } catch (error) {
    console.error('Erro ao renderizar página de atualização:', error);
    req.flash('error_msg', 'Erro ao carregar a página de atualização, tente novamente!');
    res.redirect('/candidato/login');
  }
};
