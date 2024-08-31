package com.jobinjob.demo.service;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Curriculo;
import com.jobinjob.demo.model.Favoritos;
import com.jobinjob.demo.repository.CurriculoRepository;
import com.jobinjob.demo.repository.FavoritosRepository;

@Service
public class FavoritosService {
    
    @Autowired
    FavoritosRepository favoritosRepository;

    @Autowired
    CurriculoRepository curriculoRepository;

    public Favoritos favoritarCurriculo(Long curriculoId) {
        Optional<Curriculo> curriculo = curriculoRepository.findById(curriculoId);
        if (curriculo.isPresent()) {
            Favoritos favoritos = new Favoritos();
            favoritos.setCurriculo(curriculo.get());
            return favoritosRepository.save(favoritos);
        } else {
            throw new EntityNotFoundException("Currículo não encontrado.");
        }
    }

    public List<Favoritos> listarFavoritos() {
        return favoritosRepository.findAll();
    }

    public Optional<Favoritos> buscarFavoritosPorId(Long id) {
        return favoritosRepository.findById(id);
    }

    public void desfavoritar(Long id) {
        favoritosRepository.deleteById(id);
    }
}
