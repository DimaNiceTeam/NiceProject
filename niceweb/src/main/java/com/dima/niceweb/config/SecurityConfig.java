package com.dima.niceweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.dima.niceweb.handler.CustomFailuerHandler;

import lombok.RequiredArgsConstructor;


@Configuration  // SecurityConfig 설정 클래스임을 나타내는 Annotation
@EnableWebSecurity //웹 보안은 모두 이클래스의 설정에 따름을 나타내는Annotation 웹에 관련 보안설정이 모두 여기서 이루어진다 라는 것을 나타냄 
@RequiredArgsConstructor
public class SecurityConfig {
	private final CustomFailuerHandler failureHandler;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
		.authorizeHttpRequests((auth)->auth// 인증 절차에 대해서 설정 
				.requestMatchers(// 로그인을 안해도 되는 것 
					"/"
 					,"/user/join" // 화면 요청 
					,"/user/joinProc" // 데이터 베이스에 저장 해달라는 요청  post 
					,"/user//confirmId" // 중복 아이디 확인 get
					,"/user/login" // 로그인 -get
					,"/user/myFavCompany" // ** 마이페이지 찜기능 화면요청 get
					,"/user/favCmpAll" // ** 찜한 회사목록 모두 출력 get
					,"/user/favCmpDelete" // ** 찜리스에서 회사 삭제 get
					,"/user/favCmpInsert" // ** 찜리스에서 회사 추가 get	
					,"/mail/sendedMail" // ** 메일함 화면 요청 get
					,"/mail/mailList" // ** 메일 dto리스트 반환 get
					,"/mail/mailsend" // ** 메일 보내기 post
					,"/mail/myPageSendEmail"
					,"/mail/mailSelectOne" // ** 메일 dto한개 반환 get
					,"/mail/mailDelete" // ** 메일 삭제 post
					,"/rate" // 환율 getaaaaa!1
					,"/fraud" // * 사기 get
					,"/showFraud" //* 사기 get
					,"/globeindex" // * get
					,"/search" //**추천 알고리즘 검색 화면 요청 get
					,"/cmpSelect" // ** 회사 상세보기 get
					,"/predict" // ** fast api사용 post
					,"/images/**"
					,"/fonts/**"
					,"/css/**"
					,"/js/**"	
					,"/video/**"
					,"/script/**").permitAll()//permitAll()은 인증 절차 없이도 접근가능한 요청 
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.requestMatchers("/my/**").hasAnyRole("ADMIN","USER")
				.anyRequest().permitAll()
				//.authenticated() // 위에는 권한에 따라 분리를 하였고, 기타 다른 경로눈 인증된 사용자만 접근 가능, 가장 마지막에 둘것 
				);
	// Custom Login 설정 : 내가 만든 로그인 화면 
	http
		.formLogin((auth)->auth
				.loginPage("/user/login") // login 화면 요청 - 내가만듬 login.html 페이지를 보여줘야 함으로 - 컨트롤러에서 따로 생성  
				.failureHandler(failureHandler)// 로그인 실패시 처리할 핸들러 등록 . 에러가났을때 핸들링 해주는 객체를 등록 한다 
				.usernameParameter("userId") //sucurity에서는 username이 id
				.passwordParameter("userPwd")
				.loginProcessingUrl("/user/loginProc") // 로그인 처리 
				.defaultSuccessUrl("/").permitAll()// 로그인이 되면 첫화면으로 간다 
		
				) ;
	// 로그아웃 설정
	http
		.logout((auth)->auth
				.logoutUrl("/user/logout") // 로그 아웃 처리 url 
				.logoutSuccessUrl("/") // 로그아웃 성공시 이동 url 
				.invalidateHttpSession(true) // 세션을 무효화 
				.deleteCookies("JSESSIONID") // 로그아웃 성공시 제거할 쿠키명   사용자의 로그 기록에 대한 정보를 쿠키 정보라고 함 
				);
	// CSRF(Cross - Site Request Forery) 비활성화  개발을 편리하게 해주기 위해 
	// 시큐리티는 사이트 위변조 기능이 설정되기 때문에 모든 POST 요청시 
	// CRSF 토큰도 보내한다 
	// 개발하는 동안에는 disabled 해준다 (POST, PUT, DELETE이 진행 되지않음) -- 로그아웃은 get 방식이어도 , post 방식으로 처리함으 나중에 로그아웃이 안된다 
	//POST, PUT-update를 put이라고 부름 , DELETE ==> db에 접근하는 동작들이다 
	http 
		.csrf((auth) -> auth.disable());// 배포시 다시 활성화 
		
				return http.build();
	
		
		
		
	}
	// 비밀번호 암호화 , 단방향 암호화 
		@Bean // Spring 컨테이너에 의해 관리되는 빈을 생성하는 메서드
		BCryptPasswordEncoder bCryptPasswordEncoder() {
			return new BCryptPasswordEncoder();
		}
		
	
		
	

}
