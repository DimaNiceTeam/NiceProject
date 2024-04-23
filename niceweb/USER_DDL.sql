<<<<<<< HEAD
-- ì¹ íŒì— ì ì–´ë†“ì€ sql í…Œì´ë¸” ì¡°ì§€ê¸°

/*

ì´ íŒŒì¼ì— ìƒì„±ë˜ì–´ìžˆëŠ” í…Œì´ë¸”

- ê³„ì • í…Œì´ë¸” (USER_ACC)
    - ë°”ì´ì–´ ì¦ê²¨ì°¾ê¸° (FAVORITE)
    - ë³´ë‚¸ ë©”ì¼í•¨ (SENDED_EMLAIL)
    - ìµœê·¼ ê²€ìƒ‰ì–´ (SEARCH_LOG)
=======
-- Ä¥ÆÇ¿¡ Àû¾î³õÀº sql Å×ÀÌºí Á¶Áö±â

/*

ÀÌ ÆÄÀÏ¿¡ »ý¼ºµÇ¾îÀÖ´Â Å×ÀÌºí

- °èÁ¤ Å×ÀÌºí (USER_ACC)
    - ¹ÙÀÌ¾î Áñ°ÜÃ£±â (FAVORITE)
    - º¸³½ ¸ÞÀÏÇÔ (SENDED_EMLAIL)
    - ÃÖ±Ù °Ë»ö¾î (SEARCH_LOG)
>>>>>>> origin/feature-jin

*/


<<<<<<< HEAD
-- [ ê³„ì • í…Œì´ë¸” ] ìƒì„±
=======
-- [ °èÁ¤ Å×ÀÌºí ] »ý¼º
>>>>>>> origin/feature-jin

CREATE TABLE USER_ACC
(
      USER_NUM      NUMBER          CONSTRAINT USER_SEQ PRIMARY KEY
<<<<<<< HEAD
    , USER_ID       VARCHAR2(20)    UNIQUE NOT NULL             -- ì‚¬ìš©ìž ì•„ì´ë””
    , USER_PWD      VARCHAR2(100)   NOT NULL                    -- ì‚¬ìš©ìž ë¹„ë°€ë²ˆí˜¸
    , USER_DUNS_NO  VARCHAR2(9)     NOT NULL                    -- ì‚¬ìš©ìž íšŒì‚¬ ë˜ìŠ¤ ë²ˆí˜¸
    , USER_CMP_ENG  VARCHAR2(100)   NOT NULL                    -- ì‚¬ìš©ìž íšŒì‚¬ëª…(ì˜ë¬¸)
    , USER_CMP_KOR  VARCHAR2(100)                               -- ì‚¬ìš©ìž íšŒì‚¬ëª…(í•œê¸€)
    , USER_NTN      CHAR(2)         NOT NULL                    -- ì‚¬ìš©ìž êµ­ê°€ ì½”ë“œ
    , USER_CEO_ENG  VARCHAR2(50)    NOT NULL                    -- ì‚¬ìš©ìž ëŒ€í‘œìžëª…(ì˜ë¬¸)
    , USER_CEO_KOR  VARCHAR2(50)                                -- ì‚¬ìš©ìž ëŒ€í‘œìžëª…(í•œê¸€)
    , USER_EML      VARCHAR2(100)   NOT NULL                    -- ì‚¬ìš©ìž ì´ë©”ì¼ (ë‹´ë‹¹ìž)
    , USER_PUB_EML  VARCHAR2(100)   NOT NULL                    -- ì‚¬ìš©ìž ì´ë©”ì¼ (íšŒì‚¬ ê³µìš©)
    , USER_SIC_CD   VARCHAR2(100)   NOT NULL                    -- ì‚¬ìš©ìž ì·¨ê¸‰ í’ˆëª©
    , USER_URL      VARCHAR2(200)   NOT NULL                    -- ì‚¬ìš©ìž íšŒì‚¬ URL
    , USER_ADR      VARCHAR2(200)   NOT NULL                    -- ì‚¬ìš©ìž ì£¼ì†Œ (ì˜ë¬¸)
    , USER_NAME     VARCHAR2(30)    NOT NULL                    -- ì‚¬ìš©ìž ì´ë¦„(ë‹´ë‹¹ìž)
    , USER_PHONE    VARCHAR2(30)    NOT NULL                    -- ì‚¬ìš©ìž ì „í™”ë²ˆí˜¸(ë‹´ë‹¹ìž)
--    , USER_BUSINESS VARCHAR2(200)   CHECK (USER_BUSINESS IN   -- ì‚¬ìš©ìž ì—…ì¢…
--                                    ('IMPORTER', 'EXPORTER', 'MANUFACTURER', 'DISTRIBUTOR')) 
--                                    NOT NULL    -- ì—…ì¢…ë„ ìš°ë¦¬ê°€ ìƒê°í–ˆë˜ ê²ƒê³¼ ë‹¬ë¼ì„œ CHECK OPTIONë„ ìˆ˜ì •í•´ì•¼í•¨    
    , USER_KEYWORD  VARCHAR2(500)                               -- ì‚¬ìš©ìž ê´€ì‹¬ í‚¤ì›Œë“œ
    , USER_ROLE     VARCHAR2(20)    DEFAULT 'ROLE_USER'         -- ì‚¬ìš©ìž ê°€ìž… êµ¬ë¶„
                                    CHECK (USER_ROLE IN
                                    ('ROLE_USER','ROLE_ADMIN'))
                                    NOT NULL
    -- ë§¤ì¶œ (SALES)
    -- ìžì‚° (ASSET)
    -- ì¢…ì—…ì›ìˆ˜ (EMPLOYEES)
    -- ì£¼ìš” ì·¨ê¸‰ í’ˆëª© (SIC_CD) (ì˜ë¬¸)
    -- ë°”ì´ì–´ë“±ê¸‰ / ë§ˆì¼€íŒ… ë“±ê¸‰ < ì´ê±´ D&Bì˜ DBì—ì„œ ë°›ì•„ì•¼í•¨
    -- ì„¤ë¦½ì¼ì€ ì—†ì–´ì„œ ì œì™¸
    -- ì•„ì§ ì •ê·œí™” ì•ˆí•¨ -- ì§„ëª…(24.04.12)
);

