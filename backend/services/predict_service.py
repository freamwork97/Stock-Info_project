from datetime import datetime

import pandas as pd
from prophet import Prophet

from services.stock_service import get_stock_price


def predict_result(stock_name: str) -> dict:
    prices = get_stock_price(stock_name)
    if "error" in prices:
        return {"error": prices["error"]}

    df = pd.DataFrame({
        "ds": [datetime.strptime(d, "%Y%m%d") for d in prices["날짜"]],
        "y": prices["종가"],
    })

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    return {
        "날짜": forecast["ds"].dt.strftime("%Y%m%d").tolist(),
        "예측종가": forecast["yhat"].tolist(),
        "예측고가": forecast["yhat_upper"].tolist(),
        "예측저가": forecast["yhat_lower"].tolist(),
    }
