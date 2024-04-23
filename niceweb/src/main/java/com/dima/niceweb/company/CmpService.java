package com.dima.niceweb.company;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CmpService { // 크롤링 데이터 서비스 
	private final CmpRepository cmpRepository;

	public CmpDTO selectOne(String dunsNo) {
		log.info("서비스 단의 던스넘버 확인하기 !!"+dunsNo);
		Optional<CmpEntity> entity = cmpRepository.findById(dunsNo);
		CmpEntity cmpEntity = entity.get();
		
		return CmpDTO.toDTO(cmpEntity);
	}

	
	

}
