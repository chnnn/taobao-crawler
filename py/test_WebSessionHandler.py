import unittest
import json
from .config import TEST_COOKIE_FILE_ABS_PATH
from .WebSessionHandler import WebSessionHandler

class TestInputHandler(unittest.TestCase):
    def testSingleRequest(self):
        cookieIn = {"_ga":"GA1.2.1623692747.1610868377","notice-ssb":"1%3B1613804908434","_gid":"GA1.2.763449470.1614332580"}
        urlsIn = ['https://stackoverflow.com/questions/']
        webSessionHandler = WebSessionHandler(cookieIn,urlsIn)
        resHTMLPages = webSessionHandler.handler()
        print(resHTMLPages)
        # self.
        return