from datetime import datetime, timedelta
from pykrx import stock as krx
from db_utils import find_stock_code_by_name


def get_stock_price(stock_name: str) -> dict:
    """pykrx로 최근 10년 OHLCV 조회 (SearchResultPage 실시간 가격용)"""
    now = datetime.now()
    stock_code = find_stock_code_by_name(stock_name)
    if not stock_code:
        return {"error": "종목 코드를 찾을 수 없습니다."}

    try:
        df = krx.get_market_ohlcv_by_date(
            (now - timedelta(days=3650)).strftime("%Y%m%d"),
            now.strftime("%Y%m%d"),
            stock_code,
        )
        if df.empty:
            return {"error": "주가정보를 찾을 수 없습니다."}
        return {
            "날짜": df.index.strftime("%Y%m%d").tolist(),
            "시가": df["시가"].tolist(),
            "고가": df["고가"].tolist(),
            "저가": df["저가"].tolist(),
            "종가": df["종가"].tolist(),
            "거래량": df["거래량"].tolist(),
        }
    except Exception as e:
        return {"error": str(e)}


def get_ohlcv(code: str, days: int = 400) -> list:
    """yfinance로 OHLCV 조회, DESC(최신→과거) 반환 (차트용)"""
    import yfinance as yf
    import pandas as pd

    start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
    end = datetime.now().strftime("%Y-%m-%d")

    for suffix in ("KS", "KQ"):
        df = yf.Ticker(f"{code}.{suffix}").history(start=start, end=end, auto_adjust=True)
        if df.empty:
            continue
        df.index = df.index.tz_localize(None)
        df = df.reset_index().rename(columns={
            "Date": "date", "Open": "open", "High": "high",
            "Low": "low", "Close": "close", "Volume": "volume",
        })
        df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
        df[["open", "high", "low", "close", "volume"]] = (
            df[["open", "high", "low", "close", "volume"]].round(0).astype(int)
        )
        return list(reversed(df[["date", "open", "high", "low", "close", "volume"]].to_dict("records")))

    return []
