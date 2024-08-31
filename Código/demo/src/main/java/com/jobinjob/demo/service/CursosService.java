package com.jobinjob.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Cursos;
import com.jobinjob.demo.repository.CursosRepository;

@Service
public class CursosService {
    
    @Autowired
    CursosRepository cursosRepository;

    public List<Cursos> listarCursoss(){
        return cursosRepository.findAll();
    }

    public Cursos adicionarCursos(Cursos cursos){
        return cursosRepository.save(cursos);
    }

    public Cursos atualizarCursos(Long id, Cursos cursos){
        if (cursosRepository.existsById(id)) {
            cursos.setId(id);
            return cursosRepository.save(cursos);
        }
        return null;
    }

    public boolean deletarCursos(Long id){
        if(cursosRepository.existsById(id)){
            cursosRepository.deleteById(id);
            return true;
        }
        return false;
    } 
}
