package com.dima.niceweb.notice;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
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

@Entity
@Table(name = "notice")
public class NoticeEntity {
    @SequenceGenerator(name = "notice_seq", sequenceName = "notice_seq", initialValue = 1, allocationSize = 1)

    @Id
    @GeneratedValue(generator = "notice_seq")
    @Column(name = "notice_num")
    private Long noticeNum;

    @Column(name = "notice_writer")
    private String noticeWriter;

    @Column(name = "notice_title")
    private String noticeTitle;

    @Column(name = "notice_content", nullable = false)
    private String noticeContent;

    @Column(name = "hit_count")
    private int hitCount;

    @CreationTimestamp
    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    /**
     * 댓글과의 관계설정.
     * mappedBy : one에 해당하는 테이블 엔티티
     * CascadeType.REMOVE 이 값으로 on delete cascade를 설정
     * fetch : LAZY는 지연호출, EAGER : 즉시호출
     * db에서 자식 fk에 cascade 조건을 걸지만 entity에서는 부모에 검
     */

    public static NoticeEntity toEntity(NoticeDTO noticeDTO) {
        return NoticeEntity.builder()
                .noticeNum(noticeDTO.getNoticeNum())
                .noticeWriter(noticeDTO.getNoticeWriter())
                .noticeTitle(noticeDTO.getNoticeTitle())
                .noticeContent(noticeDTO.getNoticeContent())
                .hitCount(noticeDTO.getHitCount())
                .createDate(noticeDTO.getCreateDate())
                .updateDate(noticeDTO.getUpdateDate())
                .build();
    }
}
