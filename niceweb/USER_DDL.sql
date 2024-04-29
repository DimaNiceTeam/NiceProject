<<<<<<< HEAD
-- 칠판에 적어놓은 sql 테이블 조지기

/*

이 파일에 생성되어있는 테이블

- 계정 테이블 (USER_ACC)
    - 바이어 즐겨찾기 (FAVORITE)
    - 보낸 메일함 (SENDED_EMLAIL)
    - 최근 검색어 (SEARCH_LOG)
=======
-- ĥ�ǿ� ������� sql ���̺� ������

/*

�� ���Ͽ� �����Ǿ��ִ� ���̺�

- ���� ���̺� (USER_ACC)
    - ���̾� ���ã�� (FAVORITE)
    - ���� ������ (SENDED_EMLAIL)
    - �ֱ� �˻��� (SEARCH_LOG)
>>>>>>> origin/feature-jin

*/


<<<<<<< HEAD
-- [ 계정 테이블 ] 생성
=======
-- [ ���� ���̺� ] ����
>>>>>>> origin/feature-jin

CREATE TABLE USER_ACC
(
      USER_NUM      NUMBER          CONSTRAINT USER_SEQ PRIMARY KEY
<<<<<<< HEAD
    , USER_ID       VARCHAR2(20)    UNIQUE NOT NULL             -- 사용자 아이디
    , USER_PWD      VARCHAR2(100)   NOT NULL                    -- 사용자 비밀번호
    , USER_DUNS_NO  VARCHAR2(9)     NOT NULL                    -- 사용자 회사 던스 번호
    , USER_CMP_ENG  VARCHAR2(100)   NOT NULL                    -- 사용자 회사명(영문)
    , USER_CMP_KOR  VARCHAR2(100)                               -- 사용자 회사명(한글)
    , USER_NTN      CHAR(2)         NOT NULL                    -- 사용자 국가 코드
    , USER_CEO_ENG  VARCHAR2(50)    NOT NULL                    -- 사용자 대표자명(영문)
    , USER_CEO_KOR  VARCHAR2(50)                                -- 사용자 대표자명(한글)
    , USER_EML      VARCHAR2(100)   NOT NULL                    -- 사용자 이메일 (담당자)
    , USER_PUB_EML  VARCHAR2(100)   NOT NULL                    -- 사용자 이메일 (회사 공용)
    , USER_SIC_CD   VARCHAR2(100)   NOT NULL                    -- 사용자 취급 품목
    , USER_URL      VARCHAR2(200)   NOT NULL                    -- 사용자 회사 URL
    , USER_ADR      VARCHAR2(200)   NOT NULL                    -- 사용자 주소 (영문)
    , USER_NAME     VARCHAR2(30)    NOT NULL                    -- 사용자 이름(담당자)
    , USER_PHONE    VARCHAR2(30)    NOT NULL                    -- 사용자 전화번호(담당자)
--    , USER_BUSINESS VARCHAR2(200)   CHECK (USER_BUSINESS IN   -- 사용자 업종
--                                    ('IMPORTER', 'EXPORTER', 'MANUFACTURER', 'DISTRIBUTOR')) 
--                                    NOT NULL    -- 업종도 우리가 생각했던 것과 달라서 CHECK OPTION도 수정해야함    
    , USER_KEYWORD  VARCHAR2(500)                               -- 사용자 관심 키워드
    , USER_ROLE     VARCHAR2(20)    DEFAULT 'ROLE_USER'         -- 사용자 가입 구분
                                    CHECK (USER_ROLE IN
                                    ('ROLE_USER','ROLE_ADMIN'))
                                    NOT NULL
    -- 매출 (SALES)
    -- 자산 (ASSET)
    -- 종업원수 (EMPLOYEES)
    -- 주요 취급 품목 (SIC_CD) (영문)
    -- 바이어등급 / 마케팅 등급 < 이건 D&B의 DB에서 받아야함
    -- 설립일은 없어서 제외
    -- 아직 정규화 안함 -- 진명(24.04.12)
);

-- user_id를 fk로 받는 보낸 [ 메일함 테이블 ] 생성
-- 작성자와 로그인사용자가 같은 행만 출력
CREATE TABLE SENDED_EML
(
      USER_NUM          NUMBER          REFERENCES              -- 사용자 아이디 = 보낸 사람
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , RECEIVER          VARCHAR2(50)    NOT NULL                -- 메일을 받는 사람
    , EML_CONTENT       VARCHAR2(3000)  NOT NULL                -- 보낸 내용
    --, REPLY_FILE
    , SENDED_DATE       DATE            NOT NULL
    -- 첨부파일 어쩌지
);


