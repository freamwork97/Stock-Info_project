import pymysql
import configparser
from fastapi import HTTPException
import pandas as pd

config = configparser.ConfigParser()
config.read('../conf/config.ini')

# 데이터베이스 연결 정보 가져오기
database_info = config['database']
host = database_info['host']
user = database_info['user']
password = database_info['password']
db_name = database_info['db_name']

def get_connection():
    return pymysql.connect(
        host=host,
        user=user,
        password=password,
        db=db_name,
        charset='utf8'
    )

def get_stock_info(stock_name):
    conn = get_connection()
    try:
        with conn.cursor() as curs:
            sql = f"""
                SELECT company, code, last_update
                FROM company_info
                WHERE company LIKE %s
            """
            curs.execute(sql, (f'%{stock_name}%',))
            result = curs.fetchone()

            if not result:
                raise HTTPException(status_code=404, detail="Stock not found")

            company, code, last_update = result

            sql = f"""
                SELECT date, open, high, low, close
                FROM daily_price
                WHERE code = %s 
                ORDER BY date DESC
            """
            curs.execute(sql, code)
            daily_prices = [{'date': date, 
                             'open': open, 
                             'high': high, 
                             'low': low, 
                             'close': close} for date, open, high, low, close in curs.fetchall()]

            return {
                'company': company,
                'code': code,
                'last_update': last_update.strftime('%Y-%m-%d'),
                'daily_prices': daily_prices
            }
    finally:
        conn.close()

def load_financial_statements():
    conn = get_connection()
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
    conn = get_connection()
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