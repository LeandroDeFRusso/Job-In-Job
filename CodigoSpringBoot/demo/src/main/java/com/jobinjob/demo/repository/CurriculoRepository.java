package com.jobinjob.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobinjob.demo.model.Curriculo;

public interface CurriculoRepository extends JpaRepository<Curriculo, Long> {
    
}
