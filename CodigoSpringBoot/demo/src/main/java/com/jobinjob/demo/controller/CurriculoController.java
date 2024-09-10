package com.jobinjob.demo.controller;

import com.jobinjob.demo.model.*;
import com.jobinjob.demo.service.CurriculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/curriculo")
public class CurriculoController {

    @Autowired
    CurriculoService curriculoService;

    @GetMapping("/salvar")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("curriculo");
        mv.addObject("curriculo", new Curriculo());
        return mv;
    }

    @PostMapping("/salvar")
    public ResponseEntity<Curriculo> criarCurriculo(@PathVariable String candidatoCpf, @Valid @RequestBody Curriculo curriculo) {
        // Ajuste o Curriculo com o CPF do candidato
        curriculo.getCandidato().setCpf(candidatoCpf);

        // Cria o currículo através do serviço
        Curriculo criadoCurriculo = curriculoService.criarCurriculo(candidatoCpf, curriculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(criadoCurriculo);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizarCurriculo(@Valid @PathVariable Long id, @RequestBody Curriculo curriculo) {
        Curriculo atualizado = curriculoService.atualizarCurriculo(id, curriculo);
        if (atualizado == null) {
            String mensagem = "O id " + id + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(atualizado);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletarCurriculo(@Valid @PathVariable Long id) {
        if(curriculoService.deletarCurriculo(id)) {
            String mensagem = "O id " + id + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O id " + id + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}