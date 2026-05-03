from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from schemas import (
    StockInfo, StockPriceResponse, PredictResponse,
    NewsItem, ExchangeRateItem,
    PostCreate, PostUpdate, PostResponse,
)
from db_utils import get_stock_info, get_company_names, create_post, get_post, get_post_one, update_post, delete_post
from news_utils import get_naver_news
from exchange_rate import get_exchange_rate
from corp_code import get_financial_statements_by_name
from stock_price import get_stock_price, get_ohlcv
from key_index import get_key_index
from predict import predict_result

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _format_post(post: tuple) -> dict:
    return {
        'id': post[0],
        'title': post[1],
        'author': post[2],
        'content': post[3],
        'created_at': post[5].isoformat(),
    }


# ── 주식 ──────────────────────────────────────────
@app.get("/stock/{stock_name}", response_model=StockInfo)
def read_stock_info(stock_name: str):
    info = get_stock_info(stock_name)
    info['daily_prices'] = get_ohlcv(info['code'])
    return info


@app.get("/get_stock_price/{stock_name}", response_model=StockPriceResponse)
def get_stock_price_endpoint(stock_name: str):
    return get_stock_price(stock_name)


@app.get("/company_names/", response_model=List[str])
def read_company_names(prefix: str):
    return get_company_names(prefix)


# ── 예측 ──────────────────────────────────────────
@app.get("/predict_stock/{stock_name}", response_model=PredictResponse)
def predict_stock(stock_name: str):
    return predict_result(stock_name)


# ── 뉴스 ──────────────────────────────────────────
@app.get("/news/{search_query}", response_model=List[NewsItem])
def read_news(search_query: str):
    return get_naver_news(search_query)


# ── 시장 지표 ─────────────────────────────────────
@app.get("/exchange_rate", response_model=List[ExchangeRateItem])
def read_exchange_rate():
    return get_exchange_rate()


@app.get("/key_index")
def read_key_index():
    return get_key_index()


# ── 재무제표 ──────────────────────────────────────
@app.get("/financial_statements/{stock_name}")
def get_financial_statements(stock_name: str):
    try:
        return get_financial_statements_by_name(stock_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ── 게시글 ────────────────────────────────────────
@app.post("/post/save")
def create_post_handler(post: PostCreate):
    return create_post(post.title, post.author, post.content, post.password)


@app.get("/post", response_model=List[PostResponse])
def get_post_list():
    return [_format_post(p) for p in get_post()]


@app.get("/post/{id}", response_model=List[PostResponse])
def get_post_one_data(id: str):
    return [_format_post(p) for p in get_post_one(id)]


@app.put("/posts/{post_id}")
def update_post_handler(post_id: str, body: PostUpdate):
    update_post(post_id, body.content, body.password)
    return {"message": "게시글이 수정되었습니다."}


@app.delete("/posts/{post_id}")
def delete_post_handler(post_id: int, password: str):
    delete_post(post_id, password)
    return {"message": "게시글이 삭제되었습니다."}
