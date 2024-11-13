import express from 'express';
import visitController from '../controllers/VisitController.js';

const router = express.Router();

export const showInicio = (req, res) => {
    res.render('index'); 
};

router.get('/', visitController.incrementAndShowVisitCount);

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
