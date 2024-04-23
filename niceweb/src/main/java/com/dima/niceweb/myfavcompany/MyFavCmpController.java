package com.dima.niceweb.myfavcompany;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dima.niceweb.company.CmpDTO;
import com.dima.niceweb.company.CmpService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor 
public class MyFavCmpController {// 마이페이지 - 찜기능 관련 컨트롤러
	private final FavCmpService favCmpService; // 찜기능 서비스 불러오기 
	private final CmpService cmpService; // 크롤링한 회사 서비스 부분 불러오기 
	//private final	
	
	/**
	 * 마이페이지의 찜기능 페이지 반환 
	 * @return
	 */
	@GetMapping("/myFavCompany")
	public String favCmp() {
		return "myPage/favCompany";
	}
	
	/**
	 * 찜한 회사목록 모두 출력 
	 * @return
	 */
	@GetMapping("/favCmpAll")
	@ResponseBody
	public List<FavCmpDTO> favCmpAll(@RequestParam(name = "userNum") Long userNum) {
	
		List<FavCmpDTO> favCmpList  =favCmpService.favCmpAll(userNum);
		return favCmpList;
	}
	
	/**
	 * 찜리스트에서 회사 삭제 
	 * @param favCmpNo
	 * @return
	 */
	@GetMapping("/favCmpDelete")
	@ResponseBody
	public String favCmpDelete(@RequestParam(name="favCmpNo") Long favCmpNo) {
		//log.info("넘어온 번호{}",favCmpNo);
		favCmpService.favCmpDelete(favCmpNo);
		
		return"success";
	}
	
	/**
	 * 찜리스트에 회사를 추가
	 * @param dunsNo
	 * @param userNum
	 * @return
	 */
	@GetMapping("/favCmpInsert")
	@ResponseBody
	public Boolean favCmpInsert(@RequestParam(name="dunsNo") String dunsNo, @RequestParam(name="userNum") Long userNum ) {
	
		Boolean result = favCmpService.favCmpFind(userNum,dunsNo);
		if(result) {
			// 1) 회사 정보 찾아오기 (던스넘버를 통해 크롤링한 회사 데이터 저장 )
			CmpDTO cmpDTO = cmpService.selectOne(dunsNo); // 크롤링 데이터 끌어오는거 완료 
			
			// 2) dto 만들어서 DB에 저장하기 
			FavCmpDTO favCmpDTO = new FavCmpDTO();
			favCmpDTO.setCmpName(cmpDTO.getCmpName()); // 회사명 끌어와서 저장하기 
			favCmpDTO.setCmpEmail(cmpDTO.getCmpEmail()); // 이메일 끌어와서 저장하기 
			favCmpDTO.setCmpDunsNo(dunsNo); // 던스넘버 
			favCmpDTO.setCmpUrl(cmpDTO.getCmpUrl()); // 홈페이지 주소 
			favCmpDTO.setUserNum(userNum); // 회원 고유번호 
			favCmpService.favCmpInsert(favCmpDTO,userNum);
			
			return true; // 리스트에 회사를 추가한후 true를 반환 
		}
		return false; // 이미 리스트에 추가된 회사라면 false를 반환 
		
	}
	
	
	

}
