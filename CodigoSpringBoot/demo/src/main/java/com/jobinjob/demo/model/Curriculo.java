package com.jobinjob.demo.model;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

@Entity
public class Curriculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "candidato_cpf", referencedColumnName = "cpf")
    private Candidato candidato;

    @OneToMany(mappedBy = "curriculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Formacao> formacoes;

    @OneToMany(mappedBy = "curriculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cursos> cursos;

    @OneToMany(mappedBy = "curriculo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Experiencias> experiencias;


    @NotEmpty
    @Pattern(regexp = "\\(\\d{2}\\) \\d{5}-\\d{4}", message = "O formato válido para preencher é: (DDD) xxxxx-xxxx")
    private String telefone;

    @NotEmpty
    private String cidade;

    @NotEmpty
    private String estado;

    @NotEmpty
    private String genero;

    @NotEmpty
    private String escolaridade;

    @NotEmpty
    private String idioma;

    @NotEmpty
    private String area;

    @NotEmpty
    private String objetivo;

    @NotEmpty
    private String tags;


    public Curriculo() {
    }

    public Curriculo(Long id, Candidato candidato,
            @NotEmpty @Pattern(regexp = "\\(\\d{2}\\) \\d{5}-\\d{4}", message = "O formato válido para preencher é: (DDD) xxxxx-xxxx") String telefone,
            @NotEmpty String cidade, @NotEmpty String estado, @NotEmpty String genero, @NotEmpty String area, @NotEmpty String objetivo, @NotEmpty String tags) {
        this.id = id;
        this.telefone = telefone;
        this.cidade = cidade;
        this.estado = estado;
        this.genero = genero;
        this.area = area;
        this.objetivo = objetivo;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getEscolaridade() {
        return escolaridade;
    }

    public void setEscolaridade(String escolaridade) {
        this.escolaridade = escolaridade;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
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

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Candidato getCandidato() {
        return candidato;
    }

    public void setCandidato(Candidato candidato) {
        this.candidato = candidato;
    }


}