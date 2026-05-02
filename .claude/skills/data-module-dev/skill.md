---
name: data-module-dev
description: "Stock-Info 프로젝트의 데이터 수집 모듈을 추가하거나 수정할 때 사용. PyKRX 주가 데이터, 네이버 뉴스/환율 크롤러, OpenDART 재무정보, FinanceDataReader 지수 데이터, Prophet 예측 모델 등 backend/의 데이터 모듈 작업 시 이 스킬을 사용할 것. '크롤러 수정', '데이터 소스 추가', '예측 모델', '재무데이터', '환율', '지수' 키워드 시 트리거."
---

# Data Module Dev — 데이터 수집/처리 모듈 개발

Stock-Info 프로젝트의 데이터 수집 및 처리 모듈을 개발/수정하는 스킬.

## 데이터 소스 현황

| 소스 | 파일 | 라이브러리/방법 | 설명 |
|------|------|--------------|------|
| 주가 (KRX) | `backend/stock_price.py` | PyKRX | 종목코드로 10년치 OHLCV |
| 뉴스 | `backend/news_utils.py` | BeautifulSoup + requests | 네이버 검색 크롤링 |
| 환율 | `backend/exchange_rate.py` | BeautifulSoup + requests | 네이버 파이낸스 크롤링 |
| 주요지수 | `backend/key_index.py` | FinanceDataReader | 코스피, 코스닥, 나스닥 등 6개 |
| 재무제표 | `backend/corp_code.py` | OpenDART API + requests | 공시 재무 데이터 |
| 주가예측 | `backend/predict.py` | Prophet | 365일 시계열 예측 |
| DB 저장 | `database/sqlsave*.py` | PyMySQL | MySQL 저장 스크립트 |

## 설정 파일

```ini
# conf/config.ini 구조
[DB]
host = ...
user = ...
password = ...
db = ...

[NAVER]
client_id = ...
client_secret = ...
search_url = ...

[DART]
api_key = ...
url = ...

[CRAWL]
exchange_rate_url = ...
index_url = ...
```

**보안 원칙:** API 키는 절대 로그 출력/코드 하드코딩 금지. 항상 `configparser`로 `conf/config.ini`에서 로드.

## 모듈 개발 절차

### 1. 새 데이터 소스 추가

1. `backend/` 에 새 모듈 파일 생성 (예: `sector_info.py`)
2. 필요한 API 키나 URL은 `conf/config.ini`에 추가
3. 함수 반환값은 `list[dict]` 또는 `pd.DataFrame` 형식으로 통일
4. `backend/main.py`에 FastAPI 엔드포인트 추가 및 모듈 import
5. 에러 처리: 외부 API/크롤링 실패 시 빈 list 반환 (FastAPI가 500을 반환하지 않도록)

### 2. 크롤러 수정

네이버 크롤러 수정 시 확인사항:
- HTML 구조가 변경되었는지 BeautifulSoup selector 검증
- 요청 헤더에 User-Agent 포함 (차단 방지)
- 응답 지연 시 `time.sleep(0.3~1.0)` 딜레이 설정
- 인코딩: `response.encoding = 'utf-8'` 명시

```python
# 크롤러 기본 패턴
import requests
from bs4 import BeautifulSoup
import configparser

config = configparser.ConfigParser()
config.read('conf/config.ini')

headers = {"User-Agent": "Mozilla/5.0 ..."}

def fetch_data(query: str) -> list:
    try:
        url = config['CRAWL']['target_url'] + query
        response = requests.get(url, headers=headers)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')
        # 파싱 로직
        return results
    except Exception as e:
        print(f"크롤링 오류: {e}")
        return []
```

### 3. PyKRX 데이터 확장

```python
# stock_price.py 패턴
from pykrx import stock
import pandas as pd

def get_stock_ohlcv(code: str, period: str = '10y') -> list:
    today = datetime.now().strftime('%Y%m%d')
    # period에 따라 start_date 계산
    df = stock.get_market_ohlcv_by_date(start_date, today, code)
    return df.reset_index().to_dict('records')
```

### 4. OpenDART API 사용

```python
# corp_code.py 패턴
import requests
import configparser

config = configparser.ConfigParser()
config.read('conf/config.ini')
API_KEY = config['DART']['api_key']

def get_financial_statements(corp_code: str, year: str) -> list:
    url = config['DART']['url']
    params = {
        "crtfc_key": API_KEY,
        "corp_code": corp_code,
        "bsns_year": year,
        "reprt_code": "11011"  # 사업보고서
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data.get('list', [])
```

### 5. Prophet 예측 모델 조정

```python
# predict.py 패턴
from prophet import Prophet
import pandas as pd

def predict_stock(df: pd.DataFrame, periods: int = 365) -> list:
    prophet_df = df[['date', 'close']].rename(columns={'date': 'ds', 'close': 'y'})
    model = Prophet(daily_seasonality=True)
    model.fit(prophet_df)
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods).to_dict('records')
```

## 데이터베이스 저장 스크립트 (`database/`)

새 데이터 소스를 DB에 저장할 때:
1. `database/sqlsave*.py` 패턴을 따라 새 스크립트 생성
2. 테이블 스키마는 `db_utils.py`와 일관성 유지
3. 배치 삽입 시 `executemany` 사용 (성능)
4. `config.json`에 수집 범위 설정 추가

## FastAPI 엔드포인트 연결

데이터 모듈 완성 후 `main.py`에 연결:

```python
# main.py 엔드포인트 패턴
from fastapi import FastAPI
from {new_module} import {new_function}

@app.get("/new-endpoint")
async def new_endpoint(param: str):
    data = new_function(param)
    return {"data": data, "status": "ok"}
```

## 주의사항

- PyKRX는 KRX 서버 부하가 있으므로 대량 조회 시 딜레이 필수
- 네이버 크롤링은 이용약관 준수 범위에서만 사용 (개인 학습 목적)
- OpenDART API는 하루 요청 한도가 있으므로 결과를 DB에 캐싱 권장
- Prophet 모델은 학습 시간이 길어 FastAPI에서 비동기 처리 또는 캐싱 고려
