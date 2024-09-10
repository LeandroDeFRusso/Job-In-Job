package com.jobinjob.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jobinjob.demo.model.Empresa;
import com.jobinjob.demo.repository.EmpresaRepository;

@Service
public class EmpresaService {
    
    @Autowired
    EmpresaRepository empresaRepository;

    public List<Empresa> listarEmpresas(){
        return empresaRepository.findAll();
    }

    public Empresa adicionarEmpresa(Empresa empresa){
        return empresaRepository.save(empresa);
    }

    public Empresa atualizarEmpresa(String id, Empresa empresa){
        if (empresaRepository.existsById(id)) {
            empresa.setCnpj(id);
            return empresaRepository.save(empresa);
        }
        return null;
    }

    public boolean deletarEmpresa(String id){
        if(empresaRepository.existsById(id)){
            empresaRepository.deleteById(id);
            return true;
        }
        return false;
    } 
}
