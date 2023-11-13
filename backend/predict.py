from prophet import Prophet
import FinanceDataReader as fdr
from stock_price import get_stock_price
from datetime import datetime
import pandas as pd

def predict_result(stock_name):
    # 주가 정보 가져오기
    stock_prices = get_stock_price(stock_name)
    
    if "error" in stock_prices:
        return {"error": stock_prices["error"]}
    
    # Prophet에 사용할 데이터 준비
    df = {
        "ds": [datetime.strptime(date, "%Y%m%d") for date in stock_prices["날짜"]],
        "y": stock_prices["종가"]
    }

    # Prophet 모델 생성 및 피팅
    model = Prophet()
    model.fit(pd.DataFrame(df))

    # 퓨처 데이터프레임 생성
    future = model.make_future_dataframe(periods=365)  # 예측할 날짜 수
    
    # 예측
    forecast = model.predict(future)

    # 예측 결과 추출
    result = {
        "날짜": forecast["ds"].dt.strftime("%Y%m%d").tolist(),
        "예측종가": forecast["yhat"].tolist(),
        "예측고가": forecast["yhat_upper"].tolist(),
        "예측저가": forecast["yhat_lower"].tolist(),
    }

    return result
