package com.jobinjob.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

@Entity
public class Experiencias {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "curriculo_id")
    private Curriculo curriculo;

    private String cargo;

    private String nomeEmp;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private int anoEntrada;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private int anoSaida;

    private String descricao;

    public Experiencias() {
    }

    public Experiencias(Long id, Curriculo curriculo, String cargo, String nomeEmp, int anoEntrada, int anoSaida, String descricao) {
        this.id = id;
        this.cargo = cargo;
        this.nomeEmp = nomeEmp;
        this.anoEntrada = anoEntrada;
        this.anoSaida = anoSaida;
        this.descricao = descricao;
        this.curriculo = curriculo;
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

    public String getNomeEmp() {
        return nomeEmp;
    }

    public void setNomeEmp(String nomeEmp) {
        this.nomeEmp = nomeEmp;
    }

    public int getAnoEntrada() {
        return anoEntrada;
    }

    public void setAnoEntrada(int anoEntrada) {
        this.anoEntrada = anoEntrada;
    }

    public int getAnoSaida() {
        return anoSaida;
    }

    public void setAnoSaida(int anoSaida) {
        this.anoSaida = anoSaida;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }
}
