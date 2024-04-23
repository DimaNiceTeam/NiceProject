package com.dima.niceweb.handler;

import java.io.IOException;
import java.net.URLEncoder;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component // 이 클래스도 빈이다. 
public class CustomFailuerHandler extends SimpleUrlAuthenticationFailureHandler {
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
		log.info("로그인 실패 "+exception.getClass());
		
		// 사용자게 에러가 났다는 에러를 
		// 에러 자체도 겟요청이다 ~ 주소표시줄에 나타남 
		String errMessage = "";
		if (exception instanceof BadCredentialsException) {
			errMessage = exception.getMessage(); // 자격증명이 실패했다는 메세지 
			errMessage += "아이디나 비밀번호가 잘못었습니다.";
		}else { // 기타 등등 서버 에러는 여기서 받음 
			errMessage = exception.getMessage();
			errMessage +=" 로그인에 실패했습니다. 관리자에게 문의하세요!";
		}
		errMessage = URLEncoder.encode(errMessage,"UTF-8");
		setDefaultFailureUrl("/user/login?error=true&errMessage="+errMessage); // 에러메시지를 가지고 어디로 가야할지를 알려주는 역할 
		
		super.onAuthenticationFailure(request, response, exception); // 상위 클래스에게 던져주는 역할 
	}


}
