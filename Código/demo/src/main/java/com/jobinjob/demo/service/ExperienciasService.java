package com.jobinjob.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Experiencias;
import com.jobinjob.demo.repository.ExperienciasRepository;

@Service
public class ExperienciasService {
    
    @Autowired
    ExperienciasRepository experienciasRepository;

    public List<Experiencias> listarExperiencias(){
        return experienciasRepository.findAll();
    }

    public Experiencias adicionarExperiencias (Experiencias experiencias){
        return experienciasRepository.save(experiencias);
    }

    public Experiencias atualizarExperiencias(Long id, Experiencias experiencias){
        if (experienciasRepository.existsById(id)) {
            experiencias.setId(id);
            return experienciasRepository.save(experiencias);
        }
        return null;
    }

    public boolean deletarExperiencias(Long id){
        if (experienciasRepository.existsById(id)) {
            experienciasRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
