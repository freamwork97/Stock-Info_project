from pydantic import BaseModel
from typing import List, Optional


# ── 주식 ──────────────────────────────────────────
class DailyPrice(BaseModel):
    date: str
    open: int
    high: int
    low: int
    close: int
    volume: Optional[int] = None


class StockInfo(BaseModel):
    company: str
    code: str
    last_update: str
    daily_prices: List[DailyPrice]


class StockPriceResponse(BaseModel):
    날짜: List[str]
    시가: List[int]
    고가: List[int]
    저가: List[int]
    종가: List[int]
    거래량: List[int]


# ── 예측 ──────────────────────────────────────────
class PredictResponse(BaseModel):
    날짜: List[str]
    예측종가: List[float]
    예측고가: List[float]
    예측저가: List[float]


# ── 뉴스 ──────────────────────────────────────────
class NewsItem(BaseModel):
    title: str
    link: str


# ── 환율 ──────────────────────────────────────────
class ExchangeRateItem(BaseModel):
    currency: str
    exchange_rate: str


# ── 게시글 ────────────────────────────────────────
class PostCreate(BaseModel):
    title: str
    author: str
    content: str
    password: str


class PostUpdate(BaseModel):
    content: str
    password: str


class PostResponse(BaseModel):
    id: int
    title: str
    author: str
    content: str
    created_at: str