-- 바이어 찜기능 테이블 생성
-- 바이어 선택시에 별표를 누르면 이쪽에 저장되게끔
-- 그리고 USER_ACC 테이블과 ID값을 공유하여 찜한 계정과 로그인계정이 동일한 경우에만 출력
=======
    , USER_ID       VARCHAR2(20)    UNIQUE NOT NULL             -- ����� ���̵�
    , USER_PWD      VARCHAR2(100)   NOT NULL                    -- ����� ��й�ȣ
    , USER_DUNS_NO  VARCHAR2(9)     NOT NULL                    -- ����� ȸ�� ���� ��ȣ
    , USER_CMP_ENG  VARCHAR2(100)   NOT NULL                    -- ����� ȸ���(����)
    , USER_CMP_KOR  VARCHAR2(100)                               -- ����� ȸ���(�ѱ�)
    , USER_NTN      CHAR(2)         NOT NULL                    -- ����� ���� �ڵ�
    , USER_CEO_ENG  VARCHAR2(50)    NOT NULL                    -- ����� ��ǥ�ڸ�(����)
    , USER_CEO_KOR  VARCHAR2(50)                                -- ����� ��ǥ�ڸ�(�ѱ�)
    , USER_EML      VARCHAR2(100)   NOT NULL                    -- ����� �̸��� (�����)
    , USER_PUB_EML  VARCHAR2(100)   NOT NULL                    -- ����� �̸��� (ȸ�� ����)
    , USER_SIC_CD   VARCHAR2(100)   NOT NULL                    -- ����� ��� ǰ��
    , USER_URL      VARCHAR2(200)   NOT NULL                    -- ����� ȸ�� URL
    , USER_ADR      VARCHAR2(200)   NOT NULL                    -- ����� �ּ� (����)
    , USER_NAME     VARCHAR2(30)    NOT NULL                    -- ����� �̸�(�����)
    , USER_PHONE    VARCHAR2(30)    NOT NULL                    -- ����� ��ȭ��ȣ(�����)
--    , USER_BUSINESS VARCHAR2(200)   CHECK (USER_BUSINESS IN   -- ����� ����
--                                    ('IMPORTER', 'EXPORTER', 'MANUFACTURER', 'DISTRIBUTOR')) 
--                                    NOT NULL    -- ������ �츮�� �����ߴ� �Ͱ� �޶� CHECK OPTION�� �����ؾ���    
    , USER_KEYWORD  VARCHAR2(500)                               -- ����� ���� Ű����
    , USER_ROLE     VARCHAR2(20)    DEFAULT 'ROLE_USER'         -- ����� ���� ����
                                    CHECK (USER_ROLE IN
                                    ('ROLE_USER','ROLE_ADMIN'))
                                    NOT NULL
    -- ���� (SALES)
    -- �ڻ� (ASSET)
    -- �������� (EMPLOYEES)
    -- �ֿ� ��� ǰ�� (SIC_CD) (����)
    -- ���̾��� / ������ ��� < �̰� D&B�� DB���� �޾ƾ���
    -- �������� ��� ����
    -- ���� ����ȭ ���� -- ����(24.04.12)
);

-- user_id�� fk�� �޴� ���� [ ������ ���̺� ] ����
-- �ۼ��ڿ� �α��λ���ڰ� ���� �ุ ���
CREATE TABLE SENDED_EML
(
      USER_NUM          NUMBER          REFERENCES              -- ����� ���̵� = ���� ���
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , RECEIVER          VARCHAR2(50)    NOT NULL                -- ������ �޴� ���
    , EML_CONTENT       VARCHAR2(3000)  NOT NULL                -- ���� ����
    --, REPLY_FILE
    , SENDED_DATE       DATE            NOT NULL
    -- ÷������ ��¼��
);


-- ���̾� ���� ���̺� ����
-- ���̾� ���ýÿ� ��ǥ�� ������ ���ʿ� ����ǰԲ�
-- �׸��� USER_ACC ���̺�� ID���� �����Ͽ� ���� ������ �α��ΰ����� ������ ��쿡�� ���
>>>>>>> origin/feature-jin
CREATE TABLE FAVORITE
(   
      USER_NUM          NUMBER          REFERENCES
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , BUYER             VARCHAR2(100)   REFERENCES
                                        CLIENT(CMP_NM)
                                        ON DELETE CASCADE
    , NAT_CD            CHAR(2)         REFERENCES
                                        CLIENT(NAT_CD)
                                        ON DELETE CASCADE
<<<<<<< HEAD
    -- 기타 양식 기억
);

-- 사용자별 최근 검색어를 저장할 테이블 생성
-- prepend를 사용하여 가장 최근에 검색한 검색어를 가장 앞에 노출되게끔 생성
=======
    -- ��Ÿ ��� ���
);

-- ����ں� �ֱ� �˻�� ������ ���̺� ����
-- prepend�� ����Ͽ� ���� �ֱٿ� �˻��� �˻�� ���� �տ� ����ǰԲ� ����
>>>>>>> origin/feature-jin
CREATE TABLE SEARCH_LOG
(
      USER_NUM           NUMBER         REFERENCES
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
<<<<<<< HEAD
    , USER_LOG          VARCHAR2(50)                        -- 사용자 검색 정보
);

-- 여유가 된다면
-- 임시 보관함 << 가장 후순위


-- 시퀀스 생성
CREATE SEQUENCE USER_ACC_SEQ;


-- 테이블 삭제
=======
    , USER_LOG          VARCHAR2(50)                        -- ����� �˻� ����
);

-- ������ �ȴٸ�
-- �ӽ� ������ << ���� �ļ���


-- ������ ����
CREATE SEQUENCE USER_ACC_SEQ;


-- ���̺� ����
>>>>>>> origin/feature-jin


DROP TABLE USER_ACC;

    DROP TABLE SENDED_EML;
    
    DROP TABLE FAVORITE;
    
<<<<<<< HEAD
    DROP TABLE SEARCH_LOG;
=======
    DROP TABLE SEARCH_LOG;
>>>>>>> origin/feature-jin
