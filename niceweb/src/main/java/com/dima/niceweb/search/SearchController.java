package com.dima.niceweb.search;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SearchController {
	private final SearchService service;

	@GetMapping("/search")
	public String searchProduct(
			@RequestParam(name="inputKeyword", defaultValue = "")String inputKeyword, 
			@RequestParam(name="nation", defaultValue = "")String nation,
			Model model) {
		
		model.addAttribute("inputKeyword",inputKeyword);
		model.addAttribute("nation",nation);
		
		
		return "Company/cosine";
		//return "Stat/mirae";
	}

	@PostMapping("/predict")
	@ResponseBody
	public List<Map<String, Object>> searchProduct(@ModelAttribute InputKeywordDTO inputkeyword) {

		log.info(inputkeyword.toString());// 사용자가 입력한 값
		List<Map<String, Object>> result = service.predictRest(inputkeyword);
		log.info("ajax로 넘길거");// 사용자가 입력한 값
		return result;

	}
}
