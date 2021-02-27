import unittest
import json
from .config import PAGE_OUT_SUFFIX, TEST_COOKIE_FILE_ABS_PATH, TEST_COOKIE_FILE_OUT_ABS_PATH, TEST_PAGE_OUT_ABS_PATH_BASE
from .WebSessionHandler import WebSessionHandler
from .InputHandler import InputHandler
from .OutputHandler import OutputHandler
from .Helper import Helper

class TestInputHandler(unittest.TestCase):
    def testSingleRequest(self):
        # cookieIn = {'domain': b'stackoverflow.com', 'cookies': {'_ga': 'GA1.2.1623692747.1610868377', 'notice-ssb': '1%3B1613804908434', '_gid': 'GA1.2.763449470.1614332580'}}
        cookiesDictIn = InputHandler.readStringifiedCookie(TEST_COOKIE_FILE_ABS_PATH)
        urlsIn = ['https://stackoverflow.com/questions/']
        webSessionHandler = WebSessionHandler(cookiesDictIn, urlsIn, TEST_COOKIE_FILE_OUT_ABS_PATH)
        resHTMLPagesByteArr = webSessionHandler.handler()

        for index, bytePage in enumerate(resHTMLPagesByteArr):
            fileName = TEST_PAGE_OUT_ABS_PATH_BASE + Helper.padding2(index) + PAGE_OUT_SUFFIX
            OutputHandler.writeFile(bytePage, fileName)
        # self.
        return