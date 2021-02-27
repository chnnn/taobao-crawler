import unittest
import json
from .config import TEST_COOKIE_FILE_ABS_PATH, TEST_COOKIE_FILE_OUT_ABS_PATH
from .WebSessionHandler import WebSessionHandler

class TestInputHandler(unittest.TestCase):
    def testSingleRequest(self):
        cookieIn = {'domain': b'stackoverflow.com', 'cookies': {'_ga': 'GA1.2.1623692747.1610868377', 'notice-ssb': '1%3B1613804908434', '_gid': 'GA1.2.763449470.1614332580'}}
        urlsIn = ['https://stackoverflow.com/questions/']
        webSessionHandler = WebSessionHandler(cookieIn, urlsIn, TEST_COOKIE_FILE_OUT_ABS_PATH)
        resHTMLPages = webSessionHandler.handler()
        print(resHTMLPages)
        # self.
        return