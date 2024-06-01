package com.jobinjob.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobinjob.demo.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, String> {
    
}
