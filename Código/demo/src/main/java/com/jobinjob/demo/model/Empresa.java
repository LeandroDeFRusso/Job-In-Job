package com.jobinjob.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Empresa {
    
    @Id
    @Size(min = 14, max = 18)
    private String cnpj;
    @NotNull
    private String nomeEmpresa;
    @NotNull
    private String email;
    @NotNull
    @Autowired
    private PasswordEncoder senha;
    
    public Empresa() {
    }

    public Empresa(@Size(min = 14, max = 18) String cnpj, @NotNull String nomeEmpresa, @NotNull String email,
            @NotNull PasswordEncoder senha) {
        this.cnpj = cnpj;
        this.nomeEmpresa = nomeEmpresa;
        this.email = email;
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

    public PasswordEncoder getSenha() {
        return senha;
    }

    public void setSenha(PasswordEncoder senha) {
        this.senha = senha;
    }

    
}
