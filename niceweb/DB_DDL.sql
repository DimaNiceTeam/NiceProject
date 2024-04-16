
/*
�� SQL������
https://gent.tistory.com/361

�� ���Ͽ� �����Ǿ��ִ� ���̺�

- ī�װ� ���̺� (CTGY)
    - ��з� (MAIN_CTGY)
    - �Һз� (SUB_CTGY)
    - ��ǰ�� (ITEM_NM)

- URL ���̺�(CLIENT)
    - ȸ�� (CMP)
    - ���� (NTN)
        - �����ڵ庯ȯ (NTN_TEXT)
    - ȸ������(INFO)
*/


-- ī�װ� ���̺� ����

CREATE TABLE CTGY
(
      MAIN_NM   VARCHAR2(50)
    , SUB_NM    VARCHAR2(50)
    , ITEM_NM   VARCHAR2(50)
    , MAIN_ID   VARCHAR2(50)
    , SUB_ID    VARCHAR2(50)
    , ITEM_ID   VARCHAR2(50)
);
    
            CREATE VIEW MAIN_CTGY
                AS
                    SELECT  MAIN_ID
                            , MAIN_NM
                    FROM CTGY
                    WITH READ ONLY
                ;
            
            
            CREATE VIEW SUB_CTGY
                AS
                    SELECT  SUB_ID
                            , SUB_NM
                            , MAIN_ID
                    FROM CTGY
                    WITH READ ONLY
                ;
            
            
            CREATE VIEW ITEM_NM
                AS
                    SELECT  ITEM_ID
                            , ITEM_NM
                            , SUB_ID
                    FROM CTGY
                    WITH READ ONLY
                ;


-- URL ���̺� ���� (�θ�) ( �ܼ� �����, ��ȸ�� �̰ŷ� ���� )
-- JOIN���� ���� USER_ACC ��ü�� �����ؾ��ϱ� ������ ����ȭ���� ���� �������� Ʋ�� ������ ��ȸ�� ���� ����ȭ�� ���̺��� �̿�
CREATE TABLE CLIENT
(
      DUNS_NO           VARCHAR2(100)   PRIMARY KEY     -- DUNS�ѹ�
    , CMP_NM            VARCHAR2(100)   NOT NULL        -- ȸ���
    , NAT_CD            CHAR(2)         NOT NULL        -- ���� �ڵ�
    , NAT_KOR           VARCHAR2(20)    NOT NULL        -- ������ (�ѱ�)
    , NAT_ENG           VARCHAR2(20)    NOT NULL        -- ������ (����)
    , CITY              VARCHAR2(100)   NOT NULL        -- ���ø�
    , ADR               VARCHAR2(100)   NOT NULL        -- ��ü �ּ�
    , SIC_CD            VARCHAR2(100)   NOT NULL        -- �ֿ� ��� ǰ��
    , SALES             NUMBER(20)                      -- ����
    , ASSET             NUMBER(20)                      -- �ڻ�
    , EMP               NUMBER(10)                      -- ��������
    , CONTACT_GRD_CD    VARCHAR2(4)                     -- ������ ���
    -- NOT NULL�� �ƴ� ��� NICE�� �ſ����� �������� ��� ����ڿ��� �ٸ� ����ڿ��� ������ ��ƴٴ� ���� ���â ����
    , CREDIT_GRD_CD     VARCHAR2(4)                     -- �ſ� ���
    , URL               VARCHAR2(200)   NOT NULL        -- Ȩ������ �ּ�
    , EML               VARCHAR2(100)   NOT NULL        -- �̸��� �ּ�
    , ENG               VARCHAR2(2000)  NOT NULL        -- ���� Ű���� ���
);

-- ȸ�� ���� VIEW ����
            CREATE VIEW CMP
                AS
                    SELECT  DUNS_NO
                            , CMP_NM
                            , SIC_CD
                            , SALES
                            , ASSET
                            , EMP
                            , CONTACT_GRD_CD
                            , CREDIT_GRD_CD
                            , URL
                            , EML
                            , ENG
                            , NAT_ID
                    FROM CLIENT
                    WITH READ ONLY
                ;


-- ���� VIEW ����
            CREATE VIEW NTN
                AS
                    SELECT  NAT_ID
                            , NAT_CD
                            , NAT_KOR
                            , NAT_ENG
                    FROM CLIENT
                    ORDER BY NAT_ID
                    WITH READ ONLY
                ;


-- �ּ� ���̺� ����
            CREATE VIEW LOC
                AS
                    SELECT  NTN_ID
                            , CITY
                            , ADR
                    FROM CLIENT
                    WITH READ ONLY
                ;


-- ���̺� ����
-- ������ ������ ����

DROP TABLE CTGY;

    DROP VIEW MAIN_CTGY;
    
    DROP VIEW SUB_CTGY;
    
    DROP VIEW ITEM_NM;



DROP TABLE CLIENT;

    DROP VIEW CMP;
    
    DROP VIEW NTN;