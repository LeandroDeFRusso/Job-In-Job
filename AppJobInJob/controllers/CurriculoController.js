import curriculoModel from '../models/Curriculo.js';

export const showAddCurriculo = (req, res) => {
  res.render('candidato/montarcurriculo');
};

export const montarCurriculo = async (req, res) => {
  const { cidade, estado, area, nomeEmpresa, cargo, dataEntrada, dataSaida, universidade, cursoGraduacao, dataInicio, dataTermino, idioma } = req.body;
  const candidatoId = req.session.user.id; 
  try {
    await curriculoModel.montarCurriculo( candidatoId, cidade, estado, area, nomeEmpresa, cargo, dataEntrada, dataSaida, universidade, cursoGraduacao, dataInicio, dataTermino, idioma);
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

    const experiencias = await curriculoModel.getExperienciasByCurriculoId(curriculo.CURRICULO_ID);
    const formacoes = await curriculoModel.getFormacoesByCurriculoId(curriculo.CURRICULO_ID);

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
      res.redirect('/empresa/perfil');
  }
};

export const mostrarCurriculo = async (req, res) => {
  const curriculoId = req.params.id;
  try {
      const curriculo = await curriculoModel.getCurriculoById(curriculoId);
      const candidato = await curriculoModel.getCandidatoByCurriculoId(curriculoId);
      const experiencias = await curriculoModel.getExperienciasByCurriculoId(curriculoId);
      const formacoes = await curriculoModel.getFormacoesByCurriculoId(curriculoId);

      if (!curriculo) {
        req.flash('error_msg', 'Currículo não encontrado, tente novamente!');
        return res.redirect('/empresa/perfil');
      }

      res.render('empresa/curriculo', {
          candidato,
          curriculo,
          experiencias,
          formacoes,
          curriculoId: curriculoId
      });
  } catch (err) {
      req.flash('error_msg', 'Erro ao buscar currículo, tente novamente!');
      res.redirect('/empresa/perfil');
  }
};

export const perfilCandidato = async (req, res) => {
  const candidatoId = req.session.user.id;

  try {
      const candidato = await curriculoModel.getCandidatoById(candidatoId);
      const curriculo = await curriculoModel.getCurriculoByCandidatoId(candidatoId);

      if (!curriculo) {
        return res.redirect('/candidato/montarcurriculo');
    }

      const experiencias = await curriculoModel.getExperienciasByCurriculoId(curriculo.CURRICULO_ID);
      const formacoes = await curriculoModel.getFormacoesByCurriculoId(curriculo.CURRICULO_ID);

      res.render('candidato/perfilcandidato', { candidato, curriculo, experiencias, formacoes });
  } catch (error) {
      console.error('Erro ao buscar dados do candidato:', error);
      req.flash('error_msg', 'Erro ao carregar perfil do candidato, tente novamente!');
      res.redirect('/candidato/login');
  }
};

export const atualizarInformacoes = async (req, res) => {
  const candidatoId = req.session.user.id; // ID do candidato logado da sessão
  console.log('Dados recebidos:', req.body); // Log dos dados recebidos

  const {
      telefone,
      cidade,
      estado,
      nomeEmpresa,
      cargo,
      dataEntrada,
      dataSaida,
      universidade,
      curso,
      dataInicio,
      dataTermino,
      area,
      idioma,
  } = req.body;

  try {
      // Atualiza informações pessoais
      const candidato = await curriculoModel.atualizarCandidato(candidatoId, { telefone });
      console.log('Candidato atualizado:', candidato); // Log do candidato atualizado

      // Atualiza currículo
      const curriculo = await curriculoModel.atualizarCurriculo(candidatoId, { cidade, estado, area, idioma });
      console.log('Currículo atualizado:', curriculo); // Log do currículo atualizado

      // Atualiza experiência
      const experiencias = await curriculoModel.atualizarExperiencia(curriculo.CURRICULO_ID, { nomeEmpresa, cargo, dataEntrada, dataSaida });
      console.log('Experiências atualizadas:', experiencias); // Log das experiências atualizadas

      // Atualiza formação
      const formacoes = await curriculoModel.atualizarFormacao(curriculo.CURRICULO_ID, { universidade, curso, dataInicio, dataTermino });
      console.log('Formações atualizadas:', formacoes); // Log das formações atualizadas

      // Renderiza a página de atualização com as informações atualizadas
      res.render('candidato/perfilcandidato', {
          candidato,
          curriculo,
          experiencias,
          formacoes,
      });
  } catch (error) {
      console.error('Erro ao atualizar informações do candidato:', error);
      res.status(500).send('Erro ao atualizar informações.');
  }
};

export const renderizarAtualizacao = async (req, res) => {
  const candidatoId = req.session.user.id; // Obtenha o ID do candidato logado
  try {
      const candidato = await curriculoModel.getCandidatoById(candidatoId);
      const curriculo = await curriculoModel.getCurriculoByCandidatoId(candidatoId);
      const experiencias = await curriculoModel.getExperienciasByCurriculoId(curriculo.CURRICULO_ID);
      const formacoes = await curriculoModel.getFormacoesByCurriculoId(curriculo.CURRICULO_ID);

      res.render('candidato/atualizarcandidato', {
          candidato,
          curriculo,
          experiencias,
          formacoes
      });
  } catch (error) {
      console.error('Erro ao renderizar página de atualização:', error);
      res.status(500).send('Erro ao renderizar página de atualização.');
  }
};