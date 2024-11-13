import visitModel from '../models/Visit.js';

const incrementAndShowVisitCount = async (req, res) => {
  try {
    // Chama o método do modelo para incrementar o contador e obter o valor atualizado
    const visitCount = await visitModel.incrementAndGetCount();
    
    // Renderiza a página com o contador atualizado
    res.render('index', { visitCount });
  } catch (error) {
    console.error('Erro ao incrementar contador de visitas:', error);
    res.status(500).send('Erro ao processar o contador de acessos');
  }
};

export default { incrementAndShowVisitCount };
