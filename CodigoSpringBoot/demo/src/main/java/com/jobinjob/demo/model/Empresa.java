package com.jobinjob.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
public class Empresa {

    @Id
    @Size(min = 14, max = 18)
    @Column(unique = true)
    private String cnpj;

    @NotEmpty
    private String nomeEmpresa;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String cidade;

    @NotEmpty
    private String estado;

    @NotEmpty
    @Size(min = 6, max = 10)
    private String senha;

    public Empresa() {
    }

    public Empresa(String cnpj, @NotEmpty String nomeEmpresa, @NotEmpty String email,@NotEmpty String cidade, @NotEmpty String estado, @NotEmpty String senha) {
        this.cnpj = cnpj;
        this.nomeEmpresa = nomeEmpresa;
        this.email = email;
        this.cidade = cidade;
        this.estado = estado;
        this.senha = senha;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }


}