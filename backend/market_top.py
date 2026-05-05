import time
from datetime import datetime, timedelta
import yfinance as yf

# KOSPI 시가총액 상위 종목 (대략적 시가총액 순)
TOP_KOSPI = [
    ("005930", "삼성전자",       "반도체"),
    ("000660", "SK하이닉스",     "반도체"),
    ("373220", "LG에너지솔루션", "이차전지"),
    ("207940", "삼성바이오로직스","바이오"),
    ("005380", "현대차",         "자동차"),
    ("035420", "NAVER",          "IT 서비스"),
    ("006400", "삼성SDI",        "이차전지"),
    ("068270", "셀트리온",       "바이오"),
    ("000270", "기아",           "자동차"),
    ("051910", "LG화학",         "화학"),
    ("005490", "POSCO홀딩스",    "철강"),
    ("028260", "삼성물산",       "건설"),
    ("066570", "LG전자",         "가전"),
    ("035720", "카카오",         "IT 서비스"),
    ("105560", "KB금융",         "금융"),
    ("055550", "신한지주",       "금융"),
    ("012330", "현대모비스",     "자동차"),
    ("086790", "하나금융지주",   "금융"),
    ("003550", "LG",             "지주"),
    ("096770", "SK이노베이션",   "에너지"),
]

_cache: dict = {}
CACHE_TTL = 30 * 60  # 30분


def get_market_top(limit: int = 20) -> list:
    cache_key = f"market_top_{limit}"
    now = time.time()
    if cache_key in _cache:
        cached_data, cached_time = _cache[cache_key]
        if now - cached_time < CACHE_TTL:
            return cached_data

    result = _fetch_market_top(limit)
    _cache[cache_key] = (result, now)
    return result


def _fetch_market_top(limit: int) -> list:
    targets = TOP_KOSPI[:limit]
    end = datetime.now()
    start = end - timedelta(days=60)

    items = []
    for rank, (code, name, sector) in enumerate(targets, start=1):
        try:
            t = yf.Ticker(f"{code}.KS")
            hist = t.history(
                start=start.strftime("%Y-%m-%d"),
                end=end.strftime("%Y-%m-%d"),
            )
            if hist.empty:
                continue

            closes = hist["Close"].tolist()
            volumes = hist["Volume"].tolist()

            close = round(closes[-1])
            prev_close = round(closes[-2]) if len(closes) >= 2 else close
            changes = close - prev_close
            changes_ratio = round((changes / prev_close * 100), 2) if prev_close else 0.0
            volume = int(volumes[-1])

            try:
                market_cap = int(t.fast_info.market_cap or 0)
            except Exception:
                market_cap = 0

            sparkline = [round(v) for v in closes[-30:]]

        except Exception:
            continue

        items.append({
            "rank": rank,
            "ticker": code,
            "name": name,
            "sector": sector,
            "close": close,
            "changes": changes,
            "changes_ratio": changes_ratio,
            "volume": volume,
            "market_cap": market_cap,
            "sparkline": sparkline,
        })

    return items
