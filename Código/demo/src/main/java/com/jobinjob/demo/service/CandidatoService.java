package com.jobinjob.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Candidato;
import com.jobinjob.demo.repository.CandidatoRepository;

@Service
public class CandidatoService {
    
    @Autowired
    CandidatoRepository candidatoRepository;

    public List<Candidato> listarCandidatos(){
        return candidatoRepository.findAll();
    }

    public Candidato adicionarCandidato(Candidato candidato){
        return candidatoRepository.save(candidato);
    }

    public Candidato atualizarCandidato(String id, Candidato candidato){
        if (candidatoRepository.existsById(id)) {
            candidato.setCpf(id);
            return candidatoRepository.save(candidato);
        }
        return null;
    }

    public boolean deletarCandidato(String id){
        if(candidatoRepository.existsById(id)){
            candidatoRepository.deleteById(id);
            return true;
        }
        return false;
    } 
}
