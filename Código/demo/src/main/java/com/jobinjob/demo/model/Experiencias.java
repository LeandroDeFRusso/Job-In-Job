package com.jobinjob.demo.model;

import java.sql.Date;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Experiencias {

    @Id
    private Long id;
    @NotNull
    private String cargo;
    @NotNull
    private String cnpjEx;
    @NotNull
    private Date entrada;
    private Date saida;

    public Experiencias() {
    }

    public Experiencias(Long id, String cargo, String cnpjEx, Date entrada, Date saida) {
        this.id = id;
        this.cargo = cargo;
        this.cnpjEx = cnpjEx;
        this.entrada = entrada;
        this.saida = saida;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCnpjEx() {
        return cnpjEx;
    }

    public void setCnpjEx(String cnpjEx) {
        this.cnpjEx = cnpjEx;
    }

    public Date getEntrada() {
        return entrada;
    }

    public void setEntrada(Date entrada) {
        this.entrada = entrada;
    }

    public Date getSaida() {
        return saida;
    }

    public void setSaida(Date saida) {
        this.saida = saida;
    }

}
