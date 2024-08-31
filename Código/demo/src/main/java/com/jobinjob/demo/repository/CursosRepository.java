package com.jobinjob.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobinjob.demo.model.Cursos;

public interface CursosRepository extends JpaRepository<Cursos, Long>{
    
}
