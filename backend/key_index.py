import FinanceDataReader as fdr
from datetime import datetime, timedelta

def get_key_index():
    now = datetime.now()
    start_date = (now - timedelta(days=14)).strftime("%Y%m%d")
    
    indexes = ['코스피', '코스닥', '나스닥', '다우존스', 'S&P 500', '닛케이225']
    result = {}
    
    for index in indexes:
        if index == '코스피':
            data = fdr.DataReader('KS11', start_date)
        elif index == '코스닥':
            data = fdr.DataReader('KQ11', start_date)
        elif index == '나스닥':
            data = fdr.DataReader('IXIC', start_date)
        elif index == '다우존스':
            data = fdr.DataReader('DJI', start_date)
        elif index == 'S&P 500':
            data = fdr.DataReader('US500', start_date)
        elif index == '닛케이225':
            data = fdr.DataReader('N225', start_date)

        data = data.fillna(method='ffill')
        data.index = data.index.strftime('%Y-%m-%d')
        result[index] = data['Close'].to_dict()
    
    return result
