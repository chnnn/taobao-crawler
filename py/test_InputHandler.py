import unittest
import json
from .config import TEST_COOKIE_FILE_ABS_PATH
from .InputHandler import InputHandler

class TestInputHandler(unittest.TestCase):
    def testReadStringifiedCookie(self):
        result = InputHandler.readStringifiedCookie(TEST_COOKIE_FILE_ABS_PATH)
        print(result)
        self.assertEqual(result['domain'], b'stackoverflow.com')
        self.assertEqual(result['cookies'], {"_ga":"GA1.2.1623692747.1610868377","notice-ssb":"1%3B1613804908434","_gid":"GA1.2.763449470.1614332580"})
        return