package com.dima.niceweb.globe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GlobeController {
	
	/**
	 * 무역 통계 페이지 
	 * @return
	 */
    @GetMapping("/globeindex")
    public String globeindex() {

        return "Globe/globeindex";
    }
    
    /**
     * 무역 규제 페이지 요청
     * @return
     */
    @GetMapping("/showReg")
    public String showReg() {

        return "Globe/showReg";
    }

}