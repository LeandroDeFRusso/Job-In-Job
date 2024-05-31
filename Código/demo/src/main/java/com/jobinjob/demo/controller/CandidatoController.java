package com.jobinjob.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobinjob.demo.service.CandidatoService;


@RestController
@RequestMapping("/candidato")
public class CandidatoController {
    
    @Autowired
    CandidatoService candidatoService;
}
