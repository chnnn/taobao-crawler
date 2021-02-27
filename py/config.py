import os
# urls = ['https://parkerwyqt.tmall.com/search.htm?spm=a1z10.1-b-s.w4010-22969148287.4.78d66442fYQ7O1&search=y&orderType=hotsell_desc']
urls = ['https://stackoverflow.com/questions/']
cookieFileInPyFolder = 'tgt_cookies.txt'


ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_ABS_PATH = os.path.join(ROOT_DIR, 'configuration.py')
COOKIE_FILE_ABS_PATH = os.path.join(ROOT_DIR, cookieFileInPyFolder)
TEST_COOKIE_FILE_ABS_PATH = os.path.join(ROOT_DIR, 'test_' + cookieFileInPyFolder)