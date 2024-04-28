package com.dima.niceweb.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor 
public class UserController {
	
	private final UserService userService; // user서비스 
	
	
	/**
	 *회원 가입을 위한 화면 요청  
	 * @return join 페이지 
	 */
	@GetMapping("/join")
	public String join() {
		return"Join/join";
	}
	
	@GetMapping("/myPage")
	public String myPage() {
		return"myPage/pagemy";
	}
	/**
	 * 회원 가입 정보 DB에 저장 
	 * @param userDTO
	 * @return index.html
	 */
	@PostMapping("/joinProc")
	public String joinProc(@ModelAttribute UserDTO userDTO) {
		
		log.info("로그를 던져라 하이루~~~ {}", userDTO.toString());
		
		// 사용자 계정으로 설정함 
		userDTO.setUserRoles("ROLE_USER");
		userService.joinProc(userDTO);
		return "redirect:/";
	}
	@GetMapping("/login")
	public String login() {
		return"login/logincopy";
	}

	@GetMapping("/find")
	public String find() {
		return"find/find";
	}
	
	/**
	 * 아이디 중복 검사 
	 * @param userId
	 * @return
	 */
	@GetMapping("/confirmId")
	@ResponseBody
	public boolean confirmId(@RequestParam(name="userId") String userId) {
		boolean flag = userService.findByUserId(userId);
		
		return flag; // 데이터가 없다면 true -회원가입 가능 ! 
		
	} 
	

	
	
	
	
	
	

}
