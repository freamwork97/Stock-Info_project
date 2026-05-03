import pandas as pd
from sqlalchemy import text
from core.db import get_connection


def load_financial_statements() -> pd.DataFrame:
    with get_connection() as conn:
        rows = conn.execute(text("""
            SELECT bsns_year, LPAD(stock_code, 6, '0'), reprt_code, fs_div, sj_div, account_nm,
                thstrm_nm, thstrm_dt, thstrm_amount, thstrm_add_amount, frmtrm_nm,
                frmtrm_dt, frmtrm_amount, frmtrm_add_amount, bfefrmtrm_nm, bfefrmtrm_dt,
                brefrmtrm_amount, currency
            FROM financial_statements
        """)).fetchall()
    columns = [
        "사업연도", "종목코드", "보고서코드", "연결_개별구분", "재무제표구분", "계정명",
        "당기명", "당기일자", "당기금액", "당기누적금액", "전기명", "전기일자", "전기금액",
        "전기누적금액", "전전기명", "전전기일자", "전전기금액", "통화",
    ]
    return pd.DataFrame(rows, columns=columns)
