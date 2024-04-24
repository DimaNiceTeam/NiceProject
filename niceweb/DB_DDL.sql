
/*
ë‚´ SQLì„ ìƒë‹˜
https://gent.tistory.com/361

ì´ íŒŒì¼ì— ìƒì„±ë˜ì–´ìžˆëŠ” í…Œì´ë¸”

- ì¹´í…Œê³ ë¦¬ í…Œì´ë¸” (CTGY)
    - ëŒ€ë¶„ë¥˜ (MAIN_CTGY)
    - ì†Œë¶„ë¥˜ (SUB_CTGY)
    - ìƒí’ˆëª… (ITEM_NM)

- URL í…Œì´ë¸”(CLIENT)
    - íšŒì‚¬ (CMP)
    - êµ­ê°€ (NTN)
        - êµ­ê°€ì½”ë“œë³€í™˜ (NTN_TEXT)
    - íšŒì‚¬ì •ë³´(INFO)
*/


-- ì¹´í…Œê³ ë¦¬ í…Œì´ë¸” ìƒì„±

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
            
            
            CREATE VIEW ITEM
                AS
                    SELECT  ITEM_ID
                            , ITEM_NM
                            , SUB_ID
                    FROM CTGY
                    WITH READ ONLY
                ;


-- URL í…Œì´ë¸” ìƒì„± (ë¶€ëª¨) ( ë‹¨ìˆœ ì €ìž¥ìš©, ì¡°íšŒëŠ” ì´ê±°ë¡œ ì•ˆí•¨ )
-- JOINìœ¼ë¡œ ë°›ì€ USER_ACC ê°ì²´ë¥¼ ì €ìž¥í•´ì•¼í•˜ê¸° ë•Œë¬¸ì— ì •ê·œí™”ë˜ì§€ ì•Šì€ ì›ë°ì´í„° í‹€ë¡œ ì €ìž¥í›„ ì¡°íšŒí•  ë•ŒëŠ” ì •ê·œí™”ëœ í…Œì´ë¸”ì„ ì´ìš©
CREATE TABLE CLIENT
(
<<<<<<< HEAD
      DUNS_NO           VARCHAR2(100)   PRIMARY KEY     -- DUNS³Ñ¹ö
    , CMP_NM            VARCHAR2(100)   NOT NULL        -- È¸»ç¸í
    , NAT_ID            VARCHAR2(1000)  NOT NULL        -- ±¹°¡ ¾ÆÀÌµð
    , NAT_CD            CHAR(2)         NOT NULL        -- ±¹°¡ ÄÚµå
    , NAT_KOR           VARCHAR2(20)    NOT NULL        -- ±¹°¡¸í (ÇÑ±Û)
    , NAT_ENG           VARCHAR2(20)    NOT NULL        -- ±¹°¡¸í (¿µ¹®)
    , CITY              VARCHAR2(100)   NOT NULL        -- µµ½Ã¸í
    , ADR               VARCHAR2(100)   NOT NULL        -- ÀüÃ¼ ÁÖ¼Ò
    , SIC_CD            VARCHAR2(100)   NOT NULL        -- ÁÖ¿ä Ãë±Þ Ç°¸ñ
    , SALES             NUMBER(20)                      -- ¸ÅÃâ
    , ASSET             NUMBER(20)                      -- ÀÚ»ê
    , EMP               NUMBER(10)                      -- Á¾¾÷¿ø¼ö
    , CONTACT_GRD_CD    VARCHAR2(4)                     -- ¸¶ÄÉÆÃ µî±Þ
    -- NOT NULLÀÌ ¾Æ´Ñ ´ë½Å NICEÀÇ ½Å¿ëÁ¶»ç ¹ÌÀÀ½ÃÇÑ ¸ðµç »ç¿ëÀÚ¿¡°Ô ´Ù¸¥ »ç¿ëÀÚ¿¡°Ô ³ëÃâÀÌ ¾î·Æ´Ù´Â Á¡À» °æ°íÃ¢ »ý¼º
    -- , CREDIT_GRD_CD     VARCHAR2(4)                     -- ½Å¿ë µî±Þ
    , URL               VARCHAR2(200)   NOT NULL        -- È¨ÆäÀÌÁö ÁÖ¼Ò
    , EML               VARCHAR2(100)   NOT NULL        -- ÀÌ¸ÞÀÏ ÁÖ¼Ò
    , ENG               VARCHAR2(2000)  NOT NULL        -- °ü·Ã Å°¿öµå ¸ñ·Ï
=======
      DUNS_NO           VARCHAR2(100)   PRIMARY KEY     -- DUNSë„˜ë²„
    , CMP_NM            VARCHAR2(100)   NOT NULL        -- íšŒì‚¬ëª…
    , NAT_ID            VARCHAR2(1000)  NOT NULL        -- êµ­ê°€ ì•„ì´ë””
    , NAT_CD            CHAR(2)         NOT NULL        -- êµ­ê°€ ì½”ë“œ
    , NAT_KOR           VARCHAR2(20)    NOT NULL        -- êµ­ê°€ëª… (í•œê¸€)
    , NAT_ENG           VARCHAR2(20)    NOT NULL        -- êµ­ê°€ëª… (ì˜ë¬¸)
    , CITY              VARCHAR2(100)   NOT NULL        -- ë„ì‹œëª…
    , ADR               VARCHAR2(100)   NOT NULL        -- ì „ì²´ ì£¼ì†Œ
    , SIC_CD            VARCHAR2(100)   NOT NULL        -- ì£¼ìš” ì·¨ê¸‰ í’ˆëª©
    , SALES             NUMBER(20)                      -- ë§¤ì¶œ
    , ASSET             NUMBER(20)                      -- ìžì‚°
    , EMP               NUMBER(10)                      -- ì¢…ì—…ì›ìˆ˜
    , CONTACT_GRD_CD    VARCHAR2(4)                     -- ë§ˆì¼€íŒ… ë“±ê¸‰
    -- NOT NULLì´ ì•„ë‹Œ ëŒ€ì‹  NICEì˜ ì‹ ìš©ì¡°ì‚¬ ë¯¸ì‘ì‹œí•œ ëª¨ë“  ì‚¬ìš©ìžì—ê²Œ ë‹¤ë¥¸ ì‚¬ìš©ìžì—ê²Œ ë…¸ì¶œì´ ì–´ë µë‹¤ëŠ” ì ì„ ê²½ê³ ì°½ ìƒì„±
    -- , CREDIT_GRD_CD     VARCHAR2(4)                     -- ì‹ ìš© ë“±ê¸‰
    , URL               VARCHAR2(200)   NOT NULL        -- í™ˆíŽ˜ì´ì§€ ì£¼ì†Œ
    , EML               VARCHAR2(100)   NOT NULL        -- ì´ë©”ì¼ ì£¼ì†Œ
    , ENG               VARCHAR2(2000)  NOT NULL        -- ê´€ë ¨ í‚¤ì›Œë“œ ëª©ë¡
>>>>>>> origin/feature-jin
);

