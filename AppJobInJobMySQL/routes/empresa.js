import express from 'express';
import { 
  createEmpresa, 
  showAddEmpresa, 
  loginEmpresa, 
  ensureAuthenticated, 
  perfilEmpresa 
} from "../controllers/EmpresaController.js";

import { 
  mostrarCurriculos, 
  mostrarCurriculo 
} from '../controllers/CurriculoController.js';

const router = express.Router();

router.get('/cadastro/adicionar', showAddEmpresa);

router.post('/cadastro/adicionar', createEmpresa);

router.get('/empresa/login', (req, res) => {
  res.render('empresa/loginempresa');
});

router.post('/login', loginEmpresa);

router.get('/visualizarcurriculos', ensureAuthenticated, mostrarCurriculos);

router.get('/curriculo/:id', ensureAuthenticated, mostrarCurriculo);

router.get('/perfilempresa', ensureAuthenticated, perfilEmpresa);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/empresa/login');
  });
});

export default router;
