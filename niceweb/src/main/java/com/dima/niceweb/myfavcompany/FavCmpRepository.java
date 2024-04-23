package com.dima.niceweb.myfavcompany;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dima.niceweb.user.UserEntity;

public interface FavCmpRepository extends JpaRepository<FavCmpEntity, Long> {



	List<FavCmpEntity> findAllByUserEntity(UserEntity userEntity);

	

}
