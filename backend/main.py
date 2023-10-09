######################################################
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from db_utils import get_stock_info,find_stock_code_by_name
from news_utils import get_naver_news
from exchange_rate import get_exchange_rate
from corp_code import get_financial_statements_by_name
from pykrx import stock
from datetime import datetime,timedelta
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
    

@app.get("/get_stock_price/{stock_name}")
def get_stock_price(stock_name: str):
    now = datetime.now()
    end_date = now.strftime("%Y%m%d")
    start_date = (now - timedelta(days=7)).strftime("%Y%m%d")
    stock_code = find_stock_code_by_name(stock_name)

    try:
        stock_price = stock.get_market_ohlcv_by_date(start_date, end_date, stock_code)

        if not stock_price.empty:
            return stock_price["종가"].tolist()
        else:
            return {"error": "주가정보를 찾을 수 없습니다."}
    except Exception as e:
        return {"error": str(e)}





