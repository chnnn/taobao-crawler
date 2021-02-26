import requests
import time
# import random

class WebSessionHandler:
    currentSession = requests.Session()
    currentSessionCookies = {}
    urls = []
    def __init__(self, cookieDictIn, urlsIn):
        self.sessionCookies = cookieDictIn
        self.urls = urlsIn
        return

    def handler(self):
        '''
        get the content of the urls.
        Return the corresponding pages as array.
        '''
        resHTMLPages = []
        for url in self.urls:
            resHTMLPages.append(self.singleRequestHandler(url, self.currentSessionCookies))
            # time.sleep(8)
        return resHTMLPages

    def singleRequestHandler(self, urlIn, cookieDictIn):
        '''
        handle a url, return text.
        '''
        res = self.currentSession.get(urlIn, cookies = self.currentSessionCookies)
        self.currentSessionCookies = res.cookies
        return res.text


userAgentList = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 2.2) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
]