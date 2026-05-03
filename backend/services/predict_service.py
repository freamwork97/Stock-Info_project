from datetime import datetime, timedelta

import pandas as pd
import yfinance as yf
from prophet import Prophet

from core.stock_queries import get_stock_info


def _fetch_ohlcv_for_predict(code: str, years: int = 5) -> pd.DataFrame:
    """yfinance로 예측용 OHLCV 조회 (종가만 사용, ASC 순서)"""
    start = (datetime.now() - timedelta(days=years * 365)).strftime("%Y-%m-%d")
    end = datetime.now().strftime("%Y-%m-%d")

    for suffix in ("KS", "KQ"):
        df = yf.Ticker(f"{code}.{suffix}").history(start=start, end=end, auto_adjust=True)
        if not df.empty:
            df.index = df.index.tz_localize(None)
            df = df.reset_index()[["Date", "Close"]]
            df.columns = ["ds", "y"]
            df["ds"] = pd.to_datetime(df["ds"])
            return df.sort_values("ds").reset_index(drop=True)

    return pd.DataFrame()


def predict_result(stock_name: str) -> dict:
    info = get_stock_info(stock_name)
    code = info["code"]

    df = _fetch_ohlcv_for_predict(code)
    if df.empty:
        return {"error": "주가 데이터를 가져올 수 없습니다."}

    model = Prophet(
        seasonality_mode="multiplicative",  # 주가 변동폭은 가격에 비례
        changepoint_prior_scale=0.15,       # 기본값(0.05)보다 트렌드 전환에 민감하게
        seasonality_prior_scale=10.0,
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False,
    )
    model.fit(df)

    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    return {
        "날짜": forecast["ds"].dt.strftime("%Y%m%d").tolist(),
        "예측종가": forecast["yhat"].tolist(),
        "예측고가": forecast["yhat_upper"].tolist(),
        "예측저가": forecast["yhat_lower"].tolist(),
    }
