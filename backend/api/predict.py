from fastapi import APIRouter

from schemas import PredictResponse
from predict import predict_result

router = APIRouter(tags=["predict"])


@router.get("/predict_stock/{stock_name}", response_model=PredictResponse)
def predict_stock(stock_name: str):
    return predict_result(stock_name)
