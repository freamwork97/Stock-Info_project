import yfinance as yf
from datetime import datetime, timedelta

INDEX_TICKERS = {
    '코스피':    '^KS11',
    '코스닥':    '^KQ11',
    '나스닥':    '^IXIC',
    '다우존스':  '^DJI',
    'S&P 500':  '^GSPC',
    '닛케이225': '^N225',
}

def get_key_index():
    start = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
    result = {}

    for name, ticker in INDEX_TICKERS.items():
        try:
            data = yf.Ticker(ticker).history(start=start, auto_adjust=True)
            if data.empty:
                continue
            if data.index.tzinfo is not None:
                data.index = data.index.tz_localize(None)
            data.index = data.index.strftime('%Y-%m-%d')
            result[name] = data['Close'].dropna().to_dict()
        except Exception:
            continue

    return result
