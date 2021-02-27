import requests
import time
from .OutputHandler import OutputHandler
# import random

class WebSessionHandler:
    currentSession = requests.Session()
    urls = []
    cookieOutABSPath = ''
    domain = b''
    def __init__(self, cookieDictIn, urlsIn, cookieDictOutABSPath):
        self.urls = urlsIn
        self.cookieOutABSPath = cookieDictOutABSPath
        if cookieDictIn['cookies'] is None:
            return
        if cookieDictIn['domain'] is None:
            self.domain = b''
        self.domain = cookieDictIn['domain']
        cookiesIn = cookieDictIn['cookies']
        for cookieName, cookieVal in cookiesIn.items():
            self.currentSession.cookies.set(cookieName, cookieVal, domain=self.domain.decode('utf-8'))
        return

    def handler(self):
        '''
        get the content of the urls.
        Return the *byte content* of the corresponding pages as array.
        '''
        resHTMLPages = []
        for url in self.urls:
            resHTMLPages.append(self.__singleRequestHandler(url))
            # time.sleep(8)
        return resHTMLPages

    def __singleRequestHandler(self, urlIn):
        '''
        handle a url, return text.
        the cookie will be managed by the session. Latest cookie will be updated to the same file.
        type(res.cookies) == <class 'requests.cookies.RequestsCookieJar'>
        '''
        res = self.currentSession.get(urlIn)
        cookieDictOut = {"domain":self.domain, "cookies": self.currentSession.cookies.get_dict()}
        OutputHandler.writeCookiesOut(cookieDictOut, self.cookieOutABSPath)
        # (res.content).decode('utf-8') == res.text
        return res.content


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