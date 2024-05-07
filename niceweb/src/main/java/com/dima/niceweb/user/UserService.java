package com.dima.niceweb.user;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	/**
	 * 회원 가입 
	 * @param userDTO
	 */
	public boolean joinProc(UserDTO userDTO) {

		
		userDTO.setUserPwd(bCryptPasswordEncoder.encode(userDTO.getUserPwd()));// 비밀번호 암호화 
		//dto를 Entity 로 변경 
		UserEntity entity = UserEntity.toEntity(userDTO);
		userRepository.save(entity);// 데이터 베이스에 저장 
		
		return true;
		
	}


	/**
	 * 아이디 중복 검사 
	 * @param userId
	 * @return boolean 
	 */
	public boolean findByUserId(String userId) {
		
		UserEntity entity = userRepository.findByUserId(userId);
		// 데이터가 들어있다면 
		if(entity != null) {
			return false;
		}
	return true;
	}

	/**
	 * 회원 정보 찾기 
	 * @param userNum
	 * @return
	 */
	public UserDTO findbyUserNum(Long userNum) {
		UserEntity entity = userRepository.findById(userNum).get();
		
		return UserDTO.toDTO(entity);
	}

}
