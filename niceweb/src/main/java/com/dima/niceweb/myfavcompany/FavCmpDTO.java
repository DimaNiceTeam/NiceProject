package com.dima.niceweb.myfavcompany;

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
public class FavCmpDTO { //찜한 회사에 대한dto 입니다. 
	
	private Long favCmpNo; // pk입니다 생성된 고유 번호 
	private Long userNum; // 회원 고유 넘버 
	private String cmpName; // 회사명
	private String cmpEmail; // 이메일 주소
	private String cmpDunsNo; // 던스넘버 
	private String cmpUrl; // 홈페이지 주소


	
	public static FavCmpDTO toDTO(FavCmpEntity favCmpEntity, Long userNum) {
		return FavCmpDTO.builder()
				  .favCmpNo(favCmpEntity.getFavCmpNo())	 // 시퀀스 자동 생성 			
	              .cmpName(favCmpEntity.getCmpName()) // 회사명
	              .cmpEmail(favCmpEntity.getCmpEmail()) // 이메일 주소
	              .cmpDunsNo(favCmpEntity.getCmpDunsNo()) // 크롤링한 회사 던스넘버
	              .cmpUrl(favCmpEntity.getCmpUrl()) // 홈페이지 주소
	              .userNum(userNum)
	              .build();
	}

}