-- íšŒì‚¬ ì •ë³´ VIEW ìƒì„±
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


-- êµ­ê°€ VIEW ìƒì„±
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


-- ì£¼ì†Œ í…Œì´ë¸” ìƒì„±
            CREATE VIEW LOC
                AS
                    SELECT  NTN_ID
                            , CITY
                            , ADR
                    FROM CLIENT
                    WITH READ ONLY
                ;
                
<<<<<<< HEAD
-- ±¹°¡ ±âº»Á¤º¸ Å×ÀÌºí »ý¼º
CREATE TABLE STAT_INFO
( 
      STAT_NO       NUMBER          PRIMARY KEY     -- ±¹°¡ ³Ñ¹ö
    , STAT_NTN      VARCHAR2(50)    UNIQUE NOT NULL -- ±¹°¡ ¸í
    , STAT_POP      NUMBER          NOT NULL        -- ±¹°¡ ÀÎ±¸
    , STAT_CPT      VARCHAR2(50)    UNIQUE NOT NULL -- ±¹°¡ ¼öµµ
    , STAT_LAN      VARCHAR2(50)    NOT NULL        -- ±¹°¡ ¾ð¾î
);


-- ±¹°¡ Åë°è Å×ÀÌºí »ý¼º
-- 5³âÄ¡¸¦ ´ãÀ» ¿¹Á¤

-- ÀÌ°Å »ý°¢º¸´Ù Á¹¶ó º¹ÀâÇÏ°Ô ´ã¾Æ¾ßÇÒµí
-- ¼öÃâ¾× ¼öÀÔ¾× ¹«¿ª¼öÁö °æÁ¦¼ºÀå·ü GDP °¢°¢ µû·Î Å×ÀÌºí ¸¸µé°í ¿¬µµ¸¦ ÄÃ·³À¸·Î ¸¸µé¾î¾ß ÇÒ °Å °°´Ù
-- ¼öÃâ¾× Å×ÀÌºí
    CREATE TABLE STAT_EXP
    ( 
          STAT_NO       NUMBER      REFERENCES          -- ±¹°¡ ³Ñ¹ö
                                    STAT_INFO(STAT_NO) 
                                    ON DELETE CASCADE
        , EXP_2019      NUMBER      NOT NULL            -- ¼öÃâ¾×
        , EXP_2020      NUMBER      NOT NULL            -- ¼öÀÔ¾×
        , EXP_2021      NUMBER      NOT NULL            -- ¹«¿ª¼öÁö
        , EXP_2022      NUMBER      NOT NULL            -- °æÁ¦¼ºÀå·ü
        , EXP_2023      NUMBER      NOT NULL            -- 1ÀÎ´ç GDP
    );
    
