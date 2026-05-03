from datetime import datetime, timedelta
from pykrx import stock
from db_utils import find_stock_code_by_name

def get_ohlcv(code: str, days: int = 400) -> list:
    import yfinance as yf
    import pandas as pd
    start = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    end = datetime.now().strftime('%Y-%m-%d')
    for suffix in ('KS', 'KQ'):
        ticker = yf.Ticker(f"{code}.{suffix}")
        df = ticker.history(start=start, end=end, auto_adjust=True)
        if df.empty:
            continue
        df.index = df.index.tz_localize(None)
        df = df.reset_index()
        df = df.rename(columns={'Date': 'date', 'Open': 'open', 'High': 'high', 'Low': 'low', 'Close': 'close', 'Volume': 'volume'})
        df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
        df[['open', 'high', 'low', 'close', 'volume']] = df[['open', 'high', 'low', 'close', 'volume']].round(0).astype(int)
        records = df[['date', 'open', 'high', 'low', 'close', 'volume']].to_dict('records')
        return list(reversed(records))  # DESC (최신→과거)
    return []

def get_stock_price(stock_name: str):
    now = datetime.now()
    end_date = now.strftime("%Y%m%d")
    start_date = (now - timedelta(days=3650)).strftime("%Y%m%d")
    stock_code = find_stock_code_by_name(stock_name)

    try:
        stock_price = stock.get_market_ohlcv_by_date(start_date, end_date, stock_code)
        result = {
                "날짜":stock_price.index.strftime("%Y%m%d").tolist(),
                "시가": stock_price["시가"].tolist(),
                "고가": stock_price["고가"].tolist(),
                "저가": stock_price["저가"].tolist(),
                "종가": stock_price["종가"].tolist(),
                "거래량": stock_price["거래량"].tolist()
            }
        if not stock_price.empty:
            return result
        else:
            return {"error": "주가정보를 찾을 수 없습니다."}
    except Exception as e:
        return {"error": str(e)}
