package com.dima.niceweb.email;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

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
@Table(name="SENDED_EML") // 실제 테이블과 이름이 같으면생략 가능 
public class EmailEntity {
	
	@SequenceGenerator(
			name="EMAIL_SEQ"
			,sequenceName="EMAIL_SEQ" // 실제 디비 이름 똑같이 
			,initialValue = 1
			,allocationSize = 1
			)
	@Id
	@GeneratedValue(generator = "EMAIL_SEQ")
    @Column(name = "EMAIL_NUM")
    private Long emailNum;

//    @Column(name = "USER_NUM")
//    private Long userNum;

    @Column(name = "RECEIVER")
    private String receiver;

    @Column(name = "EML_SUBJECT")
    private String emailSubject;

    @Column(name = "EML_CONTENT")
    private String emailContent;

    @Column(name = "SENDED_DATE")
    @CreationTimestamp // 글을 보낸 날짜로 자동 생성되게 함 
    private LocalDateTime sendedDate;
    
    /*
     * User(사용자) : email = 1:N 관계이다(하나의 사용자는 여러개의 보낸 메일을 가질 수 있다.) 
     */
    @ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="USER_NUM")
	private UserEntity userEntity;
    
    public static EmailEntity toEntity(EmailDTO emailDTO,UserEntity userEntity) {
    	return EmailEntity.builder()
    			.emailNum(emailDTO.getEmailNum())
    			.receiver(emailDTO.getReceiver())
    			.emailSubject(emailDTO.getEmailSubject())
    			.emailContent(emailDTO.getEmailContent())
    			.sendedDate(emailDTO.getSendedDate())
    			.userEntity(userEntity)
    			.build();
    }
	
	

}
