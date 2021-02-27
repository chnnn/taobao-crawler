import unittest
from .Helper import Helper
class TestHelper(unittest.TestCase):
    def testReadStringifiedCookie(self):
        self.assertEqual(Helper.padding2(0), '00')
        self.assertEqual(Helper.padding2(1), '01')
        self.assertEqual(Helper.padding2(10), '10')
        return
    
    def testAppendSearchParamToURLs(self):
        urlsIn = ['https://example.com', 'https://example2.com']
        extraURLParamStr = '&1=1'
        urlsOutExpected = ['https://example.com&1=1', 'https://example2.com&1=1']
        
        urlsOut = Helper.appendSearchParamToURLs(urlsIn, extraURLParamStr) 
        for index, val in enumerate(urlsOut):
            self.assertEqual(val, urlsOutExpected[index])
        return