package com.dima.niceweb.search;


import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {
	@Value("${cosine.predict.server}")
	String url;
	private final RestTemplate restTemplate;

	public List<Map<String, Object>> predictRest(InputKeywordDTO inputkeyword) {
		log.info(url);
		Map<String, String> error = new HashMap<>();
		List<Map<String, Object>> result =  new ArrayList<>();
//		log.info("url출력 "+url);
//		log.info("inputkeyword출력 "+inputkeyword);
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			//log.info("1: {}", restTemplate);
			
			ResponseEntity<List> response=restTemplate.postForEntity(url, inputkeyword, List.class); 

//			log.info("여기까지는 오시나용??/");
//			log.info("2: {}", restTemplate);
			result = response.getBody();
		
			//log.info("결과값하이룽: {}", result);
			
			
		}catch(Exception e){
			error.put("statusCode", "450");
			error.put("body", "오류났음");
			log.info(error.toString());
			log.info("오류다이놈들아 err란 말이다~~~~~~~");
			
		}
		return result;
		
	}


}
