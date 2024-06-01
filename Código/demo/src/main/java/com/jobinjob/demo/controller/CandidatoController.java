package com.jobinjob.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobinjob.demo.model.Candidato;
import com.jobinjob.demo.service.CandidatoService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/candidato")
public class CandidatoController {
    
    @Autowired
    CandidatoService candidatoService;

    @PostMapping("/add")
    public Candidato adicionarCandidato(@Valid @RequestBody Candidato candidato) {
        return candidatoService.adicionarCandidato(candidato);
    }

    @PutMapping("/update/{cpf}")
    public ResponseEntity<?> atualizarCandidato(@PathVariable String cpf, @RequestBody Candidato candidato) {
        if(candidatoService.atualizarCandidato(cpf, candidato) == null) {
            String mensagem = "O cpf " + cpf + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(candidato);
    }

    @GetMapping
    public List<Candidato> listarCandidatos() {
        return candidatoService.listarCandidatos();
    }

    @DeleteMapping("/delete/{cpf}")
    public ResponseEntity<?> deletarCandidato(@PathVariable String cpf) {
        if(candidatoService.deletarCandidato(cpf)) {
            String mensagem = "O cpf " + cpf + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O cpf " + cpf + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
