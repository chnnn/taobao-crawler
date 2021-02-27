import unittest
import json
from .config import TEST_COOKIE_FILE_ABS_PATH
from .InputHandler import InputHandler

class TestInputHandler(unittest.TestCase):
    def testReadStringifiedCookie(self):
        cookiesDict = InputHandler.readStringifiedCookie(TEST_COOKIE_FILE_ABS_PATH)
        self.assertEqual(cookiesDict['domain'], b'stackoverflow.com')
        self.assertIsNotNone(cookiesDict['cookies'])
        return