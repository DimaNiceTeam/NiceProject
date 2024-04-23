package com.dima.niceweb.user;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@Slf4j
@Service
@RequiredArgsConstructor
public class LoginUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		
		// userId검증 로직이 필요 테이블에 접근해서 데이터를 가져옴 
		// 사용자가 로그인을 하면 SecurityConfig가 username을 여기로 전달함 
		log.info("{}",userId);
		
		UserEntity userEntity = userRepository.findByUserId(userId);
		if (userEntity==null) {
			throw new UsernameNotFoundException("error 발생");
		}
				
//				.orElseThrow(()->{
//				throw new UsernameNotFoundException("error 발생");
//				});          // 아이디 못찾으면 강제적으로 에러를 발생 
		
		UserDTO userDTO = UserDTO.toDTO(userEntity);
		
		// 반환을 UserDetails로 반환해야하므로 UserDTO를 UserDetails로 바꿔야함 ! 
		return new LoginUserDetails(userDTO);// 아이디와 패스워드만 입력했으므로 이사람의 역할은 무엇인지, 활성화 상태인지에 대한걸 알기 위해 넘겨짐 
//		if(userEntity.isPresent()) {
//			UserEntity entity = userEntity.get();
//			UserDTO userDTO = UserDTO.toDTO(entity);
//			
//			// 반환을 UserDetails로 반환해야하므로 UserDTO를 UserDetails로 바꿔야함 ! 
//			return new LoginUserDetails(userDTO);// 아이디와 패스워드만 입력했으므로 이사람의 역할은 무엇인지, 활성화 상태인지에 대한걸 알기 위해 넘겨짐 
//		}
		
	}
}
