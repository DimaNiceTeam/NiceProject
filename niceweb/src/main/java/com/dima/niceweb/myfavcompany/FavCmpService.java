package com.dima.niceweb.myfavcompany;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dima.niceweb.user.UserEntity;
import com.dima.niceweb.user.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FavCmpService { // 마이페이지  - 찜기능 관현 서비스 부분
	
	private final FavCmpRepository favCmpRepository; //  찜리스트 
	private final UserRepository userRepository;
	
	/**
	 * 사용자의 찜한 회사 리스트를 모두 반환하는 서비스 함수 
	 * @param userNum
	 * @return
	 */
	public List<FavCmpDTO> favCmpAll(Long userNum) {
		
		
		
		log.info("서비스 부분입니다만!!{}번입니다",userNum);
		UserEntity userEntity =userRepository.findById(userNum).get(); // 사용자 엔티티찾고 
		
		List<FavCmpEntity> favCmpEntityList = favCmpRepository.findAllByUserEntity(userEntity);
		
		List<FavCmpDTO> favCmpDTOList = new ArrayList<>();
		
		// entity를 dto로 변환하는 작업 
		for(FavCmpEntity temp : favCmpEntityList) {
			
			FavCmpDTO dto =FavCmpDTO.toDTO(temp, userNum);
			favCmpDTOList.add(dto);
		}
		
		return favCmpDTOList;
	}
	
	/**
	 * 찜 리스트에서 삭제 
	 * @param favCmpNo
	 */
	public void favCmpDelete(Long favCmpNo) {
		favCmpRepository.deleteById(favCmpNo);
		
		
	}
	
	
	/**
	 * 해당 회사가 사용자의 찜리스트에 들어있는지 확인하기 
	 * @param userNum
	 * @param dunsNo
	 * @return
	 */
	public Boolean favCmpFind(Long userNum, String dunsNo) {

		UserEntity userEntity =userRepository.findById(userNum).get(); // 사용자 엔티티를 먼저 찾는다. 
		List<FavCmpEntity> favCmpEntityList = favCmpRepository.findAllByUserEntity(userEntity);
		// 사용자가 존재하지 않는다면 
		if(favCmpEntityList.isEmpty()) {
			return true; // insert 추가해도된다. 
			
		}else{

			for(FavCmpEntity temp : favCmpEntityList) {
				if(dunsNo.equals(temp.getCmpDunsNo())) return false; // 이미 존재한다면 insert 불가능
			}
		return true;// insert 가능 
		}//else
	
	}
	/**
	 * 찜리스에 회사 추가하기 
	 * @param favCmpDTO
	 * @param userNum
	 */
	public void favCmpInsert(FavCmpDTO favCmpDTO, Long userNum) {
		Optional<UserEntity> entity = userRepository.findById(userNum);
		UserEntity userEntity = entity.get();
		
		FavCmpEntity favEntity = FavCmpEntity.toEntity(favCmpDTO,userEntity);
		favCmpRepository.save(favEntity); // 저장하기 
		
	}

	
}
