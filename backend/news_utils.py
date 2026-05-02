import requests
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def get_naver_news(search_query):
    url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=" + search_query

    try:
        response = requests.get(url, headers=HEADERS, timeout=5)
        soup = BeautifulSoup(response.content, 'html.parser')

        news_section = soup.find('div', class_='group_news')
        if not news_section:
            return []

        results = []
        seen = set()
        for a in news_section.find_all('a', attrs={'data-heatmap-target': '.tit'}):
            title = a.get_text(strip=True)
            link = a.get('href', '')
            if title and link and link not in seen:
                seen.add(link)
                results.append({'title': title, 'link': link})
        return results
    except Exception:
        return []
