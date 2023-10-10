from datetime import datetime, timedelta
from pykrx import stock
from db_utils import find_stock_code_by_name

def get_stock_price(stock_name: str):
    now = datetime.now()
    end_date = now.strftime("%Y%m%d")
    start_date = (now - timedelta(days=7)).strftime("%Y%m%d")
    stock_code = find_stock_code_by_name(stock_name)

    try:
        stock_price = stock.get_market_ohlcv_by_date(start_date, end_date, stock_code)
        result = {
                "시가": stock_price["시가"].tolist(),
                "고가": stock_price["고가"].tolist(),
                "저가": stock_price["저가"].tolist(),
                "종가": stock_price["종가"].tolist()
            }
        if not stock_price.empty:
            return result
        # if not stock_price.empty:
        #     return stock_price["종가"].tolist()
        else:
            return {"error": "주가정보를 찾을 수 없습니다."}
    except Exception as e:
        return {"error": str(e)}
