package com.jobinjob.demo.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.jobinjob.demo.model.Favoritos;
import com.jobinjob.demo.service.FavoritosService;

@RestController
@RequestMapping("/favoritos")
public class FavoritosController {
    
    @Autowired
    FavoritosService favoritosService;

   
    @PostMapping("/curriculo/{curriculoId}")
    public ResponseEntity<Favoritos> favoritarCurriculo(@PathVariable Long curriculoId) {
        Favoritos favoritos = favoritosService.favoritarCurriculo(curriculoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(favoritos);
    }

    @GetMapping
    public List<Favoritos> listarFavoritos() {
        return favoritosService.listarFavoritos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Favoritos> buscarFavoritosPorId(@PathVariable Long id) {
        Optional<Favoritos> favoritos = favoritosService.buscarFavoritosPorId(id);
        return favoritos.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desfavoritar(@PathVariable Long id) {
        favoritosService.desfavoritar(id);
        return ResponseEntity.noContent().build();
    }
}
