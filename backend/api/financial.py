from fastapi import APIRouter, HTTPException

from schemas import FinancialData
from services.financial_service import get_financials

router = APIRouter(tags=["financial"])


@router.get("/financial_statements/{stock_name}", response_model=FinancialData)
def get_financial_statements(stock_name: str):
    try:
        return get_financials(stock_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
