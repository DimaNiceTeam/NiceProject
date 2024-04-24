package com.dima.niceweb.globe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class StatilcController {

    @Autowired
    private StaticInfoRepository repository;

    @GetMapping("/{statId}")
    public ResponseEntity<StaticInfoEntity> getStaticInfoByStatId(@PathVariable String statId) {
        return repository.findById(statId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
}
