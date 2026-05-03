from core.financial_queries import load_financial_statements
from core.stock_queries import find_stock_code_by_name


def _to_억원(value) -> int | None:
    try:
        return round(int(str(value).replace(',', '')) / 100_000_000)
    except (ValueError, TypeError):
        return None


def get_financial_statements_by_name(stock_name: str):
    financial_statements_df = load_financial_statements()
    stock_code = find_stock_code_by_name(stock_name)

    if stock_code is None:
        raise ValueError("종목코드를 찾을 수 없습니다.")

    result = financial_statements_df[financial_statements_df['종목코드'] == stock_code].copy()

    if result.empty:
        raise ValueError("재무제표를 찾을 수 없습니다.")

    columns = ['사업연도', '재무제표구분', '계정명', '당기명', '당기금액']
    result = result[columns]
    result['당기금액'] = result['당기금액'].apply(_to_억원)

    return result.to_dict(orient='records')