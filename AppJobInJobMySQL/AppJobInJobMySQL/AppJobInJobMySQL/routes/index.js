import express from 'express';
import { addVisitor, getVisitorCount, showInicio } from "../controllers/VisitorController.js";

const router = express.Router();

router.post('/add-visitor', addVisitor);
router.get('/visitor-count', getVisitorCount);

router.get('/', showInicio);

router.get('/candidato/login', (req, res) => {
    res.render('candidato/logincandidato');
});

router.get('/candidato/cadastro/adicionar', (req, res) => {
    res.render('candidato/addcandidato');
});

router.get('/empresa/cadastro/adicionar', (req, res) => {
    res.render('empresa/addempresa');
});

router.get('/empresa/login', (req, res) => {
    res.render('empresa/loginempresa');
});

export default router;
