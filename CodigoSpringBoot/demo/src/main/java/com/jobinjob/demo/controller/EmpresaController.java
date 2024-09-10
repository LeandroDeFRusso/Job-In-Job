package com.jobinjob.demo.controller;

import com.jobinjob.demo.model.Candidato;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.jobinjob.demo.model.Empresa;
import com.jobinjob.demo.service.EmpresaService;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;


    @GetMapping("/add")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("cadastroEmpresa");
        mv.addObject("empresa", new Empresa());
        return mv;
    }

    @PostMapping("/add")
    public String adicionarEmpresa(@Valid Empresa empresa, BindingResult result) {
        if (result.hasErrors()) {
            return "empresa/add";
        }
        try {
            empresaService.adicionarEmpresa(empresa);
            return "redirect:/curriculo/salvar";
        } catch (Exception e) {
            e.printStackTrace();
            return "empresa/add";
        }
    }


    @PutMapping("/update/{cnpj}")
    public ResponseEntity<?> atualizarEmpresa(@Valid @PathVariable String cnpj, @RequestBody Empresa empresa) {
        if(empresaService.atualizarEmpresa(cnpj, empresa) == null) {
            String mensagem = "O CNPJ " + cnpj + " não existe na base de dados";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
        }
        return ResponseEntity.ok(empresa);
    }

    @GetMapping
    public String listarEmpresas(Model model) {
        List<Empresa> empresas = empresaService.listarEmpresas();
        model.addAttribute("empresas", empresas);
        return "listaEmpresas";
    }

    @DeleteMapping("/delete/{cnpj}")
    public ResponseEntity<?> deletarEmpresa(@Valid @PathVariable String cnpj) {
        if(empresaService.deletarEmpresa(cnpj)) {
            String mensagem = "O CNPJ " + cnpj + " foi excluído com sucesso";
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(mensagem);
        }
        String mensagem = "O CNPJ " + cnpj + " não existe na base de dados";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagem);
    }
}
