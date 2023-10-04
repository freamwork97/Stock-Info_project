import pymysql
import configparser
from fastapi import HTTPException

config = configparser.ConfigParser()
config.read('../conf/config.ini')

# 데이터베이스 연결 정보 가져오기
database_info = config['database']
host = database_info['host']
user = database_info['user']
password = database_info['password']
db_name = database_info['db_name']

def get_stock_info(stock_name):
    conn = pymysql.connect(
        host=host,
        user=user,
        password=password,
        db=db_name,
        charset='utf8'
    )
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