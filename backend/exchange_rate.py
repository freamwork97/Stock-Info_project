import requests
from bs4 import BeautifulSoup

def get_exchange_rate():
    url = "https://finance.naver.com/marketindex/exchangeList.nhn"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    exchange_rates = [
        {
            "currency": row.select_one("td.tit a").text.strip(),
            "exchange_rate": row.select_one("td.sale").text.strip()
        }
        for row in soup.select("table.tbl_exchange tbody tr")
    ]

    return exchange_rates[:7]