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

import com.jobinjob.demo.model.Favoritos;
import com.jobinjob.demo.service.FavoritosService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/favoritos")
public class FavoritosController {
    
    @Autowired
    FavoritosService favoritosService;

    @PostMapping("/add")
    public Favoritos adicionarFavoritos(@Valid @RequestBody Favoritos favoritos) {
        return favoritosService.adicionarFavoritos(favoritos);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizarFavoritos(@PathVariable Long id, @RequestBody Favoritos favoritos) {
        if(favoritosService.atualizFavoritos(id, favoritos) == null) {
            String mensagem = "O id " + id + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(favoritos);
    }

    @GetMapping
    public List<Favoritos> listarFavoritos() {
        return favoritosService.listarFavoritos();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletarFavoritos(@PathVariable Long id) {
        if(favoritosService.deletarFavoritos(id)) {
            String mensagem = "O id " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O id " + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
