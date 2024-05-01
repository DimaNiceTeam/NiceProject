-- 칠판에 적어놓은 sql 테이블 조지기

/*

이 파일에 생성되어있는 테이블

- 계정 테이블 (USER_ACC)
    - 바이어 즐겨찾기 (FAVORITE)
    - 보낸 메일함 (SENDED_EMLAIL)
    - 최근 검색어 (SEARCH_LOG)

*/


-- [ 계정 테이블 ] 생성

DROP SEQUENCE USER_SEQ;
CREATE SEQUENCE USER_SEQ;
DROP TABLE USER_ACC;
CREATE TABLE USER_ACC
(
      USER_NUM      NUMBER          CONSTRAINT USER_SEQ PRIMARY KEY -- 시퀀스 
    , USER_ID       VARCHAR2(20)    UNIQUE NOT NULL             -- 사용자 아이디 
    , USER_PWD      VARCHAR2(100)   NOT NULL                    -- 사용자 패스워드 
    , USER_DUNS_NO  VARCHAR2(9)     NOT NULL                    -- 던스 넘버 
    , USER_CMP_ENG  VARCHAR2(100)   NOT NULL                    -- 회사명 (영문)
    , USER_CMP_KOR  VARCHAR2(100)                               -- 회사명 (한글)
    , USER_NTN      CHAR(2)         NOT NULL                    -- 사용자 국가  
    , USER_CEO_ENG  VARCHAR2(50)    NOT NULL                    -- 대표명 (영문)
    , USER_CEO_KOR  VARCHAR2(50)                                -- 대표명 (한글)
    , USER_EML      VARCHAR2(100)   NOT NULL                    -- 담당자 이메일 
    , USER_PUB_EML  VARCHAR2(100)   NOT NULL                    -- 회사 이메일 
    , USER_SIC_CD   VARCHAR2(100)   NOT NULL                    -- 주요 취급 품목 
    , USER_URL      VARCHAR2(200)   NOT NULL                    -- 회사 url
    , USER_ADR      VARCHAR2(200)   NOT NULL                    -- 담당자 주소 
    , USER_NAME     VARCHAR2(30)    NOT NULL                    -- 담당자명 
    , USER_PHONE    VARCHAR2(30)    NOT NULL                    -- 담당자 번호 
    , USER_KEYWORD  VARCHAR2(500)                               -- 사용자 관심 키워드 
    , USER_ROLE     VARCHAR2(20)    DEFAULT 'ROLE_USER'         -- 권한 
                                    CHECK (USER_ROLE IN
                                    ('ROLE_USER','ROLE_ADMIN'))
                                    NOT NULL

);

SELECT * FROM USER_ACC;

-- user_id를 fk로 받는 보낸 [ 메일함 테이블 ] 생성
-- 작성자와 로그인사용자가 같은 행만 출력
drop  SEQUENCE EMAIL_SEQ;
CREATE SEQUENCE EMAIL_SEQ; -- 시퀀스 생성 

drop table SENDED_EML;
CREATE TABLE SENDED_EML
(
      EMAIL_NUM         NUMBER PRIMARY KEY                      -- 이메일 고유 넘버 (시퀀스 자동생성)
    , USER_NUM          NUMBER          REFERENCES              -- 회원 고유번호 
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , RECEIVER          VARCHAR2(50)    NOT NULL                -- 받는 사람 
    , EML_SUBJECT       VARCHAR(300)    NOT NULL                -- 메시지 제목도 저장하기 
    , EML_CONTENT       VARCHAR2(2500)  NOT NULL                -- 내용 
    , SENDED_DATE       DATE            NOT NULL              -- 오늘 날짜 
   
);
select * from SENDED_EML ;


-- 바이어 찜기능 테이블 생성
-- 바이어 선택시에 별표를 누르면 이쪽에 저장되게끔
-- 그리고 USER_ACC 테이블과 ID값을 공유하여 찜한 계정과 로그인계정이 동일한 경우에만 출력
-- *****찜기능 테이블 만들기**** 
drop sequence FAVORITE_SEQ;
CREATE SEQUENCE FAVORITE_SEQ; -- 시퀀스 생성 
DROP TABLE FAVORITE;
CREATE TABLE FAVORITE
(   FAVORITE_NUM NUMBER PRIMARY KEY
    ,USER_NUM NUMBER         REFERENCES USER_ACC(USER_NUM) ON DELETE CASCADE
    ,CMP_NM  VARCHAR2(150)   NOT NULL  
    ,EML     VARCHAR2(100)   NOT NULL  
    ,DUNS_NO VARCHAR2(100)   NOT NULL  
    ,URL     VARCHAR2(200)   NOT NULL  
  
);
select * from FAVORITE;

-- 사용자별 최근 검색어를 저장할 테이블 생성
-- prepend를 사용하여 가장 최근에 검색한 검색어를 가장 앞에 노출되게끔 생성
CREATE TABLE SEARCH_LOG
(
      USER_NUM           NUMBER         REFERENCES
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , USER_LOG          VARCHAR2(50)                        -- 사용자 검색 정보
);

-- 여유가 된다면
-- 임시 보관함 << 가장 후순위


-- 시퀀스 생성
CREATE SEQUENCE USER_ACC_SEQ;


-- 테이블 삭제


DROP TABLE USER_ACC;

    DROP TABLE SENDED_EML;
    
    DROP TABLE FAVORITE;
    
    DROP TABLE SEARCH_LOG;
