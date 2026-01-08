package com.zerog.soju.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zerog.soju.dto.sojudto;
import com.zerog.soju.entity.sojuentiy;
import com.zerog.soju.repository.SojuRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SojuService {

    private final SojuRepository sojuRepository;

    @Transactional
    public void saveSoju(sojudto dto){
        sojuentiy soju = new sojuentiy(dto.getName(), dto.getBrand(), dto.getAlcohol());
        sojuRepository.save(soju);
    }

    public List<sojuentiy> getAllSoju(){
        return sojuRepository.findAll();
    }

    @Transactional
    public void deleteSojuByName(String name){
        sojuRepository.findByName(name).ifPresent(soju -> {
            sojuRepository.delete(soju);
        });
    }

}
