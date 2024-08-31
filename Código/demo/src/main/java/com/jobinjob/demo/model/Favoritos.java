package com.jobinjob.demo.model;

import jakarta.persistence.*;


@Entity
public class Favoritos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "curriculo_id", referencedColumnName = "id")
    private Curriculo curriculo;

    public Favoritos() {
    }

    public Favoritos(Long id, Curriculo curriculo) {
        this.id = id;
        this.curriculo = curriculo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public Curriculo getCurriculo() {
        return curriculo;
    }



    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

}