-- ¼öÀÔ¾× Å×ÀÌºí
    CREATE TABLE STAT_IMP
    ( 
          STAT_NO       NUMBER      REFERENCES          -- ±¹°¡ ³Ñ¹ö
                                    STAT_INFO(STAT_NO) 
                                    ON DELETE CASCADE
        , IMP_2019      NUMBER      NOT NULL            -- ¼öÃâ¾×
        , IMP_2020      NUMBER      NOT NULL            -- ¼öÀÔ¾×
        , IMP_2021      NUMBER      NOT NULL            -- ¹«¿ª¼öÁö
        , IMP_2022      NUMBER      NOT NULL            -- °æÁ¦¼ºÀå·ü
        , IMP_2023      NUMBER      NOT NULL            -- 1ÀÎ´ç GDP
    );
    
-- ¹«¿ª¼öÁö Å×ÀÌºí
    CREATE TABLE STAT_BAL
    ( 
          STAT_NO       NUMBER      REFERENCES          -- ±¹°¡ ³Ñ¹ö
                                    STAT_INFO(STAT_NO) 
                                    ON DELETE CASCADE
        , BAL_2019      NUMBER      NOT NULL            -- ¼öÃâ¾×
        , BAL_2020      NUMBER      NOT NULL            -- ¼öÀÔ¾×
        , BAL_2021      NUMBER      NOT NULL            -- ¹«¿ª¼öÁö
        , BAL_2022      NUMBER      NOT NULL            -- °æÁ¦¼ºÀå·ü
        , BAL_2023      NUMBER      NOT NULL            -- 1ÀÎ´ç GDP
    );
    
-- °æÁ¦¼ºÀå·ü Å×ÀÌºí
    CREATE TABLE STAT_GWT
    ( 
          STAT_NO       NUMBER      REFERENCES          -- ±¹°¡ ³Ñ¹ö
                                    STAT_INFO(STAT_NO) 
                                    ON DELETE CASCADE
        , GWT_2019      NUMBER      NOT NULL            -- ¼öÃâ¾×
        , GWT_2020      NUMBER      NOT NULL            -- ¼öÀÔ¾×
        , GWT_2021      NUMBER      NOT NULL            -- ¹«¿ª¼öÁö
        , GWT_2022      NUMBER      NOT NULL            -- °æÁ¦¼ºÀå·ü
        , GWT_2023      NUMBER      NOT NULL            -- 1ÀÎ´ç GDP
    );
    
-- GDP Å×ÀÌºí
    CREATE TABLE STAT_GDP
    ( 
          STAT_NO       NUMBER      REFERENCES          -- ±¹°¡ ³Ñ¹ö
                                    STAT_INFO(STAT_NO) 
                                    ON DELETE CASCADE
        , GDP_2019      NUMBER      NOT NULL            -- ¼öÃâ¾×
        , GDP_2020      NUMBER      NOT NULL            -- ¼öÀÔ¾×
        , GDP_2021      NUMBER      NOT NULL            -- ¹«¿ª¼öÁö
        , GDP_2022      NUMBER      NOT NULL            -- °æÁ¦¼ºÀå·ü
        , GDP_2023      NUMBER      NOT NULL            -- 1ÀÎ´ç GDP
    );  


-- ±¹°¡ ±ÔÁ¦»çÇ× Å×ÀÌºí »ý¼º

CREATE TABLE STAT_REG
( 
      STAT_NO       NUMBER          REFERENCES      -- ±¹°¡ ³Ñ¹ö
                                    STAT_INFO(STAT_NO) 
                                    ON DELETE CASCADE
    , STAT_REG1     VARCHAR2(500)    NOT NULL        -- ±ÔÁ¦Ç°¸ñ
    , STAT_REG2     VARCHAR2(500)    NOT NULL        -- ±ÔÁ¦ºÐ·ù
    , STAT_REG3     VARCHAR2(500)    NOT NULL        -- ±ÔÁ¦´ë»ó±¹
    , STAT_HS       VARCHAR2(500)    NOT NULL        -- ±ÔÁ¦´ë»ó HS CODE
);


