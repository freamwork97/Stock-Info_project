import configparser
from sqlalchemy import create_engine, text
from sqlalchemy.pool import QueuePool

config = configparser.ConfigParser()
config.read('../conf/config.ini')

_db = config['database']
_url = (
    f"mysql+pymysql://{_db['user']}:{_db['password']}"
    f"@{_db['host']}/{_db['db_name']}?charset=utf8"
)

engine = create_engine(
    _url,
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,   # 끊어진 연결 자동 감지
)


def get_connection():
    return engine.connect()
