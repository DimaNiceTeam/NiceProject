package com.dima.niceweb.email;

import java.time.LocalDateTime;

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
public class EmailDTO {

	private Long emailNum;        // 이메일 고유 넘버 (시퀀스 자동생성)
    private Long userNum;         // 회원 고유번호
    private String receiver;     // 받는 사람
    private String emailSubject; // 메시지 제목
    private String emailContent; // 내용
    private LocalDateTime sendedDate;     // 보낸 날짜
	
	
    // entity -> dto 변환 
    
    public static EmailDTO toDTO(EmailEntity emailEntity,Long userNum) {
    	return EmailDTO.builder()
    			.emailNum(emailEntity.getEmailNum())
    			.receiver(emailEntity.getReceiver())
    			.emailSubject(emailEntity.getEmailSubject())
    			.emailContent(emailEntity.getEmailContent())
    			.sendedDate(emailEntity.getSendedDate())
    			.userNum(userNum)
    			.build();
    }
    

}
