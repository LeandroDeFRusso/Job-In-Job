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

import com.jobinjob.demo.model.Curriculo;
import com.jobinjob.demo.service.CurriculoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {

    @Autowired
    CurriculoService curriculoService;

    @PostMapping("/add")
    public Curriculo adicionarCurriculo(@Valid @RequestBody Curriculo curriculo) {
        return curriculoService.adicionarCurriculo(curriculo);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizarCurriculo(@PathVariable Long id, @RequestBody Curriculo curriculo) {
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
    public ResponseEntity<?> deletarCurriculo(@PathVariable Long id) {
        if(curriculoService.deletrCurriculo(id)) {
            String mensagem = "O id " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O id" + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
