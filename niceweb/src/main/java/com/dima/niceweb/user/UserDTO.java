package com.dima.niceweb.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDTO {
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

	public static UserDTO toDTO(UserEntity userEntity) {
		return UserDTO.builder()
				.userNum(userEntity.getUserNum())
				.userId(userEntity.getUserId()) //
				.userPwd(userEntity.getUserPwd()) //
				.userDunsNo(userEntity.getUserDunsNo())//
				.userCmpEng(userEntity.getUserCmpEng())
				.userCmpKor(userEntity.getUserCmpKor())
				.userNtn(userEntity.getUserNtn())
				.userCeoEng(userEntity.getUserCeoEng())
				.userCeoKor(userEntity.getUserCeoKor())
				.userEmail(userEntity.getUserEmail())
				.userPubEmail(userEntity.getUserPubEmail())
				.userSicCd(userEntity.getUserSicCd())
				.userUrl(userEntity.getUserUrl())
				.userAdr(userEntity.getUserAdr())
				.userName(userEntity.getUserName()) // 담당자 이름
				.userPhone(userEntity.getUserPhone())
				.userKeyWord(userEntity.getUserKeyWord())
				.userRoles(userEntity.getUserRoles())
				.build();
	}

}
