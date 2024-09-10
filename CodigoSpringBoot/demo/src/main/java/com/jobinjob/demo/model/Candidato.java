package com.jobinjob.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Candidato {

    @Id
    @Size(min=11, max=14)
    @Column(unique = true)
    private String cpf;

    @NotEmpty
    private String nome;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dataNasc;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Size(min = 6,max = 10)
    private String senha;

    public Candidato() {
    }



    public Candidato(@Size(min = 11, max = 14) String cpf, @NotEmpty String nome, @NotNull LocalDate dataNasc,
            @NotEmpty String email, @NotEmpty String senha) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.email = email;
        this.senha = senha;
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

    public LocalDate getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}
