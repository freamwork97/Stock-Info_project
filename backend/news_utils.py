import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
}


def _find_thumbnail(title_tag) -> str | None:
    """title a 태그에서 부모를 타고 올라가며 104px 썸네일 이미지를 탐색"""
    node = title_tag
    for _ in range(10):
        node = node.parent
        if node is None:
            break
        img = node.find('img', width='104')
        if img:
            return img.get('src') or None
    return None


def get_naver_news(search_query: str) -> list[dict]:
    url = 'https://search.naver.com/search.naver?where=news&sm=tab_jum&query=' + search_query

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
            if not title or not link or link in seen:
                continue
            seen.add(link)
            results.append({
                'title': title,
                'link': link,
                'thumbnail': _find_thumbnail(a),
            })
        return results
    except Exception:
        return []
