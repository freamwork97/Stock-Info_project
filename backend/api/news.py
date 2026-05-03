from fastapi import APIRouter
from typing import List

from schemas import NewsItem
from news_utils import get_naver_news

router = APIRouter(tags=["news"])


@router.get("/news/{search_query}", response_model=List[NewsItem])
def read_news(search_query: str):
    return get_naver_news(search_query)
