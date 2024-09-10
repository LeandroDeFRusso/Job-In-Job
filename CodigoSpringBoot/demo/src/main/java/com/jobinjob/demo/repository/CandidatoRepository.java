package com.jobinjob.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobinjob.demo.model.Candidato;



public interface CandidatoRepository extends JpaRepository<Candidato, String>{

}
