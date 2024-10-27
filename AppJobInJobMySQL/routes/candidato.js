import express from 'express';
import { 
  createCandidato, 
  ensureAuthenticated, 
  loginCandidato, 
  showAddCandidato 
} from '../controllers/CandidatoController.js';

import { 
  montarCurriculo, 
  showAddCurriculo, 
  showMyCurriculo, 
  perfilCandidato, 
  atualizarInformacoes, 
  renderizarAtualizacao 
} from '../controllers/CurriculoController.js';

const router = express.Router();

router.get('/cadastro/adicionar', showAddCandidato);

router.post('/cadastro/adicionar', createCandidato);

router.get('/candidato/login', (req, res) => {
  res.render('candidato/login');
});

router.post('/login', loginCandidato);

router.get('/montarcurriculo', ensureAuthenticated, showAddCurriculo);

router.post('/montarcurriculo', ensureAuthenticated, montarCurriculo);

router.get('/meucurriculo', ensureAuthenticated, showMyCurriculo);

router.get('/perfilcandidato', ensureAuthenticated, perfilCandidato);

router.post('/atualizarcandidato', ensureAuthenticated, atualizarInformacoes);

router.get('/atualizarcandidato', ensureAuthenticated, renderizarAtualizacao);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Erro ao destruir a sessão:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/candidato/login');
  });
});

export default router;
