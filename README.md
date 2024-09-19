# 주식 뉴스 및 데이터 정보 제공 사이트

## 프로젝트 목적
- 주식에 필요한 정보를 한눈에 확인하는 것

### 스킬

#### 백엔드
- Python(FastAPI)
- MySQL

#### 프론트엔드
- React
- BootStrap

---

### 프로젝트 개요  

원하는 종목의 주식을 검색시 주식의 가격, 차트, 재무제표 및 뉴스를 제공

|항목      | 설명                                                                               |
|----------|-----------------------------------------------------------------------------------|
|데이터수집| Python으로 MySQL 데이터 저장                                                       |
|뉴스      | 네이버 크롤링                                                                      |
|환율      | 네이버 크롤링                                                                      |
|재무제표  | [OpenDART](https://opendart.fss.or.kr/intro/main.do) 활용                          |
|디자인    | BootStrap 활용                                                                     |
|주가데이터| 네이버 크롤링으로 데이터베이스 수집 및 저장, pykrx 라이브러리 활용                    |
|주요지수  | FinanceDataReader 라이브러리 활용                                                   |
|게시판    | 글 작성, 수정, 목록, 삭제는 데이터베이스 활용                                        |
|머신러닝  | [Facebook Prophet](https://facebook.github.io/prophet/docs/quick_start.html) 활용  |

---

## 데이터베이스 구성

```sql
CREATE TABLE IF NOT EXISTS company_info (
    code VARCHAR(20),
    company VARCHAR(40),
    last_update DATE,
    PRIMARY KEY (code))
```

```sql
CREATE TABLE IF NOT EXISTS daily_price (
    code VARCHAR(20),
    date DATE,
    open BIGINT(20),
    high BIGINT(20),
    low BIGINT(20),
    close BIGINT(20),
    diff BIGINT(20),
    volume BIGINT(20),
    PRIMARY KEY (code, date))
```

```sql
CREATE TABLE IF NOT EXISTS financial_statements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bsns_year VARCHAR(255),
    stock_code VARCHAR(255),
    reprt_code VARCHAR(255),
    fs_div VARCHAR(255),
    sj_div VARCHAR(255),
    account_nm VARCHAR(255),
    thstrm_nm VARCHAR(255),
    thstrm_dt VARCHAR(255),
    thstrm_amount VARCHAR(255),
    thstrm_add_amount VARCHAR(255),
    frmtrm_nm VARCHAR(255),
    frmtrm_dt VARCHAR(255),
    frmtrm_amount VARCHAR(255),
    frmtrm_add_amount VARCHAR(255),
    bfefrmtrm_nm VARCHAR(255),
    bfefrmtrm_dt VARCHAR(255),
    brefrmtrm_amount VARCHAR(255),
    currency VARCHAR(255))
```

```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    content TEXT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    author VARCHAR(255) NOT NULL,
    content TEXT,
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id)
)
```
## 메인페이지
- 메인페이지는 심플하게
- 검색창
- 검색버튼
- 회원을 우측 상단에서 확인(회원기능 고민중)
- 배치 순서
    - 회원 구현을 하면(우측상단에 배치)(고민중)
    - 검색창옆에 검색버튼
    - 환율 + 주요지수 

## 검색결과
- 검색창
- 검색버튼
- 새로 검색하면 그 것에 맞게 다시 화면 출력
- 배치순서
    - 좌측 상단 검색창 옆에 검색버튼
    - 좌측 뉴스 제목, 간략한내용(검색창 아래에 배치)
    - 우측 주식정보 + 차트
    - 재무제표 하단 배치
    - 주식정보는 검색시점 현재가 + 전일종가 확인
    - 차트(Line)
    - 차트는 종가와 날짜 기준(전일 데이터)
    
## 차트 클릭
- 차트 상세페이지
- 차트 캔들 사용 상승(red) 하락(blue)
- 클릭 시점 현재가 + 전일가를 이용한 차트
- 일봉, 주봉, 월봉 구현(주봉, 월봉은 고민중)
- 보조지표(차트와 같이 볼 지표는 설정가능하도록)
  - 이평선제작 

## 게시판
- 게시판 페이지
- 비회원으로 진행
- 글 작성시 작성자와 비밀번호 입력
- 비밀번호는 글 수정 및 삭제할 때 사용
- 다른유저들이 확인 가능(서로 내용 공유)
- 댓글기능(고민중)

## 히트맵(고민중)
- 당일 거래량 기준 히트맵
- 검색할 때마다 다르게 만들듯(거래량은 계속 달라진다.)

## ProPhet 예측모델
- 시계열 데이터 예측 모델로 사용
- 주가 예측에 사용해볼 예정(제대로 만들 수 있을 지 의문)
- 재미삼아서 추가해보는 페이지

---

## 결과

1. 사용자들이 간편하게 종목을 검색해 주식의 가격, 차트, 재무제표, 관련 뉴스 등을 한눈에 확인 가능.

2. MySQL 데이터베이스를 기반으로 네이버 크롤링, pykrx 라이브러리, OpenDART 등을 주식 데이터와 금융 정보를 제공하며, 게시판 기능을 통해 사용자 간의 정보 공유도 가능.