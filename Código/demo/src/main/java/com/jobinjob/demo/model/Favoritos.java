package com.jobinjob.demo.model;

import jakarta.validation.constraints.NotNull;

public class Favoritos {
    
    @NotNull
    private Empresa empresa = new Empresa();
    @NotNull
    private Curriculo curriculo = new Curriculo();
    
    public Favoritos() {
    }

    public Favoritos(@NotNull Empresa empresa, @NotNull Curriculo curriculo) {
        this.empresa = empresa;
        this.curriculo = curriculo;
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
