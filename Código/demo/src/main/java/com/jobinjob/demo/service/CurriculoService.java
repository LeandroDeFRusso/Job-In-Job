package com.jobinjob.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Candidato;
import com.jobinjob.demo.model.Curriculo;
import com.jobinjob.demo.model.Formacao;
import com.jobinjob.demo.repository.CandidatoRepository;
import com.jobinjob.demo.repository.CurriculoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CurriculoService {

    @Autowired
    CurriculoRepository curriculoRepository;

    @Autowired
    CandidatoRepository candidatoRepository;

    public Curriculo criarCurriculo(String candidatoCpf,Formacao formacao ,Curriculo curriculo) {
        curriculoRepository.save(curriculo);
        Optional<Candidato> candidato = candidatoRepository.findById(candidatoCpf);
        if (candidato.isPresent()) {
            curriculo.setCandidato(candidato.get());

            if (formacao != null) {
                formacao.setCurriculo(curriculo);
                curriculo.getFormacoes().add(formacao);
            }

            return curriculoRepository.save(curriculo);
        } else {
            throw new EntityNotFoundException("Candidato não encontrado.");
        }
    }

    public List<Curriculo> listarCurriculos(){
        return curriculoRepository.findAll();
    }

    public Curriculo atualizarCurriculo(Long id, Curriculo curriculo){
        if (curriculoRepository.existsById(id)) {
            curriculo.setId(id);
            return curriculoRepository.save(curriculo);
        }
        return null;
    }

    public boolean deletarCurriculo(Long id){
        if(curriculoRepository.existsById(id)){
            curriculoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

