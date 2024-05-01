package com.dima.niceweb.Notice;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dima.niceweb.email.EmailDTO;
import com.dima.niceweb.email.EmailEntity;
import com.dima.niceweb.user.UserEntity;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    @Value("${user.notice.pageLimit}")
    int pageLimit;

    private final NoticeRepository noticeRepository;

    // 업로드된 파일이 저장될 폴더 경로를 읽어옴
    @Value("${spring.servlet.multipart.location}")
    String uploadPath;

    /**
     * 목록 다 찾아옴
     * 
     * @param pageable
     * @param searchWord
     * @param searchItem
     * @return
     */
    public List<NoticeDTO> selectAll() {

        List<NoticeEntity> entityList = noticeRepository.findAll(Sort.by(Sort.Direction.DESC, "createDate"));

        List<NoticeDTO> dtoList = new ArrayList<>(); // DTO 생성자 추가

        // entity를 dto로 변환하여 List에 담는 작업
        entityList.forEach((entity) -> dtoList.add(NoticeDTO.toDTO(entity)));
        log.info("dassdadsadsdsdaasdsad");
        // 앞단으로 가져갈 내용만 추려서 생성
        // dtoList = entityList.map(notice -> new NoticeDTO(notice.getNoticeNum(),
        // notice.getNoticeWriter(),
        // notice.getNoticeTitle(),
        // notice.getHitCount(),
        // notice.getCreateDate()
        // ));

        return dtoList;
    }

    /**
     * DB에 게시글 저장
     * 
     * @param noticeDTO
     */
    public void insertNotice(NoticeDTO noticeDTO) {
        log.info("저장경로 : {}", uploadPath);

        NoticeEntity noticeEntity = NoticeEntity.toEntity(noticeDTO);

        noticeRepository.save(noticeEntity);
    }

    /**
     * DB에서 noticeNum에 해당하는 글을 조회
     * 
     * @param noticeNum
     * @return
     */
    public NoticeDTO selectOne(Long noticeNum) {
        Optional<NoticeEntity> entity = noticeRepository.findById(noticeNum);

        if (entity.isPresent()) { // 그게 존재하면
            NoticeEntity noticeEntity = entity.get();
            NoticeDTO dto = NoticeDTO.toDTO(noticeEntity);
            return dto;
        }
        return null;
    }

    /**
     * DB에서 noticeNum에 해당하는 글을 삭제
     * 
     * @param noticeNum
     */
    @Transactional // 하나의 메소드에서 두 개 이상의 쿼리가 날라갈때는 해줄 것.
    public void delectOne(Long noticeNum) {
        // 글번호에 해당하는 글을 읽어옴 --> savedfilename을 알아야 하므로!
        Optional<NoticeEntity> entity = noticeRepository.findById(noticeNum);

        if (entity.isPresent()) { // entity가 있으면
            NoticeEntity notice = entity.get();

            noticeRepository.deleteById(noticeNum); // 디렉토리에서 삭제도 하고 db에서도 삭제함.
        }
    }

    /**
     * DB에 데이터 수정 작업 처리
     * 
     * @param noticeDTO
     */
    @Transactional // 하나의 메소드에서 두 개 이상의 쿼리가 날라갈때는 해줄 것.
    public void updateOne(NoticeDTO noticeDTO) {

        // DB에서 데이터를 가져옴
        Optional<NoticeEntity> entity = noticeRepository.findById(noticeDTO.getNoticeNum());

        if (entity.isPresent()) {
            NoticeEntity noticeEntity = entity.get(); //

            // 3. 첨부파일이 아예 없는 경우 : 파일명이 모두 null인 상태 : 파일처리는 하면 안됨(기존 db 건들지마)
            // 업데이트 메소드니까 파일뿐만 아니라 제목, 내용등을 수정할 수 있으니 set해줌.
            noticeEntity.setNoticeTitle(noticeDTO.getNoticeTitle());
            noticeEntity.setNoticeContent(noticeDTO.getNoticeContent());
            noticeEntity.setUpdateDate(LocalDateTime.now());
        } // end if
    }// end updateOne

    /**
     * 조회수 증가
     * 
     * @param noticeNum
     */
    @Transactional // 하나의 메소드에서 두 개 이상의 쿼리(조회+업뎃)가 날라갈때는 해줄 것.
    public void incrementHitcount(Long noticeNum) {
        Optional<NoticeEntity> entity = noticeRepository.findById(noticeNum);
        if (entity.isPresent()) {
            NoticeEntity noticeEntity = entity.get();
            noticeEntity.setHitCount(noticeEntity.getHitCount() + 1);
        }
    }// end incrementHitcount

}
