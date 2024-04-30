package com.dima.niceweb.notice;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder
public class NoticeDTO {
    private Long noticeNum;
    private String noticeWriter;
    private String noticeTitle;
    private String noticeContent;
    private int hitCount;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    // 파일이 첨부되었을 때 추가작업 : DTO가 데이터를 받는 곳이기 때문에 작업해줘야 함
    // private MultipartFile uploadFile;

    // 생성자(페이징을 위한 생성자, noticeList에서 사용할 내용으로 추림)
    public NoticeDTO(Long noticeNum, String noticeWriter, String noticeTitle, int hitCount, LocalDateTime createDate,
            String originalFileName) {
        super();
        this.noticeNum = noticeNum;
        this.noticeWriter = noticeWriter;
        this.noticeTitle = noticeTitle;
        this.hitCount = hitCount;
        this.createDate = createDate;
    }

    // entity -> dto
    public static NoticeDTO toDTO(NoticeEntity noticeentity) {
        // DTO를 전달받아 Entity로 반환
        return NoticeDTO.builder()
                .noticeNum(noticeentity.getNoticeNum())
                .noticeWriter(noticeentity.getNoticeWriter())
                .noticeTitle(noticeentity.getNoticeTitle())
                .noticeContent(noticeentity.getNoticeContent())
                .hitCount(noticeentity.getHitCount())
                .createDate(noticeentity.getCreateDate())
                .updateDate(noticeentity.getUpdateDate())
                .build();
    }

}
