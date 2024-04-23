package com.dima.niceweb.email;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dima.niceweb.user.UserEntity;

public interface EmailRepository extends JpaRepository<EmailEntity, Long> {

	List<EmailEntity> findAllByUserEntityOrderByEmailNumDesc(UserEntity userEntity);

}
