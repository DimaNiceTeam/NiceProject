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
	// 비밀번호 암호화 나중에 하기 
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	/**
	 * 회원 가입 
	 * @param userDTO
	 */
	public boolean joinProc(UserDTO userDTO) {
		//비밀 번호 암호화 과정 추가하기 *******
//		boolean isExistUser = userRepository.existsById(userDTO.getUserNum());
//		if(isExistUser) return false; // 기존에 존재하는 아이디이므로 가입 실패 
		
		userDTO.setUserPwd(bCryptPasswordEncoder.encode(userDTO.getUserPwd()));
		//dto를 Entity 로 변경 
		UserEntity entity = UserEntity.toEntity(userDTO);
		userRepository.save(entity);// 데이터 베이스에 저장 
		log.info("서비스에서 저장 완료함!");
		
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


	public UserDTO findbyUserNum(Long userNum) {
		UserEntity entity = userRepository.findById(userNum).get();
		
		return UserDTO.toDTO(entity);
	}

}