-- user_idë¥¼ fkë¡œ ë°›ëŠ” ë³´ë‚¸ [ ë©”ì¼í•¨ í…Œì´ë¸” ] ìƒì„±
-- ìž‘ì„±ìžì™€ ë¡œê·¸ì¸ì‚¬ìš©ìžê°€ ê°™ì€ í–‰ë§Œ ì¶œë ¥
CREATE TABLE SENDED_EML
(
      USER_NUM          NUMBER          REFERENCES              -- ì‚¬ìš©ìž ì•„ì´ë”” = ë³´ë‚¸ ì‚¬ëžŒ
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , RECEIVER          VARCHAR2(50)    NOT NULL                -- ë©”ì¼ì„ ë°›ëŠ” ì‚¬ëžŒ
    , EML_CONTENT       VARCHAR2(3000)  NOT NULL                -- ë³´ë‚¸ ë‚´ìš©
    --, REPLY_FILE
    , SENDED_DATE       DATE            NOT NULL
    -- ì²¨ë¶€íŒŒì¼ ì–´ì©Œì§€
);


-- ë°”ì´ì–´ ì°œê¸°ëŠ¥ í…Œì´ë¸” ìƒì„±
-- ë°”ì´ì–´ ì„ íƒì‹œì— ë³„í‘œë¥¼ ëˆ„ë¥´ë©´ ì´ìª½ì— ì €ìž¥ë˜ê²Œë”
-- ê·¸ë¦¬ê³  USER_ACC í…Œì´ë¸”ê³¼ IDê°’ì„ ê³µìœ í•˜ì—¬ ì°œí•œ ê³„ì •ê³¼ ë¡œê·¸ì¸ê³„ì •ì´ ë™ì¼í•œ ê²½ìš°ì—ë§Œ ì¶œë ¥
=======
    , USER_ID       VARCHAR2(20)    UNIQUE NOT NULL             -- »ç¿ëÀÚ ¾ÆÀÌµð
    , USER_PWD      VARCHAR2(100)   NOT NULL                    -- »ç¿ëÀÚ ºñ¹Ð¹øÈ£
    , USER_DUNS_NO  VARCHAR2(9)     NOT NULL                    -- »ç¿ëÀÚ È¸»ç ´ø½º ¹øÈ£
    , USER_CMP_ENG  VARCHAR2(100)   NOT NULL                    -- »ç¿ëÀÚ È¸»ç¸í(¿µ¹®)
    , USER_CMP_KOR  VARCHAR2(100)                               -- »ç¿ëÀÚ È¸»ç¸í(ÇÑ±Û)
    , USER_NTN      CHAR(2)         NOT NULL                    -- »ç¿ëÀÚ ±¹°¡ ÄÚµå
    , USER_CEO_ENG  VARCHAR2(50)    NOT NULL                    -- »ç¿ëÀÚ ´ëÇ¥ÀÚ¸í(¿µ¹®)
    , USER_CEO_KOR  VARCHAR2(50)                                -- »ç¿ëÀÚ ´ëÇ¥ÀÚ¸í(ÇÑ±Û)
    , USER_EML      VARCHAR2(100)   NOT NULL                    -- »ç¿ëÀÚ ÀÌ¸ÞÀÏ (´ã´çÀÚ)
    , USER_PUB_EML  VARCHAR2(100)   NOT NULL                    -- »ç¿ëÀÚ ÀÌ¸ÞÀÏ (È¸»ç °ø¿ë)
    , USER_SIC_CD   VARCHAR2(100)   NOT NULL                    -- »ç¿ëÀÚ Ãë±Þ Ç°¸ñ
    , USER_URL      VARCHAR2(200)   NOT NULL                    -- »ç¿ëÀÚ È¸»ç URL
    , USER_ADR      VARCHAR2(200)   NOT NULL                    -- »ç¿ëÀÚ ÁÖ¼Ò (¿µ¹®)
    , USER_NAME     VARCHAR2(30)    NOT NULL                    -- »ç¿ëÀÚ ÀÌ¸§(´ã´çÀÚ)
    , USER_PHONE    VARCHAR2(30)    NOT NULL                    -- »ç¿ëÀÚ ÀüÈ­¹øÈ£(´ã´çÀÚ)
