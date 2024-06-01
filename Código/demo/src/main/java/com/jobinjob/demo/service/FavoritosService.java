package com.jobinjob.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobinjob.demo.model.Favoritos;
import com.jobinjob.demo.repository.FavoritosRepository;

@Service
public class FavoritosService {
    
    @Autowired
    FavoritosRepository favoritosRepository;

    public List<Favoritos> listaFavoritos(){
        return favoritosRepository.findAll();
    }

    public Favoritos adicionFavoritos(Favoritos favoritos){
        return favoritosRepository.save(favoritos);
    }

    public Favoritos atualizFavoritos(Long id, Favoritos favoritos){
        if (favoritosRepository.existsById(id)) {
            favoritos.setId(id);
            return favoritosRepository.save(favoritos);
        }
        return null;
    }

    public boolean deletarFavoritos(Long id){
        if (favoritosRepository.existsById(id)) {
            favoritosRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
