from fastapi import APIRouter
from typing import List

from schemas import ExchangeRateItem
from exchange_rate import get_exchange_rate
from key_index import get_key_index

router = APIRouter(tags=["market"])


@router.get("/exchange_rate", response_model=List[ExchangeRateItem])
def read_exchange_rate():
    return get_exchange_rate()


@router.get("/key_index")
def read_key_index():
    return get_key_index()