=======
-- êµ­ê°€ ê¸°ë³¸ì •ë³´ í…Œì´ë¸” ìƒì„±
-- ê¸°ë³¸ì •ë³´ì™€ 5ë…„ì¹˜ì˜ ìˆ˜ì¶œì•¡ ìˆ˜ìž…ì•¡ ë¬´ì—­ìˆ˜ì§€ ê²½ì œì„±ìž¥ë¥  GDPë¥¼ í¬í•¨í•˜ëŠ” í•˜ë‚˜ì˜ í…Œì´ë¸”ì„ ë§Œë“¤ê³  ì—°ë„ë¥¼ ì»¬ëŸ¼ìœ¼ë¡œ ë§Œë“¤ì–´ì•¼ í•  ê±° ê°™ë‹¤
CREATE TABLE STAT_ALL_INFO
( 
      STAT_ID       CHAR(2)             PRIMARY KEY         -- êµ­ê°€ ë„˜ë²„
    , STAT_NTN      VARCHAR2(500)       UNIQUE NOT NULL     -- êµ­ê°€ ëª…
    , STAT_POP      VARCHAR2(500)       NOT NULL            -- êµ­ê°€ ì¸êµ¬
    , STAT_CPT      VARCHAR2(500)       UNIQUE NOT NULL     -- êµ­ê°€ ìˆ˜ë„
    , STAT_LAN      VARCHAR2(500)       NOT NULL            -- êµ­ê°€ ì–¸ì–´
    , EXP_2019      NUMBER              NOT NULL            
    , EXP_2020      NUMBER              NOT NULL            
    , EXP_2021      NUMBER              NOT NULL            
    , EXP_2022      NUMBER              NOT NULL            
    , EXP_2023      NUMBER                                  -- ì—¬ê¸°ê¹Œì§€ê°€ ìˆ˜ì¶œì•¡
    , IMP_2019      NUMBER              NOT NULL            
    , IMP_2020      NUMBER              NOT NULL            
    , IMP_2021      NUMBER              NOT NULL            
    , IMP_2022      NUMBER              NOT NULL            
    , IMP_2023      NUMBER                                  -- ì—¬ê¸°ê¹Œì§€ê°€ ìˆ˜ìž…ì•¡
    , BAL_2019      NUMBER              NOT NULL            
    , BAL_2020      NUMBER              NOT NULL            
    , BAL_2021      NUMBER              NOT NULL            
    , BAL_2022      NUMBER              NOT NULL            
    , BAL_2023      NUMBER                                  -- ì—¬ê¸°ê¹Œì§€ê°€ ë¬´ì—­ìˆ˜ì§€
    , GWT_2019      NUMBER              NOT NULL            
    , GWT_2020      NUMBER              NOT NULL            
    , GWT_2021      NUMBER              NOT NULL            
    , GWT_2022      NUMBER              NOT NULL            
    , GWT_2023      NUMBER                                  -- ì—¬ê¸°ê¹Œì§€ê°€ ê²½ì œì„±ìž¥ë¥ 
    , GDP_2019      NUMBER              NOT NULL            
    , GDP_2020      NUMBER              NOT NULL            
    , GDP_2021      NUMBER              NOT NULL            
    , GDP_2022      NUMBER              NOT NULL            
    , GDP_2023      NUMBER                                  -- ì—¬ê¸°ê¹Œì§€ê°€ 1ì¸ë‹¹ GDP
    --ìµœê·¼ ê°’ë“¤ì€ ìˆ˜ì§‘ë˜ì§€ ì•Šì„ ìˆ˜ ìžˆê¸° ë•Œë¬¸ì— NOT NULL ì¡°ê±´ì„ ì‚­ì œí•œë‹¤.
);
>>>>>>> origin/feature-jin





-- êµ­ê°€ ê·œì œì‚¬í•­ í…Œì´ë¸” ìƒì„±

CREATE TABLE STAT_REG
( 
      STAT_ID       CHAR(2)         REFERENCES      -- êµ­ê°€ ë„˜ë²„
                                    STAT_ALL_INFO(STAT_ID) 
                                    ON DELETE CASCADE
    , STAT_REG1     VARCHAR2(500)    NOT NULL        -- ê·œì œí’ˆëª©
    , STAT_REG2     VARCHAR2(500)    NOT NULL        -- ê·œì œë¶„ë¥˜
    , STAT_REG3     VARCHAR2(500)    NOT NULL        -- ê·œì œëŒ€ìƒêµ­
    , STAT_HS       VARCHAR2(3000)                   -- ê·œì œëŒ€ìƒ HS CODE
);



-- í…Œì´ë¸” ì¡°íšŒ

SELECT * FROM STAT_ALL_INFO;

SELECT * FROM STAT_REG;


-- í…Œì´ë¸” ì‚­ì œ
-- ì‚­ì œëŠ” ìƒì„±ì˜ ì—­ìˆœ

DROP TABLE CTGY;

    DROP VIEW MAIN_CTGY;
    
    DROP VIEW SUB_CTGY;
    
    DROP VIEW ITEM;



DROP TABLE CLIENT;

    DROP VIEW CMP;
    
    DROP VIEW NTN;
    
    
DROP TABLE STAT_ALL_INFO;

DROP TABLE STAT_REG;

