import unittest
from .Helper import Helper
class TestHelper(unittest.TestCase):
    def testReadStringifiedCookie(self):
        self.assertEqual(Helper.padding2(0), '00')
        self.assertEqual(Helper.padding2(1), '01')
        self.assertEqual(Helper.padding2(10), '10')