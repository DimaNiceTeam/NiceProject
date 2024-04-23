package com.dima.niceweb.email;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.dima.niceweb.search.InputKeywordDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/mail")
@RequiredArgsConstructor
public class EmailController {
	private final EmailService mailService;
	
	/**
	 * 보낸 메일함 화면 요청 
	 * @return
	 */
	@GetMapping("/sendedMail")
	public String sendedMail() {
		
		return "/email/email";
	}
	
	/**
	 * 보낸 메일함에 저장된 메일DTO리스트 반환 (init함수에 쓰임)
	 * @param userNum
	 * @return
	 */
	@GetMapping("/mailList")
	@ResponseBody
	public List<EmailDTO> mailList(@RequestParam(name="userNum") Long userNum){
		
		log.info("여기는 니??"+userNum);
		List<EmailDTO> mailList = mailService.selectAll(userNum);
		
		return mailList;
	}
	
	
	/**
	 * 메일 보내기  - 검색 페이지 다시요총 
	 * @param mailDTO
	 * @return
	 */
	@PostMapping("/mailsend")
	public String sendMail(EmailDTO mailDTO, InputKeywordDTO inputkeyword, RedirectAttributes rttr) {
		
		
		
		mailService.mailSend(mailDTO);
		mailService.insertMail(mailDTO);// 보낸 메일함에 메시지 저장 
		
		log.info(inputkeyword.getInputKeyword());
		log.info(inputkeyword.getNation());
		
		rttr.addAttribute("inputKeyword", inputkeyword.getInputKeyword());
		rttr.addAttribute("nation",inputkeyword.getNation());
		
		return "redirect:/search";

	}
	
	/**
	 * 이메일 한개 찾기 (이메일 세부사항에서 확인할 때 사용)
	 * @param emailNum
	 * @return
	 */
	@GetMapping("/mailSelectOne")
	@ResponseBody
	public EmailDTO mailSelectOne(@RequestParam(name="emailNum") Long emailNum){
		
		
		EmailDTO mailDTO = mailService.selectOne(emailNum);
		
		
		return mailDTO;
	}
	
	/**
	 * 이메일 삭제 
	 * @param emailNum
	 */
	@GetMapping("mailDelete")
	@ResponseBody
	public String mailDelete(@RequestParam(name="emailNum") Long emailNum) {
		log.info("~~~~~~~~~여기는까지 오  니??"+emailNum);
		mailService.deleteOne(emailNum);
		
		return "success";
	
		
	}

	
	
}
