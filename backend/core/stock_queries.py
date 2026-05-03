from fastapi import HTTPException
from sqlalchemy import text
from core.db import get_connection


def get_stock_info(stock_name: str) -> dict:
    with get_connection() as conn:
        result = conn.execute(
            text("SELECT company, code, last_update FROM company_info WHERE company = :name"),
            {"name": stock_name},
        ).fetchone()

        if not result:
            result = conn.execute(
                text("SELECT company, code, last_update FROM company_info "
                     "WHERE company LIKE :pattern ORDER BY LENGTH(company) ASC LIMIT 1"),
                {"pattern": f"%{stock_name}%"},
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
            {"name": stock_name},
        ).fetchone()
        return str(row[0]) if row else None


def get_company_names(prefix: str) -> list:
    with get_connection() as conn:
        rows = conn.execute(
            text("SELECT company FROM company_info WHERE company LIKE :p"),
            {"p": f"{prefix}%"},
        ).fetchall()
        return [r[0] for r in rows]
