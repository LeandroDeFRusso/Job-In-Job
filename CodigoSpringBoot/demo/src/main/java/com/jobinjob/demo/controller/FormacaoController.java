package com.jobinjob.demo.controller;

import java.util.List;
import jakarta.validation.Valid;
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
import com.jobinjob.demo.model.Formacao;
import com.jobinjob.demo.service.FormacaoService;

@RestController
@RequestMapping("/formacao")
public class FormacaoController {
    
    @Autowired
    FormacaoService formacaoService;

    @PostMapping("/add")
    public ResponseEntity<String> adicionarFormacao(@Valid @RequestBody Formacao formacao) {
        try {
            formacaoService.adicionarFormacao(formacao);
            return ResponseEntity.ok("Currículos adicionado com sucesso");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar currículos");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizarFormacao(@Valid @PathVariable Long id, @RequestBody Formacao formacao) {
        if(formacaoService.atualizarFormacao(id, formacao) == null) {
            String mensagem = "A formação" + id + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(formacao);
    }

    @GetMapping
    public List<Formacao> listarFormacaos() {
        return formacaoService.listarFormacaos();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletarFormacao(@Valid @PathVariable Long id) {
        if(formacaoService.deletarFormacao(id)) {
            String mensagem = "A formação " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "A formação " + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
