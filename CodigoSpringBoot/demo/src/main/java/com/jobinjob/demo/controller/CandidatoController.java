package com.jobinjob.demo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.jobinjob.demo.model.Candidato;
import com.jobinjob.demo.service.CandidatoService;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping ("/candidato")
public class CandidatoController {

    @Autowired
    CandidatoService candidatoService;

    @GetMapping("/create")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("create");
        mv.addObject("candidato", new Candidato());
        return mv;
    }

    @PostMapping("/create")
    public String adicionarCandidato(@Valid Candidato candidato, BindingResult result) {
        if (result.hasErrors()) {
            return "candidato/create";
        }
        try {
            candidatoService.adicionarCandidato(candidato);
            return "redirect:/curriculo/create?candidatoCpf=" + candidato.getCpf();
        } catch (Exception e) {
            e.printStackTrace();
            return "candidato/create";
        }
    }





    @PutMapping("/update/{cpf}")
    public ResponseEntity<?> atualizarCandidato(@Valid @PathVariable String cpf, @RequestBody Candidato candidato) {
        if(candidatoService.atualizarCandidato(cpf, candidato) == null) {
            String mensagem = "O cpf " + cpf + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(candidato);
    }


    @DeleteMapping("/delete/{cpf}")
    public ResponseEntity<?> deletarCandidato(@Valid @PathVariable String cpf) {
        if(candidatoService.deletarCandidato(cpf)) {
            String mensagem = "O cpf " + cpf + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O cpf " + cpf + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}