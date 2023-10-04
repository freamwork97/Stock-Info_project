import requests
from bs4 import BeautifulSoup

def get_exchange_rate():
    url = "https://finance.naver.com/marketindex/exchangeList.nhn"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    exchange_rates = []

    for row in soup.select("table.tbl_exchange tbody tr"):
        currency = row.select_one("td.tit a").text.strip()
        exchange_rate = row.select_one("td.sale").text.strip()

        exchange_rates.append({
            "currency": currency,
            "exchange_rate": exchange_rate
        })

    return exchange_rates[0:5]
