package net.dima.Nice.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchnageRateService {
	private final RestTemplate restTemplate;
	public Map<String, Double> restTest() {
		Map<String, Map<String, Double>> res = restTemplate.getForObject("https://open.er-api.com/v6/latest", Map.class);
		
		
		System.out.println("한국원화: "+res.get("rates").get("KRW"));  // Dollor 대비 원화 환율
		Map<String, Double> result = res.get("rates");
		
		return result;
		}
	

}
