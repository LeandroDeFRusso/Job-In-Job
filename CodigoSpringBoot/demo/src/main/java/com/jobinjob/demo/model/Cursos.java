package com.jobinjob.demo.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class Cursos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curriculo_id")
    private Curriculo curriculo;

    @NotEmpty
    private String nomeCurso;

    @NotEmpty
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date inicio;

    @NotEmpty
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date termino;

    @NotEmpty
    private String descricao;
    
    public Cursos() {
    }

    public Cursos(Long id, @NotEmpty String nomeCurso, @NotEmpty Date inicio, @NotEmpty Date termino,
            @NotEmpty String descricao, Curriculo curriculo) {
        this.id = id;
        this.nomeCurso = nomeCurso;
        this.inicio = inicio;
        this.termino = termino;
        this.descricao = descricao;
        this.curriculo = curriculo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCurso() {
        return nomeCurso;
    }

    public void setNomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getInicio() {
        return inicio;
    }

    public void setInicio(Date inicio) {
        this.inicio = inicio;
    }

    public Date getTermino() {
        return termino;
    }

    public void setTermino(Date termino) {
        this.termino = termino;
    }

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }
}
