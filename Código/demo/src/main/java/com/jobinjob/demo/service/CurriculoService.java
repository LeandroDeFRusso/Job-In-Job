package com.jobinjob.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Curriculo;
import com.jobinjob.demo.repository.CurriculoRepository;

@Service
public class CurriculoService {
    
    @Autowired
    CurriculoRepository curriculoRepository;

    public List<Curriculo> listarCurriculos(){
        return curriculoRepository.findAll();
    }

    public Curriculo adicionarCurriculo(Curriculo curriculo){
        return curriculoRepository.save(curriculo);
    }

    public Curriculo atualizarCurriculo(Long id, Curriculo curriculo){
        if (curriculoRepository.existsById(id)) {
            curriculo.setId(id);
            return curriculoRepository.save(curriculo);
        }
        return null;
    }

    public boolean deletrCurriculo(Long id){
        if(curriculoRepository.existsById(id)){
            curriculoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
