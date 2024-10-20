import empresaModel from '../models/Empresa.js';

export const showAddEmpresa = (req, res) => {
  res.render('empresa/addempresa');
};

export const createEmpresa = async (req, res) => {
    console.log(req.body); // Verifica se os dados estão chegando aqui
    const { nome, cnpj, cidade, estado, email, senha } = req.body;
    try {
      await empresaModel.createEmpresa(nome, cnpj, cidade, estado, email, senha);
      req.flash('success_msg', 'Conta criada com sucesso!')
      res.redirect('/empresa/login');
    } catch (err) {
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
        id: empresa.id,
        email:empresa.email,
        role: 'empresa'
      };
      req.flash('success_msg', 'Login realizado com sucesso!');
      res.redirect('/empresa/visualizarcurriculos');
    } else {
      req.flash('error_msg', 'O e-mail ou senha estão incorretos!');
      res.redirect('/empresa/login');
    }

  } catch (err) {
    req.flash('error_msg', 'Erro ao tentar realizar login!');
    res.redirect('/empresa/login');
  }
};

//Função para validar o login
export const ensureAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.user.role ==='empresa') {
    return next();
  }
  req.flash('error_msg', 'Este endereço é apenas para empresas!');
  res.redirect('/empresa/login');
};

export const visualizarCurriculos = async (req, res) =>{
  try {
    const curriculo = await curriculoModel.findFilterCurriculos(req.session.user.id);
    res.render('empresa/visualizarcurriculos', { curriculo });
  } catch (err) {
    req.flash('error_msg', 'Erro ao carregar os currículos, tente novamente!');
    res.redirect('/empresa/perfil');
  }
};


