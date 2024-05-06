package com.dima.niceweb.notice;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dima.niceweb.myfavcompany.NoticeService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller

@RequiredArgsConstructor
@Slf4j
public class NoticeController {
    private final NoticeService noticeService;

    /**
     * 글 목록 요청
     * 1 : index에서 넘어올 경우에는 searchItem과 searchWord가 없으므로 기본값 세팅
     * 1페이지를 요청한 것임
     * 2 : 목록상황에서 검색하여 넘어올 경우 searchItem과 searchWord가 있으므로 그 값 사용
     * 1페이지를 요청한 것임 
     * 3 : 목록의 하단에서 페이지를 선택할 경우 선택한 값을 사용
     * 
     * @return
     */
    @GetMapping("/noticeList")
    public String noticeList(Model model) {

        List<NoticeDTO> dtoList = noticeService.selectAll();

      

        model.addAttribute("list", dtoList);
        return "Notice/noticeList";
    }

    /**
     * 글 쓰기 화면 요청
     * 
     * @return
     */
    @GetMapping("/noticeWrite")
    public String noticeWrite() {
        

        return "Notice/noticeWrite";
    }

    /**
     * DB에 글 등록 요청
     * 
     * @return
     */
    @PostMapping("/noticeWrite")
    public String noticeWrite(
            @ModelAttribute NoticeDTO noticeDTO) {
        log.info("글 DB 저장 요청 : {}", noticeDTO.toString());

        noticeService.insertNotice(noticeDTO);

        return "redirect:/noticeList";
    }

    /**
     * noticeNum에 해당하는 글 한 개 조회
     * 
     * @param noticeNum
     * @param model
     * @return
     */
    @GetMapping("/noticeDetail")
    public String noticeDetail(
            @RequestParam(name = "noticeNum") Long noticeNum,
            @RequestParam(name = "searchItem", defaultValue = "noticeTitle") String searchItem,
            @RequestParam(name = "searchWord", defaultValue = "") String searchWord, Model model,
            HttpServletRequest request // 클라이언트로부터의 요청을 읽고 처리하는 데 사용
    // HttpServletResponse : 서버에서 클라이언트로의 응답을 생성하는 데 사용
    ) {
        NoticeDTO noticeDTO = noticeService.selectOne(noticeNum);

        // 조회수 증가
        noticeService.incrementHitcount(noticeNum);

        model.addAttribute("notice", noticeDTO);
        model.addAttribute("searchItem", searchItem);
        model.addAttribute("searchWord", searchWord);
        return "Notice/noticeDetail";
    }

    /**
     * noticeNum의 글을 삭제하기 위한 요청
     * 
     * @param noticeNum
     * @return
     */
    @GetMapping("/noticeDelete")
    public String noticeDelete(
            @RequestParam(name = "noticeNum") Long noticeNum, Model model) {

        noticeService.delectOne(noticeNum);

        return "redirect:/noticeList";
    }

  
}
