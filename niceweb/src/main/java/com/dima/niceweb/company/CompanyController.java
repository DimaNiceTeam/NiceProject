package com.dima.niceweb.company;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor 
public class CompanyController { // 크롤링한 회사 데이터 컨트롤러 
	private final CmpService cmpService;
	
	@GetMapping("/cmpSelect")
	@ResponseBody
	public CmpDTO CmpSelect(@RequestParam(name="dunsNo") String dunsNo) {
		
		CmpDTO cmpDTO = cmpService.selectOne(dunsNo);
		
		return cmpDTO;
	}

}
