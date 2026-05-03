from fastapi import APIRouter
from typing import List

from schemas import StockInfo, StockPriceResponse
from db_utils import get_stock_info, get_company_names
from services.stock_service import get_stock_price, get_ohlcv

router = APIRouter(tags=["stock"])


@router.get("/stock/{stock_name}", response_model=StockInfo)
def read_stock_info(stock_name: str):
    info = get_stock_info(stock_name)
    info["daily_prices"] = get_ohlcv(info["code"])
    return info


@router.get("/get_stock_price/{stock_name}", response_model=StockPriceResponse)
def get_stock_price_endpoint(stock_name: str):
    return get_stock_price(stock_name)


@router.get("/company_names/", response_model=List[str])
def read_company_names(prefix: str):
    return get_company_names(prefix)
