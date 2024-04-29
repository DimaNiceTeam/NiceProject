from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from starlette.responses import JSONResponse
import pickle
import numpy as np 
import pandas as pd 


# 입력값 전처리와 코사인 유사도
from nltk import word_tokenize
from nltk import sent_tokenize
from nltk import pos_tag
import nltk
import re
from nltk import WordNetLemmatizer
from konlpy.tag import Mecab
from sklearn.metrics.pairwise import cosine_similarity

wlem = nltk.WordNetLemmatizer()
tokenizer = Mecab().morphs
app = FastAPI()

class InputKeyword(BaseModel):
    inputKeyword: str
    nation: str

def to_string(text): # 리스트에서 문자열로 다 바꿔주기 
    text = str(text)
    text=text.replace("'","")
    text=text.replace("[","")
    text=text.replace("]","") 
    return text

def calculate_similarity(input_vector, df_vectors): # 코사인 유사도 구하기 
    similarity = cosine_similarity(input_vector, df_vectors)
    return similarity[0]

# 본문 시작!!
@app.post(path="/predict", status_code=201)
def inputKeyword(item: InputKeyword):
    print("하이루")
    print(item)
    #inputKeyword = inputKeyword.inputKeyword
    
    # 피클 파일 모두 불러오기
    #inputKeyword= "oil"
    with open("dense_matrix.pickle", 'rb') as pickle_file:
        dense_matrix = pickle.load(pickle_file)
    with open("dataframe.pickle", 'rb') as pickle_file:
        df = pickle.load(pickle_file)
    with open("re_cv_e.pickle", 'rb') as pickle_file:
        re_cv_e = pickle.load(pickle_file)

    # 사용자 입력값 
    inputKeyword = item.inputKeyword.lower()
    print("#############")
    print(inputKeyword)
    nation = item.nation # 국가

    #input_keyword = input_keyword.lower() # 소문자로 바꾸는 작업 

    # 불용어 제거 및 단어만 추출 
    stopwords = nltk.corpus.stopwords.words('english') # 영어 불용어 
    all_tokens = []
    
    word_tokens = word_tokenize(inputKeyword) # 단어로 토큰화 -> 리스트로 반환
    print(word_tokens)
    for word in word_tokens:
        if len(word) != 1: # 글자수 1이상만 출력 
            if word not in stopwords: # 불용어를 포함하지 않는다면 그대로 추가하기
                all_tokens.append(word)
    
    #stopword 제거
    english_return = []
    tagged_sentence = pos_tag(all_tokens) # 명사로 바꿔주려고

    for i in range(len(tagged_sentence)):
        if tagged_sentence[i][1].startswith('N'): # 명사형
            new_word = wlem.lemmatize(tagged_sentence[i][0])   #명사의 원형으로 바꿔서 넣어주기    
            english_return.append(new_word)
        else: #명사가 아니어도 추가 되도록함 
            english_return.append(tagged_sentence[i][0])
            
    inputKeyword = english_return
    print(inputKeyword)
    
    count = 0
    search_keyword = []
    
    for word in inputKeyword:
        if word in re_cv_e.get_feature_names_out(): # 입력한 키워드가 없다면 품목리스트에 없을 경우 대비 
            search_keyword.append(word)
            count +=1
        else:
            continue
    if count == 0: # 입력한 키워드가 품목리스트에 하나도 없음  
        #print('입력하신 키워드는 품목리스트에 없습니다. 다시 입력해주세요')
        return -1
        
    else: # 입력한 키워드가 품목리스트에 있다면 
        #print(f'"{str(search_keyword)[2:-2]}" 취급하는 회사 url에 대한 검색')
        #print('\n')
        input_keyword = to_string(inputKeyword) # 문자열로 바꿔주는 작업
        print(input_keyword)
        buyer = pd.DataFrame([input_keyword], columns=['order'])
        buyer1 = re_cv_e.transform(buyer['order'])
        dense = pd.DataFrame(buyer1.toarray(), columns=re_cv_e.get_feature_names_out())
        columns_index =  dense_matrix.index

        ## 코사인 유사도 구함 
        similarity  = calculate_similarity(dense,dense_matrix) #사용자 입력과 각 url별과 코사인 유사도 구하기
        df_similarity = pd.DataFrame({'url': columns_index, 'similarity': similarity})
        
        top_15 = df_similarity.sort_values(by='similarity', ascending=False).head(15)
        if top_15.iloc[0]['similarity'] == 0.0:
            print(f'검색하신 키워드를 취급하는 회사는 존재하지 않습니다.')
            return None
        index_list = []
        for i in range(len(top_15)):  
            url = top_15.iloc[i]['url']
            index_list.append(df[df['URL'] == url].index[0]) #인덱스 값만 가지고 옴 
        
        last_answer = df.iloc[index_list]
        
        index_name = []
        for num in range(len(last_answer)):
            index_name.append(num)
        last_answer.index= index_name
        last_answer = last_answer[['DUNS_NO', 'CMP_NM', 'NAT_CD', 'NAT_ID', 'CITY', 'ADR', 'URL', 'EML', 'CONTACT_GRD_CD']]
        #result  = pd.DataFrame(columns=['DUNS_NO', 'CMP_NM', 'NAT_CD', 'NAT_ID', 'CITY', 'ADR', 'URL', 'EML', 'CONTACT_GRD_CD'])

        # 사용자가 모든 국가에 대해서 선택했을 경우
        if (nation =="all"):
           
            last_answer = last_answer.to_dict(orient="records")
            return JSONResponse(last_answer)
            
        # 사용자가 국가를 선택했을 경우 nation!
        else:
            index = []
            for i in range(len(last_answer)):
                if last_answer.iloc[i]['NAT_CD'] == nation: # 사용자가 입력한 국가만 출력되도록함 
                    index.append(i)
            if len(index)==0: # 값이 없을 경우
                return None
            last_answer = last_answer.iloc[index]
            last_answer = last_answer.to_dict(orient="records")
            
            return JSONResponse(last_answer)
        
        
        
        
        # last_answer = last_answer.to_dict(orient="records")
        
        # return JSONResponse(last_answer)
    



if __name__ == '__main__' :
    uvicorn.run(app,host="127.0.0.1",port=8000)
