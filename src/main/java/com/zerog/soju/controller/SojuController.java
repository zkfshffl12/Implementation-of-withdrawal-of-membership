package com.zerog.soju.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerog.soju.dto.sojudto;
import com.zerog.soju.entity.sojuentiy;
import com.zerog.soju.service.SojuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/soju")
@RequiredArgsConstructor
@Log4j2
public class SojuController {

    private final SojuService sojuService;

    @PostMapping("/add")
    public String addSoju(@RequestBody sojudto dto){
        log.info("소주 등록 요청 발생 - 이름: {}, 도수: {}%, 브랜드: {}",
        dto.getName(), dto.getAlcohol(), dto.getBrand());

        sojuService.saveSoju(dto);

        log.info("소주 등록 완료: {}", dto.getName());
        return "등록 성공: "+ dto.getName();
    }

    @DeleteMapping("/delete/{name}")
    public String deleteSoju(@PathVariable String name){
        log.info("소주 삭제 요청 발생 - 이름: {}", name);

        sojuService.deleteSojuByName(name);
        return "삭제 성공: " + name;
    }

    @GetMapping("/list")
    public List<sojuentiy> listSoju(){
        log.info("소주 전체 목록 조회 요청");
        return sojuService.getAllSoju();
    }
}
    
