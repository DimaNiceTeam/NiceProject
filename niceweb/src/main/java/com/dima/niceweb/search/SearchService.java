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

		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			
			ResponseEntity<List> response=restTemplate.postForEntity(url, inputkeyword, List.class); 


			result = response.getBody();
		

			
			
		}catch(Exception e){
			error.put("statusCode", "450");
			error.put("body", "오류났음");
			log.info(error.toString());
			log.info("오류발생");
			
		}
		return result;
		
	}


}
