package com.dima.niceweb.exchangeRate;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExchangeRateController {
	
	/**
	 * 환율 페이지 반환 
	 * @return
	 */
	@GetMapping("/rate")
	public String rate() {
		
		return "Main/exchangeRate";
	}

}