--    , USER_BUSINESS VARCHAR2(200)   CHECK (USER_BUSINESS IN   -- »ç¿ëÀÚ ¾÷Á¾
--                                    ('IMPORTER', 'EXPORTER', 'MANUFACTURER', 'DISTRIBUTOR')) 
--                                    NOT NULL    -- ¾÷Á¾µµ ¿ì¸®°¡ »ý°¢Çß´ø °Í°ú ´Þ¶ó¼­ CHECK OPTIONµµ ¼öÁ¤ÇØ¾ßÇÔ    
    , USER_KEYWORD  VARCHAR2(500)                               -- »ç¿ëÀÚ °ü½É Å°¿öµå
    , USER_ROLE     VARCHAR2(20)    DEFAULT 'ROLE_USER'         -- »ç¿ëÀÚ °¡ÀÔ ±¸ºÐ
                                    CHECK (USER_ROLE IN
                                    ('ROLE_USER','ROLE_ADMIN'))
                                    NOT NULL
    -- ¸ÅÃâ (SALES)
    -- ÀÚ»ê (ASSET)
    -- Á¾¾÷¿ø¼ö (EMPLOYEES)
    -- ÁÖ¿ä Ãë±Þ Ç°¸ñ (SIC_CD) (¿µ¹®)
    -- ¹ÙÀÌ¾îµî±Þ / ¸¶ÄÉÆÃ µî±Þ < ÀÌ°Ç D&BÀÇ DB¿¡¼­ ¹Þ¾Æ¾ßÇÔ
    -- ¼³¸³ÀÏÀº ¾ø¾î¼­ Á¦¿Ü
    -- ¾ÆÁ÷ Á¤±ÔÈ­ ¾ÈÇÔ -- Áø¸í(24.04.12)
);

