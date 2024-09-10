package com.jobinjob.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobinjob.demo.model.Favoritos;

public interface FavoritosRepository extends JpaRepository<Favoritos, Long>{
    
}
