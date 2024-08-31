package com.jobinjob.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobinjob.demo.model.Empresa;
import com.jobinjob.demo.service.EmpresaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {
    
    @Autowired
    EmpresaService empresaService;

    @PostMapping("/add")
    public Empresa adicionarEmpresa(@Valid @RequestBody Empresa empresa) {
        return empresaService.adicionarEmpresa(empresa);
    }

    @PutMapping("/update/{cnpj}")
    public ResponseEntity<?> atualizarEmpresa(@PathVariable String cnpj, @RequestBody Empresa empresa) {
        if(empresaService.atualizarEmpresa(cnpj, empresa) == null) {
            String mensagem = "O CNPJ " + cnpj + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(empresa);
    }

    @GetMapping
    public List<Empresa> listarEmpresas() {
        return empresaService.listarEmpresas();
    }

    @DeleteMapping("/delete/{cnpj}")
    public ResponseEntity<?> deletarEmpresa(@PathVariable String cnpj) {
        if(empresaService.deletarEmpresa(cnpj)) {
            String mensagem = "O CNPJ " + cnpj + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O CNPJ" + cnpj + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
