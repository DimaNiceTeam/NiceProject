package com.dima.niceweb.myfavcompany;

import com.dima.niceweb.user.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
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
@Table(name="FAVORITE") // 실제 테이블과 이름이 같으면생략 가능 
public class FavCmpEntity { // 마이페이지 - 찜기능 
	
	@SequenceGenerator(
			name = "FAVORITE_SEQ",
			sequenceName = "FAVORITE_SEQ",
			initialValue = 1,
			allocationSize = 1
				
			)
	@Id
	@GeneratedValue(generator="FAVORITE_SEQ")
	@Column(name="FAVORITE_NUM")
	private Long favCmpNo;

	
    @Column(name = "CMP_NM", nullable = false) // 회사명
    private String cmpName;

    @Column(name = "EML", nullable = false) // 이메일 주소
    private String cmpEmail;

    @Column(name = "DUNS_NO", nullable = false) // 크롤링한 회사 던스넘버
    private String cmpDunsNo;

    @Column(name = "URL", nullable = false) // 홈페이지 주소
    private String cmpUrl;


    
    /*
     * User : FavCmp = 1: 다 관계 
     */
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="USER_NUM")
	private UserEntity userEntity;
	
	
	public static FavCmpEntity toEntity(FavCmpDTO favCmpDTO, UserEntity userEntity) {
		return FavCmpEntity.builder()
				.favCmpNo(favCmpDTO.getFavCmpNo())
                .cmpName(favCmpDTO.getCmpName())
                .cmpEmail(favCmpDTO.getCmpEmail())
                .cmpDunsNo(favCmpDTO.getCmpDunsNo())
                .cmpUrl(favCmpDTO.getCmpUrl())
                .userEntity(userEntity)
                .build();
	}

}
