package com.jobinjob.demo.model;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

public class Formacao {
    
    @Id
    private Long id;
    @NotNull
    private String universidade;
    @NotNull
    private int anoEntrada;
    @NotNull
    private int anoSaida;
    @NotNull
    private String curso;

    public Formacao() {
    }

    public Formacao(Long id, String universidade, int anoEntrada, int anoSaida, String curso) {
        this.id = id;
        this.universidade = universidade;
        this.anoEntrada = anoEntrada;
        this.anoSaida = anoSaida;
        this.curso = curso;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUniversidade() {
        return universidade;
    }

    public void setUniversidade(String universidade) {
        this.universidade = universidade;
    }

    public int getAnoEntrada() {
        return anoEntrada;
    }

    public void setAnoEntrada(int anoEntrada) {
        this.anoEntrada = anoEntrada;
    }

    public int getAnoSaida() {
        return anoSaida;
    }

    public void setAnoSaida(int anoSaida) {
        this.anoSaida = anoSaida;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    
}
