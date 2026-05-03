# Stock Info

한국 주식 정보를 한눈에 확인하는 웹 서비스.  
종목 검색 한 번으로 가격 · 차트 · 재무제표 · 뉴스 · 예측까지 제공합니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 백엔드 | Python 3.11 · FastAPI · SQLAlchemy |
| 프론트엔드 | React 18 · TypeScript · Chart.js · ECharts |
| 데이터베이스 | MySQL 8 |
| 인프라 | Docker · Docker Compose · Nginx |
| 데이터 소스 | yfinance · pykrx · Naver 크롤링 · Facebook Prophet |

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 종목 검색 | 종목명/코드 검색, 자동완성 |
| 주가 정보 | 현재가 · 시가 · 고가 · 저가 · 거래량 (20초 자동 갱신) |
| 캔들 차트 | 일봉/주봉/월봉 · 이동평균선(MA5~200) · 기간 필터 |
| 재무제표 | yfinance 기반 4개년 IS/BS · 연도별 추이 바 차트 |
| 관련 뉴스 | 네이버 뉴스 크롤링 (썸네일 포함) |
| 주요 지수 | 코스피 · 코스닥 · 나스닥 · 다우 · S&P500 · 닛케이 |
| 환율 | 네이버 실시간 환율 크롤링 |
| 주가 예측 | Facebook Prophet 시계열 모델 (1년 예측) |
| 게시판 | 비회원 CRUD (비밀번호 기반 수정/삭제) |

---

## 백엔드 구조

```
backend/
├── main.py              # FastAPI 앱 초기화 · 라우터 등록
├── schemas.py           # Pydantic 응답 모델
├── core/
│   ├── db.py            # SQLAlchemy Connection Pool
│   ├── stock_queries.py # 주식 DB 쿼리
│   ├── post_queries.py  # 게시글 DB 쿼리
│   └── financial_queries.py
├── api/
│   ├── stock.py         # /stock · /get_stock_price · /company_names
│   ├── market.py        # /key_index · /exchange_rate
│   ├── news.py          # /news
│   ├── financial.py     # /financial_statements
│   ├── predict.py       # /predict_stock
│   └── post.py          # /post CRUD
├── services/
│   ├── stock_service.py     # yfinance OHLCV · pykrx 실시간 가격
│   ├── predict_service.py   # Prophet 예측
│   └── financial_service.py # yfinance 재무제표
├── news_utils.py        # 네이버 뉴스 크롤러
├── exchange_rate.py     # 환율 크롤러
├── key_index.py         # 주요 지수 조회
└── corp_code.py         # 재무제표 DB 조회 (레거시)
```

---

## 데이터베이스

`daily_price` 테이블은 제거되었습니다. OHLCV 데이터는 yfinance를 통해 실시간 조회합니다.

```sql
-- 종목 코드/이름 조회용
CREATE TABLE company_info (
    code        VARCHAR(20),
    company     VARCHAR(40),
    last_update DATE,
    PRIMARY KEY (code)
);

-- 게시판
CREATE TABLE posts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    author     VARCHAR(255) NOT NULL,
    content    TEXT,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 실행 방법

### 사전 요구사항
- Docker · Docker Compose
- `conf/` 디렉토리 설정 파일 (git에 포함되지 않음)

예시 파일을 복사해 실제 값으로 채워주세요.

```bash
cp conf/config.docker.ini.example conf/config.docker.ini
```

```ini
[database]
host     = mysql          # Docker 환경은 mysql, 로컬은 localhost
user     = your_db_user
password = your_db_password
db_name  = your_db_name

[dart]
# https://opendart.fss.or.kr 에서 발급
api_key  = your_dart_api_key

[naver_API]
# https://developers.naver.com 에서 발급
Client_ID     = your_naver_client_id
Client_Secret = your_naver_client_secret
```

### 실행

```bash
docker compose up -d
```

| 서비스 | 주소 |
|--------|------|
| 프론트엔드 | http://localhost |
| 백엔드 API | http://localhost:8000 |
| API 문서 | http://localhost:8000/docs |

---

## API 주요 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | `/stock/{name}` | 종목 정보 + 400일 OHLCV |
| GET | `/get_stock_price/{name}` | pykrx 실시간 가격 |
| GET | `/company_names/?prefix=` | 종목명 자동완성 |
| GET | `/financial_statements/{name}` | 4개년 재무제표 |
| GET | `/predict_stock/{name}` | Prophet 1년 예측 |
| GET | `/news/{query}` | 네이버 뉴스 (썸네일 포함) |
| GET | `/key_index` | 주요 지수 |
| GET | `/exchange_rate` | 환율 |

---

## 참고 문헌
- 김황후. (2020.07.01). *파이썬 증권 데이터 분석*. 한빛 미디어.
