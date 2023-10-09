import pandas as pd
import configparser
import pymysql

config = configparser.ConfigParser()
config.read('../conf/config.ini')

# 데이터베이스 연결 정보 가져오기
database_info = config['database']
host = database_info['host']
user = database_info['user']
password = database_info['password']
db_name = database_info['db_name']

def load_financial_statements():
    conn = pymysql.connect(
        host=host,
        user=user,
        password=password,
        db=db_name,
        charset='utf8'
    )
    try:
        with conn.cursor() as curs:
            sql = """
                SELECT bsns_year, LPAD(stock_code, 6, '0'), reprt_code, fs_div, sj_div, account_nm, 
                    thstrm_nm, thstrm_dt, thstrm_amount, thstrm_add_amount, frmtrm_nm, 
                    frmtrm_dt, frmtrm_amount, frmtrm_add_amount, bfefrmtrm_nm, bfefrmtrm_dt, 
                    brefrmtrm_amount, currency 
                FROM financial_statements
            """
            curs.execute(sql)
            data = curs.fetchall()
            columns = [
                '사업연도', '종목코드', '보고서코드', '연결_개별구분', '재무제표구분', '계정명', 
                '당기명', '당기일자', '당기금액', '당기누적금액', '전기명', '전기일자', '전기금액', 
                '전기누적금액', '전전기명', '전전기일자', '전전기금액', '통화'
            ]
            df = pd.DataFrame(data, columns=columns)
            return df
    finally:
        conn.close()

def find_stock_code_by_name(stock_name: str):
    conn = pymysql.connect(
        host=host,
        user=user,
        password=password,
        db=db_name,
        charset='utf8'
    )
    try:
        with conn.cursor() as curs:
            sql = """
                SELECT code
                FROM company_info
                WHERE company = %s
            """
            curs.execute(sql, (stock_name,))
            stock_code = curs.fetchone()
            if stock_code is not None:
                return str(stock_code[0])
            else:
                return None
    finally:
        conn.close()



def get_financial_statements_by_name(stock_name: str):
    financial_statements_df = load_financial_statements()
    stock_code = find_stock_code_by_name(stock_name)
    print(stock_code)
    if stock_code is None:
        raise ValueError("종목코드를 찾을 수 없습니다.")
    
    result = financial_statements_df[financial_statements_df['종목코드'] == stock_code]
    
    if result.empty:
        raise ValueError("재무제표를 찾을 수 없습니다.")
    
    result = result[['종목코드', '사업연도', '재무제표구분', '계정명', '당기명', '당기일자', '당기금액', '통화']]
    
    return result.to_dict(orient='records')
