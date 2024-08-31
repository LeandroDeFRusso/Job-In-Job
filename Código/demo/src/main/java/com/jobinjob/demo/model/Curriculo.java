package com.jobinjob.demo.model;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

public class Curriculo {
    
    @Id
    private Long id;
    @NotNull
    private String area;
    @NotNull
    private String objetivo;
    private Experiencias experiencias = new Experiencias();
    private Formacao formacao = new Formacao();
    @NotNull
    private String tags; //Não teria que ter uma tabela com tags?
    
    public Curriculo() {
    }

    public Curriculo(Long id, @NotNull String area, @NotNull String objetivo, Experiencias experiencias,
            Formacao formacao, @NotNull String tags) {
        this.id = id;
        this.area = area;
        this.objetivo = objetivo;
        this.experiencias = experiencias;
        this.formacao = formacao;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public Experiencias getExperiencias() {
        return experiencias;
    }

    public void setExperiencias(Experiencias experiencias) {
        this.experiencias = experiencias;
    }

    public Formacao getFormacao() {
        return formacao;
    }

    public void setFormacao(Formacao formacao) {
        this.formacao = formacao;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
    
    
}
