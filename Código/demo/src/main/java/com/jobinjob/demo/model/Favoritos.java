package com.jobinjob.demo.model;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

public class Favoritos {

    @Id
    private Long id;
    @NotNull
    private Empresa empresa = new Empresa();
    @NotNull
    private Curriculo curriculo = new Curriculo();
    
    public Favoritos() {
    }


    public Favoritos(Long id, @NotNull Empresa empresa, @NotNull Curriculo curriculo) {
        this.id = id;
        this.empresa = empresa;
        this.curriculo = curriculo;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

}
