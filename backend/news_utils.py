import requests
from bs4 import BeautifulSoup

def get_naver_news(search_query):
    base_url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query="
    url = base_url + search_query

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    news_list = soup.find_all('div', class_='news_area')

    results = []
    for news in news_list:
        title = news.find('a', class_='news_tit')['title']
        link = news.find('a', class_='news_tit')['href']
        results.append({'title': title, 'link': link})

    return results