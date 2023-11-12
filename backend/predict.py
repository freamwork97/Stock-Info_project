# predict.py
from prophet import Prophet
from db_utils import find_stock_code_by_name
import FinanceDataReader as fdr

def predict_result(stock_name):
    stock_code = find_stock_code_by_name(stock_name)
    if not stock_code:
        return None
    
    # 종목코드를 사용하여 FinanceDataReader로 주식 데이터 가져오기
    stock_data = get_stock_data(stock_code)
    
    # 주식 데이터의 컬럼명을 Prophet 모델에 맞게 변경
    stock_data = stock_data.rename(columns={'Date': 'ds', 'Close': 'y'})
    
    # Prophet 모델 초기화 및 훈련
    model = Prophet()
    model.fit(stock_data)
    
    # 미래 데이터 생성 (예측을 위한 날짜 생성)
    future = model.make_future_dataframe(periods=365)  # 1년(365일) 동안의 예측
    
    # 예측 수행
    forecast = model.predict(future)
    
    # 예측 결과 반환 (마지막 날짜의 예측값)
    predicted_result = forecast['yhat'].iloc[-1]
    
    return predicted_result

def get_stock_data(stock_code: str):
    # FinanceDataReader를 사용하여 주식 데이터 가져오기
    stock_data = fdr.DataReader(stock_code)
    
    # 주식 데이터의 컬럼명을 변경
    stock_data = stock_data.reset_index()
    
    # 주식 데이터의 컬럼명을 Prophet 모델에 맞게 변경
    stock_data = stock_data.rename(columns={'Date': 'ds', 'Close': 'y'})
    
    return stock_data[['ds', 'y']]  # 날짜와 종가만 선택
