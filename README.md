## 주식 뉴스 및 데이터 정보 제공 사이트

- 사용
    - Python
    - React
    - MySQL
    - FastAPI
    - BootStrap
    
- 데이터수집: Python로 Mysql 데이터 저장
- 뉴스: 네이버 크롤링
- 환율: 네이버 크롤링
- 재무제표: https://opendart.fss.or.kr/intro/main.do 활용
- 디자인: BootStrap활용
- 주가데이터: 네이버 크롤링으로 데이터베이스 저장 및 pykrx 라이브러리 활용
- 주요지수: FinanceDataReader라이브러리 활용
- 게시판: 글 작성 수정 목록 삭제는 데이터베이스를 활용
- 머신러닝: https://facebook.github.io/prophet/docs/quick_start.html 활용

## React package
```
{
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
    "echarts": "^5.4.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.0-beta.1",
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

## conda list
```
# Name                    Version                   Build  Channel
annotated-types           0.6.0                    pypi_0    pypi
anyio                     3.7.1                    pypi_0    pypi
asttokens                 2.1.0              pyhd8ed1ab_0    conda-forge
attrs                     23.1.0                   pypi_0    pypi
backcall                  0.2.0              pyh9f0ad1d_0    conda-forge
backports                 1.0                        py_2    conda-forge
backports.functools_lru_cache 1.6.4              pyhd8ed1ab_0    conda-forge
beautifulsoup4            4.12.2                   pypi_0    pypi
bokeh                     2.4.3              pyhd8ed1ab_3    conda-forge
brotlipy                  0.7.0           py38h294d835_1004    conda-forge
ca-certificates           2022.9.24            h5b45459_0    conda-forge
certifi                   2023.7.22                pypi_0    pypi
cffi                      1.15.1           py38hd8c33c5_0    conda-forge
charset-normalizer        3.3.0                    pypi_0    pypi
click                     8.1.7                    pypi_0    pypi
cloudpickle               2.2.0              pyhd8ed1ab_0    conda-forge
cmdstan                   2.29.2               hc4b6281_2    conda-forge
cmdstanpy                 1.2.0                    pypi_0    pypi
colorama                  0.4.6              pyhd8ed1ab_0    conda-forge
comm                      0.1.4                    pypi_0    pypi
contourpy                 1.1.0                    pypi_0    pypi
convertdate               2.4.0              pyhd8ed1ab_0    conda-forge
cryptography              37.0.4           py38hb7941b4_0    conda-forge
cycler                    0.11.0             pyhd8ed1ab_0    conda-forge
cython                    3.0.4                    pypi_0    pypi
cytoolz                   0.12.0           py38h294d835_0    conda-forge
dask                      2022.6.1           pyhd8ed1ab_0    conda-forge
dask-core                 2022.6.1           pyhd8ed1ab_0    conda-forge
datetime                  5.2                      pypi_0    pypi
debugpy                   1.6.3            py38h885f38d_0    conda-forge
decorator                 5.1.1              pyhd8ed1ab_0    conda-forge
deprecated                1.2.14                   pypi_0    pypi
distributed               2022.6.1           pyhd8ed1ab_0    conda-forge
entrypoints               0.4                pyhd8ed1ab_0    conda-forge
ephem                     4.1.3            py38h294d835_4    conda-forge
exceptiongroup            1.1.3                    pypi_0    pypi
executing                 1.2.0              pyhd8ed1ab_0    conda-forge
fastapi                   0.104.0                  pypi_0    pypi
finance-datareader        0.9.50                   pypi_0    pypi
fonttools                 4.42.1                   pypi_0    pypi
freetype                  2.12.1               h546665d_0    conda-forge
fsspec                    2022.11.0          pyhd8ed1ab_0    conda-forge
h11                       0.14.0                   pypi_0    pypi
heapdict                  1.0.1                      py_0    conda-forge
hijri-converter           2.2.4              pyhd8ed1ab_0    conda-forge
holidays                  0.35                     pypi_0    pypi
idna                      3.4                pyhd8ed1ab_0    conda-forge
importlib-metadata        5.0.0              pyha770c72_1    conda-forge
importlib-resources       6.0.1                    pypi_0    pypi
importlib_resources       5.10.0             pyhd8ed1ab_0    conda-forge
intel-openmp              2022.1.0          h57928b3_3787    conda-forge
ipykernel                 6.17.1             pyh025b116_0    conda-forge
ipython                   8.6.0              pyh08f2357_1    conda-forge
ipywidgets                8.1.0                    pypi_0    pypi
jedi                      0.18.1             pyhd8ed1ab_2    conda-forge
jinja2                    3.1.2              pyhd8ed1ab_1    conda-forge
joblib                    1.3.2                    pypi_0    pypi
jpeg                      9e                   h8ffe710_2    conda-forge
jsonschema                4.17.0             pyhd8ed1ab_0    conda-forge
jupyter_client            7.4.7              pyhd8ed1ab_0    conda-forge
jupyter_core              5.0.0            py38haa244fe_0    conda-forge
jupyterlab-widgets        3.0.8                    pypi_0    pypi
jupyterlab_widgets        3.0.3              pyhd8ed1ab_0    conda-forge
kiwisolver                1.4.4            py38hbd9d945_0    conda-forge
korean_lunar_calendar     0.3.1              pyhd8ed1ab_0    conda-forge
lcms2                     2.12                 h2a16943_0    conda-forge
lerc                      3.0                  h0e60522_0    conda-forge
libblas                   3.9.0              16_win64_mkl    conda-forge
libcblas                  3.9.0              16_win64_mkl    conda-forge
libdeflate                1.12                 h8ffe710_0    conda-forge
liblapack                 3.9.0              16_win64_mkl    conda-forge
libpng                    1.6.37               h1d00b33_4    conda-forge
libsodium                 1.0.18               h8d14728_1    conda-forge
libtiff                   4.4.0                h2ed3b44_1    conda-forge
libwebp-base              1.2.4                h8ffe710_0    conda-forge
libxcb                    1.13              hcd874cb_1004    conda-forge
libzlib                   1.2.12               h8ffe710_2    conda-forge
locket                    1.0.0              pyhd8ed1ab_0    conda-forge
lunarcalendar             0.0.9                      py_0    conda-forge
lxml                      4.9.3                    pypi_0    pypi
lz4                       4.0.0            py38he18b7d8_2    conda-forge
lz4-c                     1.9.3                h8ffe710_1    conda-forge
m2-bash                   4.3.042                       5    conda-forge
m2-coreutils              8.25                        102    conda-forge
m2-filesystem             2016.04                       4    conda-forge
m2-gcc-libs               5.3.0                         4    conda-forge
m2-gmp                    6.1.0                         3    conda-forge
m2-libiconv               1.14                          3    conda-forge
m2-libintl                0.19.7                        4    conda-forge
m2-msys2-runtime          2.5.0.17080.65c939c               3    conda-forge
m2-sed                    4.2.2                         3    conda-forge
m2w64-binutils            2.25.1                        5    conda-forge
m2w64-bzip2               1.0.6                         6    conda-forge
m2w64-crt-git             5.0.0.4636.2595836               2    conda-forge
m2w64-gcc                 5.3.0                         6    conda-forge
m2w64-gcc-ada             5.3.0                         6    conda-forge
m2w64-gcc-fortran         5.3.0                         6    conda-forge
m2w64-gcc-libgfortran     5.3.0                         6    conda-forge
m2w64-gcc-libs            5.3.0                         7    conda-forge
m2w64-gcc-libs-core       5.3.0                         7    conda-forge
m2w64-gcc-objc            5.3.0                         6    conda-forge
m2w64-gmp                 6.1.0                         2    conda-forge
m2w64-headers-git         5.0.0.4636.c0ad18a               2    conda-forge
m2w64-isl                 0.16.1                        2    conda-forge
m2w64-libiconv            1.14                          6    conda-forge
m2w64-libmangle-git       5.0.0.4509.2e5a9a2               2    conda-forge
m2w64-libwinpthread-git   5.0.0.4634.697f757               2    conda-forge
m2w64-make                4.1.2351.a80a8b8               2    conda-forge
m2w64-mpc                 1.0.3                         3    conda-forge
m2w64-mpfr                3.1.4                         4    conda-forge
m2w64-pkg-config          0.29.1                        2    conda-forge
m2w64-toolchain           5.3.0                         7    conda-forge
m2w64-toolchain_win-64    2.4.0                         0    conda-forge
m2w64-tools-git           5.0.0.4592.90b8472               2    conda-forge
m2w64-windows-default-manifest 6.4                           3    conda-forge
m2w64-winpthreads-git     5.0.0.4634.697f757               2    conda-forge
m2w64-zlib                1.2.8                        10    conda-forge
markupsafe                2.1.1            py38h294d835_1    conda-forge
matplotlib                3.7.2                    pypi_0    pypi
matplotlib-base           3.4.3            py38h1f000d6_2    conda-forge
matplotlib-inline         0.1.6              pyhd8ed1ab_0    conda-forge
mkl                       2022.1.0           h6a75c08_874    conda-forge
msgpack-python            1.0.4            py38hbd9d945_0    conda-forge
msys2-conda-epoch         20160418                      1    conda-forge
multipledispatch          1.0.0                    pypi_0    pypi
nbformat                  5.7.0              pyhd8ed1ab_0    conda-forge
nest-asyncio              1.5.6              pyhd8ed1ab_0    conda-forge
numpy                     1.24.4                   pypi_0    pypi
openjpeg                  2.5.0                hc9384bd_1    conda-forge
openssl                   1.1.1q               h8ffe710_0    conda-forge
outcome                   1.2.0                    pypi_0    pypi
packaging                 23.1                     pypi_0    pypi
pandas                    2.0.3                    pypi_0    pypi
parso                     0.8.3              pyhd8ed1ab_0    conda-forge
partd                     1.3.0              pyhd8ed1ab_0    conda-forge
pickleshare               0.7.5                   py_1003    conda-forge
pillow                    10.0.0                   pypi_0    pypi
pip                       23.2.1           py38haa95532_0
pkgutil-resolve-name      1.3.10             pyhd8ed1ab_0    conda-forge
platformdirs              2.5.2              pyhd8ed1ab_1    conda-forge
plotly                    5.17.0                   pypi_0    pypi
prompt-toolkit            3.0.32             pyha770c72_0    conda-forge
prophet                   1.1.5                    pypi_0    pypi
psutil                    5.9.1            py38h294d835_0    conda-forge
pthread-stubs             0.4               hcd874cb_1001    conda-forge
pure_eval                 0.2.2              pyhd8ed1ab_0    conda-forge
pycparser                 2.21               pyhd8ed1ab_0    conda-forge
pydantic                  2.4.2                    pypi_0    pypi
pydantic-core             2.10.1                   pypi_0    pypi
pygments                  2.13.0             pyhd8ed1ab_0    conda-forge
pykrx                     1.0.45                   pypi_0    pypi
pymeeus                   0.5.10             pyhd8ed1ab_0    conda-forge
pymysql                   1.1.0                    pypi_0    pypi
pyopenssl                 22.0.0             pyhd8ed1ab_1    conda-forge
pyparsing                 3.0.9              pyhd8ed1ab_0    conda-forge
pyrsistent                0.18.1           py38h294d835_1    conda-forge
pysocks                   1.7.1              pyh0701188_6    conda-forge
pystan                    2.19.1.1                 pypi_0    pypi
python                    3.8.10               hdbf39b2_7
python-dateutil           2.8.2              pyhd8ed1ab_0    conda-forge
python-fastjsonschema     2.16.2             pyhd8ed1ab_0    conda-forge
python_abi                3.8                      2_cp38    conda-forge
pytz                      2023.3                   pypi_0    pypi
pywin32                   303              py38h294d835_0    conda-forge
pyyaml                    6.0              py38h294d835_4    conda-forge
pyzmq                     23.2.1           py38h09162b1_0    conda-forge
requests                  2.31.0                   pypi_0    pypi
requests-file             1.5.1                    pypi_0    pypi
scikit-learn              1.3.0                    pypi_0    pypi
scipy                     1.10.1                   pypi_0    pypi
selenium                  4.11.2                   pypi_0    pypi
setuptools                68.0.0           py38haa95532_0
setuptools-git            1.2                        py_1    conda-forge
six                       1.16.0             pyh6c4a22f_0    conda-forge
sniffio                   1.3.0                    pypi_0    pypi
sortedcontainers          2.4.0              pyhd8ed1ab_0    conda-forge
soupsieve                 2.5                      pypi_0    pypi
sqlite                    3.41.2               h2bbff1b_0
stack_data                0.6.1              pyhd8ed1ab_0    conda-forge
stanio                    0.3.0                    pypi_0    pypi
starlette                 0.27.0                   pypi_0    pypi
tbb                       2021.5.0             h2d74725_1    conda-forge
tblib                     1.7.0              pyhd8ed1ab_0    conda-forge
tenacity                  8.2.3                    pypi_0    pypi
threadpoolctl             3.2.0                    pypi_0    pypi
tk                        8.6.12               h8ffe710_0    conda-forge
toolz                     0.12.0             pyhd8ed1ab_0    conda-forge
tornado                   6.2              py38h294d835_0    conda-forge
tqdm                      4.66.1                   pypi_0    pypi
traitlets                 5.5.0              pyhd8ed1ab_0    conda-forge
trio                      0.22.2                   pypi_0    pypi
trio-websocket            0.10.3                   pypi_0    pypi
typing-extensions         4.8.0                    pypi_0    pypi
tzdata                    2023.3                   pypi_0    pypi
urllib3                   2.0.4                    pypi_0    pypi
uvicorn                   0.23.2                   pypi_0    pypi
vc                        14.2                 h21ff451_1
vs2015_runtime            14.27.29016          h5e58377_2
wcwidth                   0.2.5              pyh9f0ad1d_2    conda-forge
wheel                     0.38.4           py38haa95532_0
widgetsnbextension        4.0.8                    pypi_0    pypi
win_inet_pton             1.1.0              pyhd8ed1ab_6    conda-forge
wrapt                     1.15.0                   pypi_0    pypi
wsproto                   1.2.0                    pypi_0    pypi
xlrd                      2.0.1                    pypi_0    pypi
xmltodict                 0.13.0                   pypi_0    pypi
xorg-libxau               1.0.9                hcd874cb_0    conda-forge
xorg-libxdmcp             1.1.3                hcd874cb_0    conda-forge
xz                        5.2.6                h8d14728_0    conda-forge
yaml                      0.2.5                h8ffe710_2    conda-forge
zeromq                    4.3.4                h0e60522_1    conda-forge
zict                      2.2.0              pyhd8ed1ab_0    conda-forge
zipp                      3.16.2                   pypi_0    pypi
zope-interface            6.1                      pypi_0    pypi
zstd                      1.5.2                h6255e5f_4    conda-forge
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
- 배치 순서
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