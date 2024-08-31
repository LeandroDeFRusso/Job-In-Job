package com.jobinjob.demo.controller;

import java.util.List;


import com.jobinjob.demo.model.Cursos;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobinjob.demo.model.Curriculo;
import com.jobinjob.demo.model.Formacao;
import com.jobinjob.demo.service.CurriculoService;
import com.jobinjob.demo.model.Experiencias;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {
    
    @Autowired
    CurriculoService curriculoService;

    @PostMapping("/add/{candidatoCpf}")
    public ResponseEntity<Curriculo> criarCurriculo(@Valid @PathVariable String candidatoCpf, @RequestBody Formacao formacao, @RequestBody Curriculo curriculo, @RequestBody Experiencias experiencias, @RequestBody Cursos cursos) {
        Curriculo c = curriculoService.criarCurriculo(candidatoCpf, formacao, curriculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizarCurriculo(@Valid @PathVariable Long id, @RequestBody Curriculo curriculo) {
        if(curriculoService.atualizarCurriculo(id, curriculo) == null) {
            String mensagem = "O id " + id + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(curriculo);
    }

    @GetMapping
    public List<Curriculo> listarCurriculos() {
        return curriculoService.listarCurriculos();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletarCurriculo(@Valid @PathVariable Long id) {
        if(curriculoService.deletarCurriculo(id)) {
            String mensagem = "O id " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O id " + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
