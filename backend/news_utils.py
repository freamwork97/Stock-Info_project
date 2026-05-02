import requests
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def get_naver_news(search_query):
    base_url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query="
    url = base_url + search_query

    try:
        response = requests.get(url, headers=HEADERS, timeout=5)
        soup = BeautifulSoup(response.content, 'html.parser')

        results = []
        for news in soup.find_all('div', class_='news_area'):
            tag = news.find('a', class_='news_tit')
            if tag:
                results.append({'title': tag['title'], 'link': tag['href']})
        return results
    except Exception:
        return []