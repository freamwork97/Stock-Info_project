from fastapi import HTTPException
from sqlalchemy import text
from core.db import get_connection
import pandas as pd


# ── 주식 정보 ──────────────────────────────────────
def get_stock_info(stock_name: str) -> dict:
    with get_connection() as conn:
        result = conn.execute(
            text("SELECT company, code, last_update FROM company_info WHERE company = :name"),
            {"name": stock_name}
        ).fetchone()

        if not result:
            result = conn.execute(
                text("SELECT company, code, last_update FROM company_info "
                     "WHERE company LIKE :pattern ORDER BY LENGTH(company) ASC LIMIT 1"),
                {"pattern": f"%{stock_name}%"}
            ).fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Stock not found")

        company, code, last_update = result
        return {
            "company": company,
            "code": code,
            "last_update": last_update.strftime("%Y-%m-%d"),
        }


def find_stock_code_by_name(stock_name: str):
    with get_connection() as conn:
        row = conn.execute(
            text("SELECT code FROM company_info WHERE company = :name"),
            {"name": stock_name}
        ).fetchone()
        return str(row[0]) if row else None


def get_company_names(prefix: str) -> list:
    with get_connection() as conn:
        rows = conn.execute(
            text("SELECT company FROM company_info WHERE company LIKE :p"),
            {"p": f"{prefix}%"}
        ).fetchall()
        return [r[0] for r in rows]


# ── 재무제표 ──────────────────────────────────────
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
        '사업연도', '종목코드', '보고서코드', '연결_개별구분', '재무제표구분', '계정명',
        '당기명', '당기일자', '당기금액', '당기누적금액', '전기명', '전기일자', '전기금액',
        '전기누적금액', '전전기명', '전전기일자', '전전기금액', '통화',
    ]
    return pd.DataFrame(rows, columns=columns)


# ── 게시글 ────────────────────────────────────────
def create_post(title: str, author: str, content: str, password: str):
    with get_connection() as conn:
        conn.execute(
            text("INSERT INTO posts (title, author, content, password) VALUES (:t, :a, :c, :p)"),
            {"t": title, "a": author, "c": content, "p": password}
        )
        conn.commit()


def get_post() -> list:
    with get_connection() as conn:
        return conn.execute(text("SELECT * FROM posts ORDER BY id DESC")).fetchall()


def get_post_one(id) -> list:
    with get_connection() as conn:
        return conn.execute(
            text("SELECT * FROM posts WHERE id = :id"), {"id": id}
        ).fetchall()


def update_post(id, content: str, password: str):
    with get_connection() as conn:
        row = conn.execute(
            text("SELECT id FROM posts WHERE id = :id AND password = :pw"),
            {"id": id, "pw": password}
        ).fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다.")
        conn.execute(
            text("UPDATE posts SET content = :c WHERE id = :id"),
            {"c": content, "id": id}
        )
        conn.commit()


def delete_post(id, password: str):
    with get_connection() as conn:
        row = conn.execute(
            text("SELECT id FROM posts WHERE id = :id AND password = :pw"),
            {"id": id, "pw": password}
        ).fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다.")
        conn.execute(text("DELETE FROM posts WHERE id = :id"), {"id": id})
        conn.commit()
