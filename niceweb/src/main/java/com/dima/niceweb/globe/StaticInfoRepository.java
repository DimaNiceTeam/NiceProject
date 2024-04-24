package com.dima.niceweb.globe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface StaticInfoRepository extends JpaRepository<StaticInfoEntity, String> {

    List<StaticInfoEntity> findByStatId(String statId);

}
