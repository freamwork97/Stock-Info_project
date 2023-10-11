import FinanceDataReader as fdr
from datetime import datetime, timedelta

def get_key_index():
    now = datetime.now()
    start_date = (now - timedelta(days=7)).strftime("%Y%m%d")
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
    # 닐케이225
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
        'kospi': kospi['Close'].to_dict(),
        'kosdaq': kosdaq['Close'].to_dict(),
        'nasdaq': nasdaq['Close'].to_dict(),
        'dji': dji['Close'].to_dict(),
        'sp': sp['Close'].to_dict(),
        'jp': jp['Close'].to_dict()
    }

    return result