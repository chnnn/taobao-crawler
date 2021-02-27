import requests
import time
from .OutputHandler import OutputHandler
from .Config import PAGE_OUT_ABS_PATH_BASE, PAGE_OUT_SUFFIX, REQUESTS_DELAY_IN_SEC
from .Helper import Helper
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
        resPagesByteContent = []
        for index, url in enumerate(self.urls):
            resBytePageContent = self.__singleRequestHandler(url)
            fileName = PAGE_OUT_ABS_PATH_BASE + Helper.padding2(index) + PAGE_OUT_SUFFIX
            OutputHandler.writeFile(resBytePageContent, fileName)
            resPagesByteContent.append(resBytePageContent)
            time.sleep(REQUESTS_DELAY_IN_SEC)
        return resPagesByteContent

    def __singleRequestHandler(self, urlIn):
        '''
        handle a url, return byte content.
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