from datetime import datetime, timedelta
from threading import Lock

import pandas as pd
import yfinance as yf
from prophet import Prophet

from core.stock_queries import get_stock_info

CACHE_TTL_HOURS = 6

_cache: dict[str, tuple[dict, datetime]] = {}
_cache_lock = Lock()

# 한국 주식시장 공휴일 (Prophet이 거래 없는 날 패턴 학습하지 않도록)
_KR_HOLIDAYS = pd.DataFrame({
    "holiday": "kr_holiday",
    "ds": pd.to_datetime([
        # 고정 공휴일
        "2020-01-01", "2020-03-01", "2020-05-05", "2020-06-06", "2020-08-15",
        "2020-10-03", "2020-10-09", "2020-12-25",
        "2021-01-01", "2021-03-01", "2021-05-05", "2021-06-06", "2021-08-15",
        "2021-10-03", "2021-10-09", "2021-12-25",
        "2022-01-01", "2022-03-01", "2022-05-05", "2022-06-06", "2022-08-15",
        "2022-10-03", "2022-10-09", "2022-12-25",
        "2023-01-01", "2023-03-01", "2023-05-05", "2023-06-06", "2023-08-15",
        "2023-10-03", "2023-10-09", "2023-12-25",
        "2024-01-01", "2024-03-01", "2024-05-05", "2024-06-06", "2024-08-15",
        "2024-10-03", "2024-10-09", "2024-12-25",
        "2025-01-01", "2025-03-01", "2025-05-05", "2025-06-06", "2025-08-15",
        "2025-10-03", "2025-10-09", "2025-12-25",
        "2026-01-01", "2026-03-01", "2026-05-05", "2026-06-06", "2026-08-15",
        "2026-10-03", "2026-10-09", "2026-12-25",
        # 설날 연휴
        "2020-01-24", "2020-01-25", "2020-01-26", "2020-01-27",
        "2021-02-11", "2021-02-12", "2021-02-13",
        "2022-01-31", "2022-02-01", "2022-02-02",
        "2023-01-21", "2023-01-22", "2023-01-23", "2023-01-24",
        "2024-02-09", "2024-02-10", "2024-02-11", "2024-02-12",
        "2025-01-28", "2025-01-29", "2025-01-30",
        "2026-02-17", "2026-02-18", "2026-02-19",
        # 추석 연휴
        "2020-09-30", "2020-10-01", "2020-10-02",
        "2021-09-20", "2021-09-21", "2021-09-22",
        "2022-09-09", "2022-09-10", "2022-09-11", "2022-09-12",
        "2023-09-28", "2023-09-29", "2023-09-30",
        "2024-09-16", "2024-09-17", "2024-09-18",
        "2025-10-05", "2025-10-06", "2025-10-07", "2025-10-08",
        # 어린이날 대체공휴일 등
        "2022-06-01", "2023-05-29", "2024-04-10",
    ]),
    "lower_window": 0,
    "upper_window": 1,
})


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


def _run_prophet(df: pd.DataFrame) -> dict:
    model = Prophet(
        seasonality_mode="multiplicative",
        changepoint_prior_scale=0.15,
        seasonality_prior_scale=10.0,
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False,
        holidays=_KR_HOLIDAYS,
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


def predict_result(stock_name: str) -> dict:
    info = get_stock_info(stock_name)
    code = info["code"]

    with _cache_lock:
        cached = _cache.get(code)
        if cached:
            result, cached_at = cached
            if datetime.now() - cached_at < timedelta(hours=CACHE_TTL_HOURS):
                return result
        # 만료된 캐시 제거
        _cache.pop(code, None)

    df = _fetch_ohlcv_for_predict(code)
    if df.empty:
        return {"error": "주가 데이터를 가져올 수 없습니다."}

    result = _run_prophet(df)

    with _cache_lock:
        _cache[code] = (result, datetime.now())

    return result
