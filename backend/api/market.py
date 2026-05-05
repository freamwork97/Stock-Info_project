from fastapi import APIRouter
from typing import List

from schemas import ExchangeRateItem
from exchange_rate import get_exchange_rate
from key_index import get_key_index
from market_top import get_market_top

router = APIRouter(tags=["market"])


@router.get("/exchange_rate", response_model=List[ExchangeRateItem])
def read_exchange_rate():
    return get_exchange_rate()


@router.get("/key_index")
def read_key_index():
    return get_key_index()


@router.get("/market_top")
def read_market_top(limit: int = 20):
    return get_market_top(limit)
