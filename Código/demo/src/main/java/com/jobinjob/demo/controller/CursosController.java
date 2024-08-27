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

import com.jobinjob.demo.model.Cursos;
import com.jobinjob.demo.service.CursosService;

@RestController
@RequestMapping("/cursos")
public class CursosController {
    
    @Autowired
    CursosService cursosService;

    @PostMapping("/add")
    public ResponseEntity<String> addCursos(@Valid @RequestBody Cursos cursos) {
        try {
            cursosService.adicionarCursos(cursos);
            return ResponseEntity.ok("Cursos adicionado com sucesso");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar cursos");
        }
    }

    @PutMapping("/update/{cpf}")
    public ResponseEntity<?> atualizarCursos(@Valid @PathVariable Long id, @RequestBody Cursos cursos) {
        if(cursosService.atualizarCursos(id, cursos) == null) {
            String mensagem = "O Id " + id + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(cursos);
    }

    @GetMapping
    public List<Cursos> listarCursoss() {
        return cursosService.listarCursoss();
    }

    @DeleteMapping("/delete/{cpf}")
    public ResponseEntity<?> deletarCursos(@Valid @PathVariable Long id) {
        if(cursosService.deletarCursos(id)) {
            String mensagem = "O Id " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O Id " + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
