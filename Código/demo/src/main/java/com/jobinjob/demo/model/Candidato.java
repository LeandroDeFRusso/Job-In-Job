package com.jobinjob.demo.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Candidato {


    @Id
    @Size(min=11, max=14)
    private String cpf;
    @NotNull
    private String nome;
    @NotNull
    private int idade;
    @NotNull
    private String email;
    @NotNull
    @Autowired
    private PasswordEncoder senha;
    private String genero;
    
    public Candidato() {
    }

    public Candidato(@Size(min = 11, max = 14) String cpf, @NotNull String nome, @NotNull int idade,
            @NotNull String email, @NotNull PasswordEncoder senha, String genero) {
        this.cpf = cpf;
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.senha = senha;
        this.genero = genero;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
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

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    
}
