const express = require('express');
const router = express.Router();
const CandidatoController = require('../controllers/CandidatoControllr');

router.get('/candidatos', CandidatoController.getCandidatos)
router.post('/candidato', CandidatoController.createCandidato);

module.exports = router;
