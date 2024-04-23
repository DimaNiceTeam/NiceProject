package com.dima.niceweb.company;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name="CLIENT") // 실제 테이블과 이름이 같으면생략 가능 
public class CmpEntity {
	 	
		@Id
	    @Column(name = "DUNS_NO")
	    private String cmpDunsNo;

	    @Column(name = "CMP_NM", nullable = false)
	    private String cmpName;

	    @Column(name = "NAT_ID", nullable = false)
	    private String cmpNatId;

	    @Column(name = "NAT_CD", nullable = false)
	    private String cmpNatCd;

	    @Column(name = "NAT_KOR", nullable = false)
	    private String cmpNatKor;

	    @Column(name = "NAT_ENG", nullable = false)
	    private String cmpNatEng;

	    @Column(name = "CITY", nullable = false)
	    private String cmpCity;

	    @Column(name = "ADR", nullable = false)
	    private String cmpAddress;

	    @Column(name = "SIC_CD", nullable = false)
	    private String cmpSicCode;

	    @Column(name = "SALES")
	    private Long cmpSales;

	    @Column(name = "ASSET")
	    private Long cmpAsset;

	    @Column(name = "EMP")
	    private Long cmpEmp;

	    @Column(name = "CONTACT_GRD_CD")
	    private String cmpMkt;

	    @Column(name = "CREDIT_GRD_CD")
	    private String cmpCredit;

	    @Column(name = "URL", nullable = false)
	    private String cmpUrl;

	    @Column(name = "EML", nullable = false)
	    private String cmpEmail;
	    
	    
	    
	    public static CmpEntity toEntity(CmpDTO cmpDTO) {
			return CmpEntity.builder()
					.cmpDunsNo(cmpDTO.getCmpDunsNo())
		            .cmpName(cmpDTO.getCmpName())
		            .cmpNatId(cmpDTO.getCmpNatId())
		            .cmpNatCd(cmpDTO.getCmpNatCd())
		            .cmpNatKor(cmpDTO.getCmpNatKor())
		            .cmpNatEng(cmpDTO.getCmpNatEng())
		            .cmpCity(cmpDTO.getCmpCity())
		            .cmpAddress(cmpDTO.getCmpAddress())
		            .cmpSicCode(cmpDTO.getCmpSicCode())
		            .cmpSales(cmpDTO.getCmpSales())
		            .cmpAsset(cmpDTO.getCmpAsset())
		            .cmpEmp(cmpDTO.getCmpEmp())
		            .cmpMkt(cmpDTO.getCmpMkt())
		            .cmpCredit(cmpDTO.getCmpCredit())
		            .cmpUrl(cmpDTO.getCmpUrl())
		            .cmpEmail(cmpDTO.getCmpEmail())
		            .build();
					 
		             
		}

}
