package com.dima.niceweb.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

	UserEntity findByUserId(String userId);

}
