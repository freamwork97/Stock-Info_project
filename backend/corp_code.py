import pandas as pd

def load_financial_statements():
    return pd.read_csv('../financial_statements/corp_code4.csv')

def find_stock_code_by_name(stock_name: str):
    corp_code3 = pd.read_csv('../financial_statements/corp_code3.csv', encoding='utf-8')
    stock_code = corp_code3[corp_code3['기업명'] == stock_name]['종목코드'].values
    return str(stock_code[0]).zfill(6) if len(stock_code) > 0 else None


def get_financial_statements_by_name(stock_name: str):
    financial_statements_df = load_financial_statements()
    stock_code = find_stock_code_by_name(stock_name)
    
    if stock_code is None:
        raise ValueError("종목코드를 찾을 수 없습니다.")
    
    result = financial_statements_df[financial_statements_df['종목코드'] == int(stock_code)]
    
    if result.empty:
        raise ValueError("재무제표를 찾을 수 없습니다.")
    
    result = result[['종목코드', '사업연도', '재무제표구분', '계정명', '당기명', '당기일자', '당기금액', '통화']]
    
    return result.to_dict(orient='records')
