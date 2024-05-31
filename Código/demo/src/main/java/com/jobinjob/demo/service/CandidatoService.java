package com.jobinjob.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.repository.CandidatoRepository;

@Service
public class CandidatoService {
    
    @Autowired
    CandidatoRepository candidatoRepository;
}
