package com.jobinjob.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobinjob.demo.model.Formacao;

public interface FormacaoRepository extends JpaRepository<Formacao, Long> {
    
}