-- user_id¸¦ fk·Î ¹Þ´Â º¸³½ [ ¸ÞÀÏÇÔ Å×ÀÌºí ] »ý¼º
-- ÀÛ¼ºÀÚ¿Í ·Î±×ÀÎ»ç¿ëÀÚ°¡ °°Àº Çà¸¸ Ãâ·Â
CREATE TABLE SENDED_EML
(
      USER_NUM          NUMBER          REFERENCES              -- »ç¿ëÀÚ ¾ÆÀÌµð = º¸³½ »ç¶÷
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
    , RECEIVER          VARCHAR2(50)    NOT NULL                -- ¸ÞÀÏÀ» ¹Þ´Â »ç¶÷
    , EML_CONTENT       VARCHAR2(3000)  NOT NULL                -- º¸³½ ³»¿ë
    --, REPLY_FILE
    , SENDED_DATE       DATE            NOT NULL
    -- Ã·ºÎÆÄÀÏ ¾îÂ¼Áö
);


-- ¹ÙÀÌ¾î Âò±â´É Å×ÀÌºí »ý¼º
-- ¹ÙÀÌ¾î ¼±ÅÃ½Ã¿¡ º°Ç¥¸¦ ´©¸£¸é ÀÌÂÊ¿¡ ÀúÀåµÇ°Ô²û
-- ±×¸®°í USER_ACC Å×ÀÌºí°ú ID°ªÀ» °øÀ¯ÇÏ¿© ÂòÇÑ °èÁ¤°ú ·Î±×ÀÎ°èÁ¤ÀÌ µ¿ÀÏÇÑ °æ¿ì¿¡¸¸ Ãâ·Â
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
    -- ê¸°íƒ€ ì–‘ì‹ ê¸°ì–µ
);

-- ì‚¬ìš©ìžë³„ ìµœê·¼ ê²€ìƒ‰ì–´ë¥¼ ì €ìž¥í•  í…Œì´ë¸” ìƒì„±
-- prependë¥¼ ì‚¬ìš©í•˜ì—¬ ê°€ìž¥ ìµœê·¼ì— ê²€ìƒ‰í•œ ê²€ìƒ‰ì–´ë¥¼ ê°€ìž¥ ì•žì— ë…¸ì¶œë˜ê²Œë” ìƒì„±
=======
    -- ±âÅ¸ ¾ç½Ä ±â¾ï
);

-- »ç¿ëÀÚº° ÃÖ±Ù °Ë»ö¾î¸¦ ÀúÀåÇÒ Å×ÀÌºí »ý¼º
-- prepend¸¦ »ç¿ëÇÏ¿© °¡Àå ÃÖ±Ù¿¡ °Ë»öÇÑ °Ë»ö¾î¸¦ °¡Àå ¾Õ¿¡ ³ëÃâµÇ°Ô²û »ý¼º
>>>>>>> origin/feature-jin
CREATE TABLE SEARCH_LOG
(
      USER_NUM           NUMBER         REFERENCES
                                        USER_ACC(USER_NUM)
                                        ON DELETE CASCADE
<<<<<<< HEAD
    , USER_LOG          VARCHAR2(50)                        -- ì‚¬ìš©ìž ê²€ìƒ‰ ì •ë³´
);

-- ì—¬ìœ ê°€ ëœë‹¤ë©´
-- ìž„ì‹œ ë³´ê´€í•¨ << ê°€ìž¥ í›„ìˆœìœ„


-- ì‹œí€€ìŠ¤ ìƒì„±
CREATE SEQUENCE USER_ACC_SEQ;


-- í…Œì´ë¸” ì‚­ì œ
=======
    , USER_LOG          VARCHAR2(50)                        -- »ç¿ëÀÚ °Ë»ö Á¤º¸
);

-- ¿©À¯°¡ µÈ´Ù¸é
-- ÀÓ½Ã º¸°üÇÔ << °¡Àå ÈÄ¼øÀ§


-- ½ÃÄö½º »ý¼º
CREATE SEQUENCE USER_ACC_SEQ;


-- Å×ÀÌºí »èÁ¦
>>>>>>> origin/feature-jin


DROP TABLE USER_ACC;

    DROP TABLE SENDED_EML;
    
    DROP TABLE FAVORITE;
    
<<<<<<< HEAD
    DROP TABLE SEARCH_LOG;
=======
    DROP TABLE SEARCH_LOG;
>>>>>>> origin/feature-jin
