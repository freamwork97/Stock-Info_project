from db_utils import load_financial_statements, find_stock_code_by_name

def get_financial_statements_by_name(stock_name: str):
    financial_statements_df = load_financial_statements()
    stock_code = find_stock_code_by_name(stock_name)

    if stock_code is None:
        raise ValueError("종목코드를 찾을 수 없습니다.")
    
    result = financial_statements_df[financial_statements_df['종목코드'] == stock_code]
    
    if result.empty:
        raise ValueError("재무제표를 찾을 수 없습니다.")
    
    columns = ['종목코드', '사업연도', '재무제표구분', '계정명', '당기명', '당기일자', '당기금액', '통화']
    result = result[columns]
    
    return result.to_dict(orient='records')