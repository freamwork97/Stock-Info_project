from fastapi import APIRouter, HTTPException

from corp_code import get_financial_statements_by_name

router = APIRouter(tags=["financial"])


@router.get("/financial_statements/{stock_name}")
def get_financial_statements(stock_name: str):
    try:
        return get_financial_statements_by_name(stock_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
