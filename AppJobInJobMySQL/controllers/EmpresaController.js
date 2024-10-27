import empresaModel from '../models/Empresa.js';
import curriculoModel from '../models/Curriculo.js';

export const showAddEmpresa = (req, res) => {
  res.render('empresa/addempresa');
};

export const createEmpresa = async (req, res) => {
  console.log(req.body);
  const { nome, cnpj, cidade, estado, email, senha } = req.body;

  try {
    await empresaModel.createEmpresa(
      nome,
      cnpj,
      cidade,
      estado,
      email,
      senha
    );
    req.flash('success_msg', 'Conta criada com sucesso!');
    res.redirect('/empresa/login');
  } catch (err) {
    console.error('Erro ao criar empresa:', err);
    req.flash('error_msg', 'Erro ao criar o cadastro de sua empresa, tente novamente!');
    res.redirect('/empresa/cadastro/adicionar');
  }
};

export const loginEmpresa = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const empresa = await empresaModel.findEmpresaByEmail(email, senha);

    if (empresa) {
      req.session.user = {
        id: empresa.cnpj,
        email: empresa.email,
        role: 'empresa'
      };

      req.flash('success_msg', 'Login realizado com sucesso!');
      res.redirect('/empresa/perfilempresa');
    } else {
      req.flash('error_msg', 'O e-mail ou senha estão incorretos!');
      res.redirect('/empresa/login');
    }
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    req.flash('error_msg', 'Erro ao tentar realizar login!');
    res.redirect('/empresa/login');
  }
};
export const ensureAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'empresa') {
    return next();
  }
  req.flash('error_msg', 'Este endereço é apenas para empresas, faça o login!');
  res.redirect('/empresa/login');
};

export const visualizarCurriculos = async (req, res) => {
  try {
    const curriculos = await curriculoModel.findAll({
      where: {
        empresaId: req.session.user.id
      }
    });

    res.render('empresa/visualizarcurriculos', { curriculos });
  } catch (err) {
    console.error('Erro ao carregar currículos:', err);
    req.flash('error_msg', 'Erro ao carregar os currículos, tente novamente!');
    res.redirect('/empresa/perfil');
  }
};

export const perfilEmpresa = async (req, res) => {
  const empresaId = req.session.user.id;

  try {
    const empresa = await empresaModel.getEmpresaById(empresaId);

    if (!empresa) {
      req.flash('error_msg', 'Perfil da empresa não encontrado!');
      return res.redirect('/empresa/login');
    }
    res.render('empresa/perfilempresa', { empresa });
  } catch (error) {
    console.error('Erro ao buscar dados da empresa:', error);
    req.flash('error_msg', 'Erro ao carregar perfil da empresa, tente novamente!');
    res.redirect('/empresa/login');
  }
};
