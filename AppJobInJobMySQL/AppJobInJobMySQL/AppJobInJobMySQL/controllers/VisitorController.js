import axios from "axios";
import Visitor from "../models/Visitor.js";

export const addVisitor = async (req, res) => {
  try {
    console.log('Requisição para registrar visitante recebida');
    
    const response = await axios.get("https://ipapi.co/json/");
    console.log('IP do visitante:', response.data);
    const { ip, network } = response.data;

    const visitorExists = await Visitor.findOne({ where: { ip } });

    if (!visitorExists) {
        console.log('Visitante novo:', ip, network);
        await Visitor.create({ ip, network });
        res.status(201).json({ message: "Visitante registrado." });
    } else {
      res.status(200).json({ message: "Visitante já registrado." });
    }
  } catch (error) {
    console.error("Erro ao registrar visitante:", error);
    res.status(500).json({ message: "Erro ao registrar visitante." });
  }
};


export const showInicio = async (req, res) => {
    try {
        const visitorCount = await Visitor.count();
        res.render('index', { visitorCount });
    } catch (error) {
        console.error("Erro ao obter contagem de visitantes:", error);
        res.status(500).send("Erro no servidor");
    }
};

export const getVisitorCount = async (req, res) => {
  try {
    const visitorCount = await Visitor.count();
    res.status(200).json({ count: visitorCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao contar visitantes." });
  }
};
