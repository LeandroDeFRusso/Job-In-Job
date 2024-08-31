package com.jobinjob.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Formacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curriculo_id")
    private Curriculo curriculo;

    @NotEmpty
    private String universidade;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private int anoEntada;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private int anoSaida;

    @NotEmpty
    private String curso;
    
    public Formacao() {
    }

    public Formacao(Long id, Curriculo curriculo, @NotEmpty String universidade, @NotNull int anoEntada,
            @NotNull int anoSaida, @NotEmpty String curso) {
        this.id = id;
        this.curriculo = curriculo;
        this.universidade = universidade;
        this.anoEntada = anoEntada;
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

    public int getAnoEntada() {
        return anoEntada;
    }

    public void setAnoEntada(int anoEntada) {
        this.anoEntada = anoEntada;
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

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

}
