package com.dima.niceweb.email;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.dima.niceweb.user.UserEntity;
import com.dima.niceweb.user.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
	private final JavaMailSender mailSender;
	private final UserRepository userRepository;
	private final EmailRepository emailRepository;
	

// @Autowired //(생성자 자동 주입방식을 사용할 경우 쓰면 에러가 난다, 같이 사용 불가)
//	public EmailService(JavaMailSender mailSender) { // 구글 메일센더 
//		this.mailSender = mailSender;
//	}

	@Value("${spring.mail.username}") // 보내는 사람 계정은 관리자 계정임을 주의한다!
	String username;

	/**
	 * 메일 발송
	 * @param mailDTO
	 */
	public void mailSend(EmailDTO mailDTO) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mailDTO.getReceiver());
		message.setFrom(username);
		message.setSubject(mailDTO.getEmailSubject());
		message.setText(mailDTO.getEmailContent());
		mailSender.send(message);

	}
	
	/**
	 * 보낸 메시지 저장 
	 * @param mailDTO
	 */
	public void insertMail(EmailDTO mailDTO) {
		
		// mailDTO의 사용자 고유 넘버를 통해 사용자ENTITY를 찾아온다. 
		UserEntity userEntity = userRepository.findById(mailDTO.getUserNum()).get();
		//log.info("저장이 되는지에 대한 여부를 묻는다!!"+userEntity.toString());
		
		EmailEntity emailEntity = EmailEntity.toEntity(mailDTO, userEntity);
		emailRepository.save(emailEntity);
	
		
	}
	
	/**
	 * 이메일 리스트 출력 
	 * @param userNum
	 * @return
	 */
	public List<EmailDTO> selectAll(Long userNum) {
		// 사용자 엔티티 찾고 
		UserEntity userEntity =userRepository.findById(userNum).get(); 
		
		List<EmailEntity> emailEntityList = emailRepository.findAllByUserEntityOrderByEmailNumDesc(userEntity); // 최근에 보낸 메일 순서대로 출력 
		
		List<EmailDTO> emailDTOList = new ArrayList<>();
		
		for(EmailEntity temp : emailEntityList) {
			
			EmailDTO dto =EmailDTO.toDTO(temp, userNum);
			emailDTOList.add(dto);
		}
		return emailDTOList;
	}
	/**
	 * 이메일 한개 찾기 (이메일 세부사항에서 확인할 때 사용)
	 * @param emailNum
	 * @return
	 */
	public EmailDTO selectOne(Long emailNum) {
		EmailEntity emailEntity = emailRepository.findById(emailNum).get();
		EmailDTO emailDTO = EmailDTO.toDTO(emailEntity, emailNum);
		
		return emailDTO;
	}

	public void deleteOne(Long emailNum) {
		
		emailRepository.deleteById(emailNum);
		log.info(emailNum+"을 삭제 완료했습니다 ");
		
	}
	
	
	
	
}
