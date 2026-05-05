from fastapi import HTTPException
from sqlalchemy import text
from core.db import get_connection


def get_stock_info(stock_name: str) -> dict:
    with get_connection() as conn:
        # 1. 정확한 이름 검색
        result = conn.execute(
            text("SELECT company, code, last_update FROM company_info WHERE company = :name"),
            {"name": stock_name},
        ).fetchone()

        # 2. 이름 LIKE 검색
        if not result:
            result = conn.execute(
                text("SELECT company, code, last_update FROM company_info "
                     "WHERE company LIKE :pattern ORDER BY LENGTH(company) ASC LIMIT 1"),
                {"pattern": f"%{stock_name}%"},
            ).fetchone()

        # 3. 종목코드 검색 (예: "005930")
        if not result:
            result = conn.execute(
                text("SELECT company, code, last_update FROM company_info WHERE code = :code"),
                {"code": stock_name},
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
        # 이름으로 검색
        row = conn.execute(
            text("SELECT code FROM company_info WHERE company = :name"),
            {"name": stock_name},
        ).fetchone()
        if row:
            return str(row[0])
        # 코드로 직접 검색 (입력값이 이미 코드인 경우)
        row = conn.execute(
            text("SELECT code FROM company_info WHERE code = :code"),
            {"code": stock_name},
        ).fetchone()
        return str(row[0]) if row else None


def get_company_names(prefix: str) -> list:
    with get_connection() as conn:
        rows = conn.execute(
            text("SELECT company FROM company_info "
                 "WHERE company LIKE :p OR code LIKE :cp "
                 "ORDER BY company LIMIT 20"),
            {"p": f"{prefix}%", "cp": f"{prefix}%"},
        ).fetchall()
        return [r[0] for r in rows]
