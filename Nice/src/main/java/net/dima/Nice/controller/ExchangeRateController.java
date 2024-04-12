package net.dima.Nice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ExchangeRateController {
	@GetMapping("/rate")
	public String rate() {
		
		//log.info("결과값 출력: "+ result);
		return "rate";
	}
	

}
