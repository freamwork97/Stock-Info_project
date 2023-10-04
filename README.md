## 주식 뉴스 및 데이터 정보 제공 사이트

- 사용
    - Python
    - React
    - MySQL
    - FastAPI
    - BootStrap
    
- 데이터수집은 Python로 Mysql 데이터 저장
- 가능하면 머신러닝도 활용하고싶다.(고민중)
- 주가데이터는 네이버 크롤링 or 증권사API 활용 (고민중)
- 뉴스는 네이버에서 크롤링
- 재무재표 확인(고민중)
- 환율(고민중인데 아마 할듯) 크롤링으로
- 주요지수 크롤링으로 할듯
- 디자인은 BootStrap활용

## React package
```{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.5.1",
    "bootstrap": "^5.3.2",
    "chart.js": "^4.4.0",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4",
    "proxy": "http://localhost:8000"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

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

## 메인페이지
- 메인페이지는 심플하게
- 검색창
- 검색버튼
- 회원을 우측 상단에서 확인
- 뉴스 + 주요지수 or 주요지수(둘중 택1 고민중)
- 배치 순서
    - 회원 구현을 하면(우측상단에 배치)
    - 검색창옆에 검색버튼
    - 검색창 아래 뉴스 + 주요지수 or 주요지수

## 검색결과
- 검색창
- 검색버튼
- 새로 검색하면 그 것에 맞게 다시 화면 출력
- 배치순서
    - 좌측 상단 검색창 옆에 검색버튼
    - 좌측 뉴스 제목, 간략한내용(검색창 아래에 배치)
    - 우측 주식정보 + 차트 + 재무재표(고민중)
    - 주식정보는 검색시점 현재가 + 전일가 확인
    - 차트(Line) 캔들사용할지 고민중
    - 차트는 종가와 날짜 기준(전일 데이터)
    
## 뉴스 클릭
- 뉴스 상세페이지
- 검색창
- 검색버튼
- 배치순서
    - 좌측 상단 검색창 옆에 검색버튼
    - 뉴스 좌측 상세내용(검색창 아래에 배치)
    - 뉴스 스크랩(회원기능을 넣게되면 예정)
    - 우측 주식정보 + 차트 + 재무재표(고민중)
    - 주식정보는 검색시점 현재가 + 전일가 확인
    - 차트(Line) 캔들사용할지 고민중
    - 차트는 종가와 날짜 기준(전일 데이터)
    
## 차트 클릭
- 차트 상세페이지
- 차트 캔들 사용 상승(red) 하락(blue)
- 날짜 와 종가 기준
- 클릭 시점현재가 + 전일가를 이용한 차트
- 일봉, 주봉, 월봉 구현
- 보조지표(차트와 같이 볼 지표는 설정가능하도록)

## 투자레포트
- 개인투자레포트 페이지
- 회원제?
- 비회원제?
- 비회원으로 하면 작성자, 비밀번호를 따로 입력받아야한다.
- 회원으로 하면 작성자, 비밀번호 따로 입력X, 로그인데이터 활용
- 다른유저들이 확인 가능(서로 내용 공유)

## 스크랩(고민중)
- 스크랩 페이지
- 뉴스 스크랩
- 스크랩을 사용할거면 회원으로 가는게 맞다.

## 히트맵(고민중)
- 당일 거래량 기준 히트맵
- 검색할 때마다 다르게 만들듯(거래량은 계속 달라진다.)

## 머신러닝(?)사용한다면?
- 주식 추천에 사용할듯?
- 제일 어려운 부분일것이다.
- 이전 데이터와 주요지수 및 지표들을 데이터로 삼아야한다.
- 아마 미구현 가능성이 높다.