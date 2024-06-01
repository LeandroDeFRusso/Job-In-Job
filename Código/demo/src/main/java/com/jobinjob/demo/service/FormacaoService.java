package com.jobinjob.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Formacao;
import com.jobinjob.demo.repository.FormacaoRepository;

@Service
public class FormacaoService {
    
    @Autowired
    FormacaoRepository formacaoRepository;

    public List<Formacao> listarFormacaos(){
        return formacaoRepository.findAll();
    }

    public Formacao adicionFormacao(Formacao formacao){
        return formacaoRepository.save(formacao);
    }

    public Formacao atualizarFormacao(Long id, Formacao formacao){
        if (formacaoRepository.existsById(id)) {
            formacao.setId(id);
            return formacaoRepository.save(formacao);
        }
        return null;
    }

    public boolean deletarFormacao(Long id){
        if (formacaoRepository.existsById(id)) {
            formacaoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
