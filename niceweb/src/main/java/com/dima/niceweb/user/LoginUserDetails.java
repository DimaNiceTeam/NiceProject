package com.dima.niceweb.user;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class LoginUserDetails implements UserDetails {
	private Long userNum; // 시퀀스 -> PK
	private String userId; // 사용자 아이디
	private String userPwd; // 사용자 패스워드
	private String userDunsNo;// 던스넘버
	private String userCmpEng; // 영문 회사명
	private String userCmpKor; // 한글 회사명
	private String userNtn;// 국가
	private String userCeoEng;// 대표명 영문
	private String userCeoKor; // 대표명 한글
	private String userEmail;// 담당자 이메일
	private String userPubEmail;// 회사 대표 이메일
	private String userSicCd;// 주요 취급품목
	private String userUrl;// 회사 url
	private String userAdr;// 담당자 주소
	private String userName;// 담당자명
	private String userPhone;// 담당자 연락처
	private String userKeyWord; // 사용자 관심 키워드
	private String userRoles;// 권한
	
	
	
	
	
	

	public LoginUserDetails(UserDTO userDTO) {
		super();
		this.userNum = userDTO.getUserNum();
		this.userId = userDTO.getUserId();
		this.userPwd = userDTO.getUserPwd();
		this.userDunsNo = userDTO.getUserDunsNo();
		this.userCmpEng = userDTO.getUserCmpEng();
		this.userCmpKor =userDTO.getUserCeoKor();
		this.userNtn =userDTO.getUserNtn();
		this.userCeoEng = userDTO.getUserCeoEng();
		this.userCeoKor = userDTO.getUserCeoKor();
		this.userEmail = userDTO.getUserEmail();
		this.userPubEmail = userDTO.getUserPubEmail();
		this.userSicCd = userDTO.getUserSicCd();
		this.userAdr = userDTO.getUserAdr();
		this.userName = userDTO.getUserName();
		this.userPhone = userDTO.getUserPhone();
		this.userKeyWord = userDTO.getUserKeyWord();
		this.userRoles = userDTO.getUserRoles();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> collection = new ArrayList<>(); // 롤이 여러개인 사이트를 개발할때 
		//GrantedAuthority는 인터페이스므로 new을 할수 가 없다라는 것 - 밑에 추상 메소드를추가 해야한다는 것 
		collection.add(new GrantedAuthority() {

			// 객체를 저장할때는 직렬화한다 - 외부의 역질렬화와 같다라는 것을 증명하기 위해서 시리얼 넘버를 붙여줘야한다 
			private static final long serialVersionUID = 1L;

			@Override
			public String getAuthority() {
				// TODO Auto-generated method stub
				return null;
			}
			
		});
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.userPwd;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.userId;
	}
	
	// 이름 반환 - 사용자 정의 메소드 
	public String getUseName() { // 시큐리티 에서는 userid를 getUsername이라고 한다 
		// TODO Auto-generated method stub
		return this.userName;
	}
	
	public Long getUserNum() {
	    return this.userNum;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
