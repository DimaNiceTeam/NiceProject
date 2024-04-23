package com.dima.niceweb.company;



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
public class CmpDTO { // 크롤링한 회사들의 데이터 입니다 
	
  	private String cmpDunsNo; // 던스넘버 
    private String cmpName; // 회사명
    private String cmpNatId; //국가 아이디
    private String cmpNatCd;//국가 코드 
    private String cmpNatKor; //국가명(한글)
    private String cmpNatEng; //국가명(영문)
    private String cmpCity; // 도시명
    private String cmpAddress; // 주소
    private String cmpSicCode; // 취급 품목
    private Long cmpSales; // 매출
    private Long cmpAsset; // 자산
    private Long cmpEmp; // 종업원수
    private String cmpMkt ; // 마케팅
    private String cmpCredit; //신용 등급
    private String cmpUrl; // 홈페이지 주소
    private String cmpEmail; // 이메일 주소
    
    public static CmpDTO toDTO(CmpEntity cmpEntity) {
		return CmpDTO.builder()
				.cmpDunsNo(cmpEntity.getCmpDunsNo())
	            .cmpName(cmpEntity.getCmpName())
	            .cmpNatId(cmpEntity.getCmpNatId())
	            .cmpNatCd(cmpEntity.getCmpNatCd())
	            .cmpNatKor(cmpEntity.getCmpNatKor())
	            .cmpNatEng(cmpEntity.getCmpNatEng())
	            .cmpCity(cmpEntity.getCmpCity())
	            .cmpAddress(cmpEntity.getCmpAddress())
	            .cmpSicCode(cmpEntity.getCmpSicCode())
	            .cmpSales(cmpEntity.getCmpSales())
	            .cmpAsset(cmpEntity.getCmpAsset())
	            .cmpEmp(cmpEntity.getCmpEmp())
	            .cmpMkt(cmpEntity.getCmpMkt())
	            .cmpCredit(cmpEntity.getCmpCredit())
	            .cmpUrl(cmpEntity.getCmpUrl())
	            .cmpEmail(cmpEntity.getCmpEmail())
	            .build();
				 
	             
	}

}
