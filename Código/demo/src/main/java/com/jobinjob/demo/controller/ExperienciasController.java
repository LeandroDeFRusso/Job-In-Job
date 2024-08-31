package com.jobinjob.demo.controller;

import java.util.List;

import jakarta.validation.Valid;
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

import com.jobinjob.demo.model.Experiencias;
import com.jobinjob.demo.service.ExperienciasService;

@RestController
@RequestMapping("/experiencias")
public class ExperienciasController {
    
    @Autowired
    ExperienciasService experienciasService;

    @PostMapping("/add")
    public ResponseEntity<String> adicionarExperiencias(@Valid @RequestBody Experiencias experiencias) {
        try {
            experienciasService.adicionarExperiencias(experiencias);
            return ResponseEntity.ok("Currículos adicionado com sucesso");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar currículos");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizarExperiencias(@Valid @PathVariable Long id, @RequestBody Experiencias experiencias) {
        if(experienciasService.atualizarExperiencias(id, experiencias) == null) {
            String mensagem = "O id " + id + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(experiencias);
    }

    @GetMapping
    public List<Experiencias> listarExperienciass() {
        return experienciasService.listarExperiencias();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletarExperiencias(@Valid @PathVariable Long id) {
        if(experienciasService.deletarExperiencias(id)) {
            String mensagem = "O id " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O id " + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
