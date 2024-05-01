
/*

�� ���Ͽ� �����Ǿ��ִ� ���̺�

- ��������(NOTICE)
- ���ǻ���(INQUIRY)
    - ���(REPLY)

*/


-- �������� ���̺� ����
-- ������ ����ڵ� Ȯ�� ���� -- ���� ����
-- �����ڸ� �ۼ� ���� ���� ����
CREATE TABLE Notice
(
    Notice_Num          NUMBER constraint notice_seq PRIMARY KEY
    , Notice_Writer     VARCHAR2(20) default 'NICE2MATCHYOU'
    , Notice_Title      VARCHAR2(200) default '제목없음'
    , Notice_Content    VARCHAR2(4000)
    , hit_count         NUMBER default 0
    , create_date       DATE default sysdate
    , update_date       DATE
);

CREATE SEQUENCE Notice_seq;

DROP TABLE Notice;
DROP SEQUENCE Notice_seq;

select * from Notice;




-- ���ǻ��� ���̺� ����
-- �ۼ��ڿ� �α��λ���ڰ� ���� �ุ ���
-- ������ = ��� ���ǻ����� Ȯ�� ����
CREATE TABLE INQUIRY
(
      INQUIRY_NO                  NUMBER          PRIMARY KEY
    , INQUIRY_WRITER              VARCHAR2(20)    REFERENCES 
                                                  USER_ACC(USER_ID) 
                                                  ON DELETE CASCADE
    , INQUIRY_TITLE               VARCHAR2(300)   NOT NULL
    , INQUIRY_CONTENT             VARCHAR2(3000)  NOT NULL
    , INQUIRY_CREATE_DATE         DATE            DEFAULT SYSDATE
                                                  NOT NULL
    , INQUIRY_UPDATE_DATE         DATE
    , INQUIRY_ORIGINALFILENAME    VARCHAR2(300)
    , INQUIRY_SAVEDFILENAME       VARCHAR2(300)
    , INQUIRY_APPROVAL            CHAR(1)         DEFAULT 1
                                                  CHECK(board_APPROVAL IN
                                                  ('USER', 'ADMIN'))
                                                  NOT NULL
); -- �ݵ�� USER_ACC�� ������ �� �����ų ��


-- ���� �亯(���)���̺� ����
CREATE TABLE REPLY
(
    REPLY_NO            NUMBER          PRIMARY KEY
    , BOARD_NO          NUMBER          REFERENCES
                                        INQUIRY(INQUIRY_NO)
                                        ON DELETE CASCADE
    , REPLY_WRITER      VARCHAR2(20)    REFERENCES
                                        USER_ACC(USER_ID)
                                        ON DELETE CASCADE
    , REPLY_CONTENT     VARCHAR2(3000)  NOT NULL
    , REPLY_CREATE_DATE DATE            DEFAULT SYSDATE
                                        NOT NULL
    , REPLY_UPDATE_DATE DATE
); -- �ݵ�� BOARD�� ������ �� �����ų ��






-- ������ ����

CREATE SEQUENCE INQUIRY_SEQ;

CREATE SEQUENCE REPLY_SEQ;

-- ���̺� ����
-- ������ ������ ����


DROP TABLE NOTICE;

DROP TABLE INQUIRY;

    DROP TABLE REPLY;


