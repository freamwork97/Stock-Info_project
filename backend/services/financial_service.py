import pandas as pd
import yfinance as yf
from core.stock_queries import find_stock_code_by_name

# 추출할 손익계산서 항목 (영문 → 한국어)
IS_MAP = {
    'Total Revenue':    '매출액',
    'Gross Profit':     '매출총이익',
    'Operating Income': '영업이익',
    'Net Income':       '당기순이익',
    'EBITDA':           'EBITDA',
}

# 추출할 재무상태표 항목 (영문 → 한국어)
BS_MAP = {
    'Total Assets':                           '자산총계',
    'Current Assets':                         '유동자산',
    'Total Liabilities Net Minority Interest': '부채총계',
    'Current Liabilities':                    '유동부채',
    'Stockholders Equity':                    '자본총계',
}


def _extract(df: pd.DataFrame, mapping: dict, years: list) -> dict:
    """DataFrame에서 mapping 항목을 연도별 억원 단위로 추출"""
    result = {}
    year_cols = {col.strftime('%Y'): col for col in df.columns}
    for en, ko in mapping.items():
        if en not in df.index:
            continue
        row = df.loc[en]
        result[ko] = [
            round(row[year_cols[y]] / 1e8) if y in year_cols and pd.notna(row[year_cols[y]]) else None
            for y in years
        ]
    return result


def get_financials(stock_name: str) -> dict:
    code = find_stock_code_by_name(stock_name)
    if not code:
        raise ValueError("종목코드를 찾을 수 없습니다.")

    ticker = None
    for suffix in ('KS', 'KQ'):
        t = yf.Ticker(f"{code}.{suffix}")
        if not t.financials.empty:
            ticker = t
            break

    if ticker is None:
        raise ValueError("재무 데이터를 찾을 수 없습니다.")

    # 연도 목록 — ASC(오래된 순) 정렬 (차트 좌→우)
    raw_years = sorted({col.strftime('%Y') for col in ticker.financials.columns})

    income  = _extract(ticker.financials,    IS_MAP, raw_years)
    balance = _extract(ticker.balance_sheet, BS_MAP, raw_years)

    return {"years": raw_years, "income": income, "balance": balance}
