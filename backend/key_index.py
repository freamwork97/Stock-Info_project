import FinanceDataReader as fdr
from datetime import datetime, timedelta

def get_key_index():
    now = datetime.now()
    start_date = (now - timedelta(days=14)).strftime("%Y%m%d")
    # 코스피
    kospi = fdr.DataReader('KS11', start_date)
    # 코스닥
    kosdaq = fdr.DataReader('KQ11',start_date)
    # 나스닥
    nasdaq = fdr.DataReader('IXIC',start_date)
    # 다우존스
    dji = fdr.DataReader('DJI',start_date)
    # S&P500
    sp = fdr.DataReader('US500',start_date)
    # 닛케이225
    jp = fdr.DataReader('N225',start_date)

    # 결측치 제거
    kospi.fillna(method = 'ffill') 
    kosdaq.fillna(method = 'ffill') 
    nasdaq.fillna(method = 'ffill') 
    dji.fillna(method = 'ffill') 
    sp.fillna(method = 'ffill') 
    jp.fillna(method = 'ffill') 

    # 날짜 형식 변경
    kospi.index = kospi.index.strftime('%Y-%m-%d')
    kosdaq.index = kosdaq.index.strftime('%Y-%m-%d')
    nasdaq.index = nasdaq.index.strftime('%Y-%m-%d')
    dji.index = dji.index.strftime('%Y-%m-%d')
    sp.index = sp.index.strftime('%Y-%m-%d')
    jp.index = jp.index.strftime('%Y-%m-%d')
    
    result = {
        '코스피': kospi['Close'].to_dict(),
        '코스닥': kosdaq['Close'].to_dict(),
        '나스닥': nasdaq['Close'].to_dict(),
        '다우존스': dji['Close'].to_dict(),
        'S&P500': sp['Close'].to_dict(),
        '닛케이225': jp['Close'].to_dict()
    }

    return result