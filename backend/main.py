######################################################
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from db_utils import get_stock_info,get_company_names,create_post,get_post,get_post_one,update_post,delete_post
from news_utils import get_naver_news
from exchange_rate import get_exchange_rate
from corp_code import get_financial_statements_by_name
from stock_price import get_stock_price
from key_index import get_key_index
#######################################################
app = FastAPI()

# CORS 설정
origins = [
    "http://localhost",
    "http://localhost:3000"  # React 앱의 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StockInfo(BaseModel):
    company: str             # 주식명
    code: str                # 주식코드
    last_update: str         # 마지막 데이터베이스 저장일
    daily_prices: List[dict] # 주가

class NewsItem(BaseModel):
    title: str               # 뉴스 제목
    link: str                # 뉴스 링크

class ExchangeRateItem(BaseModel):
    currency: str            # 통화(달러, 엔화 등등)
    exchange_rate: str       # 환율

class PostCreate(BaseModel):
    title: str    # 제목
    author: str   # 작성자
    content: str  # 내용
    password: str # 비밀번호
# 주식정보
@app.get("/stock/{stock_name}", response_model=StockInfo)
def read_stock_info(stock_name: str):
    return get_stock_info(stock_name)

# 뉴스
@app.get("/news/{search_query}", response_model=List[NewsItem])
def read_news(search_query: str):
    news_info = get_naver_news(search_query)

    if not news_info:
        raise HTTPException(status_code=404, detail="News not found")

    return news_info

# 환율
@app.get("/exchange_rate", response_model=List[ExchangeRateItem])
def read_exchange_rate():
    return get_exchange_rate()

# 재무제표
@app.get("/financial_statements/{stock_name}")
def get_financial_statements(stock_name: str):
    try:
        result = get_financial_statements_by_name(stock_name)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
# 당일가
@app.get("/get_stock_price/{stock_name}")
def get_stock_price_endpoint(stock_name: str):
    return get_stock_price(stock_name)

# 종목명 리스트
@app.get("/company_names/", response_model=List[str])
def read_company_names(prefix: str):
    company_names = get_company_names(prefix)
    return company_names

# 주요 지수
@app.get("/key_index")
def read_key_index():
    data = get_key_index()
    return data

# 게시글 작성
@app.post("/post/save")
def create_post_handler(post: PostCreate):
    return create_post(post.title, post.author, post.content, post.password)

# 게시글 목록
@app.get("/post")
def get_post_list():
    posts = get_post()

    # 데이터를 딕셔너리 형태로 변경
    post_list = []
    for post in posts:
        post_dict = {
            'id': post[0],
            'title': post[1],
            'author': post[2],
            'content': post[3],
            'password': post[4],
            'created_at': post[5].isoformat()  # 날짜 형태를 ISO 포맷으로 변환
        }
        post_list.append(post_dict)

    return post_list

# 게시글 조회
@app.get("/post/{id}")
def get_post_one_data(id: str):
    posts = get_post_one(id)

    # 데이터를 딕셔너리 형태로 변경
    post_list = []
    for post in posts:
        post_dict = {
            'id': post[0],
            'title': post[1],
            'author': post[2],
            'content': post[3],
            'password': post[4],
            'created_at': post[5].isoformat()  # 날짜 형태를 ISO 포맷으로 변환
        }
        post_list.append(post_dict)

    return post_list

@app.put("/posts/{post_id}/{content}/{password}")
def update_post_handler(post_id: str, content: str, password: str):
    update_post(post_id, content, password)
    return {"message": "게시글이 수정되었습니다."}

@app.delete("/posts/{post_id}")
def delete_post_handler(post_id: int, password: str):
    delete_post(post_id, password)
    return {"message": "게시글이 삭제되었습니다."}


