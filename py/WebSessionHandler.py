import requests
import time
from .OutputHandler import OutputHandler
# import random

class WebSessionHandler:
    currentSession = requests.Session()
    urls = []
    cookieOutABSPath = ''
    def __init__(self, cookieDictIn, urlsIn, cookieDictOutABSPath):
        # use the cookieDictIn to set the init cookies
        dm = cookieDictIn['domain'].decode('utf-8')
        cookiesIn = cookieDictIn['cookies']
        for cookieName, cookieVal in cookiesIn.items():
            print('name:' + cookieName)
            print('val:' + cookieVal)
            self.currentSession.cookies.set(cookieName, cookieVal, domain=dm)
        self.urls = urlsIn
        self.cookieOutABSPath = cookieDictOutABSPath
        return

    def handler(self):
        '''
        get the content of the urls.
        Return the corresponding pages as array.
        '''
        resHTMLPages = []
        for url in self.urls:
            resHTMLPages.append(self.__singleRequestHandler(url))
            # time.sleep(8)
        return resHTMLPages

    def __singleRequestHandler(self, urlIn):
        '''
        handle a url, return text.
        type(res.cookies) == <class 'requests.cookies.RequestsCookieJar'>
        '''
        res = self.currentSession.get(urlIn)
        cookieDictOut = self.currentSession.cookies.get_dict()
        OutputHandler.writeCookiesDictOut(cookieDictOut, self.cookieOutABSPath)
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