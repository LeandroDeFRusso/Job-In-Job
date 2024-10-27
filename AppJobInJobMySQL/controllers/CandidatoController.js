import candidatoModel from '../models/Candidato.js';

export const showAddCandidato = (req, res) => {
  res.render('candidato/addcandidato');
};

export const createCandidato = async (req, res) => {
  const { nome, cpf, dataNascimento, genero, telefone, email, senha } = req.body;
  try {
    const cpfExists = await candidatoModel.checkIfCpfExists(cpf);
    
    if (cpfExists) {
      req.flash('error_msg', 'CPF já cadastrado! Por favor, use outro CPF.');
      return res.redirect('/candidato/cadastro/adicionar');
    }

    await candidatoModel.createCandidato(
      nome,
      cpf,
      dataNascimento,
      genero,
      telefone,
      email,
      senha
    );
    
    req.flash('success_msg', 'Conta criada com sucesso!!');
    res.redirect('/candidato/login');
  } catch (err) {
    req.flash('error_msg', 'Erro ao criar o seu cadastro de usuário, tente novamente!');
    res.redirect('/candidato/cadastro/adicionar');
  }
};

export const loginCandidato = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const candidato = await candidatoModel.findCandidatoByEmail(email, senha);

    if (candidato && candidato.senha === senha) {
      req.session.user = {
        id: candidato.cpf,
        email: candidato.email,
        role: 'candidato'
      };
      req.flash('success_msg', 'Login Realizado com Sucesso!');
      res.redirect('/candidato/perfilcandidato');
    } else {
      req.flash('error_msg', 'O e-mail ou senha estão incorretos!');
      res.redirect('/candidato/login');
    }

  } catch (err) {
    req.flash('error_msg', 'Erro ao tentar realizar login!');
    res.redirect('/candidato/login');
  }
};

export const ensureAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'candidato') {
    return next();
  }
  req.flash('error_msg', 'Este endereço é apenas para candidatos!');
  res.redirect('/candidato/login');
};
