package com.dima.niceweb.ovsnews;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class APIController {
	
    
    /**
     * 해외뉴스 화면 요청 
     * @return
     */
    @GetMapping("/showOvsNews")
    public String ShowOvsNews() {

        return "showOvsNews";
    }
    
    /**
     * 해외뉴스 페이지 - 제목 클릭시 요청 
     * @return
     */
    @GetMapping("/showOvsNewsDetail")
    public String showOvsNewsDetail() {

        return "showOvsNewsDetail";
    }
}
