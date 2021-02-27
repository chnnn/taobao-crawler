import os
urls = ['https://parkerwyqt.tmall.com/search.htm?spm=a1z10.1-b-s.w4010-22969148287.4.78d66442fYQ7O1',
'https://lamy.tmall.com/?spm=a1z10.3-b-s.1997427721.d4918089.6ed95766UVMmEq']
# urls = ['https://stackoverflow.com/questions/']
cookieFileInPyFolder = 'tgt_cookies.txt'
htmlOutputFolderName = 'out'

EXTRA_URL_PARAM = '&search=y&orderType=hotsell_desc&tsearch=y'
REQUESTS_DELAY_IN_SEC = 8
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_ABS_PATH = os.path.join(ROOT_DIR, 'configuration.py')
COOKIE_FILE_ABS_PATH = os.path.join(ROOT_DIR, cookieFileInPyFolder)
COOKIE_FILE_OUT_ABS_PATH = COOKIE_FILE_ABS_PATH
PAGE_OUT_ABS_PATH_BASE = os.path.join(ROOT_DIR, htmlOutputFolderName + os.sep + 'temp_page_')
PAGE_OUT_SUFFIX = '.html'
TEST_COOKIE_FILE_ABS_PATH = os.path.join(ROOT_DIR, 'test_' + cookieFileInPyFolder)
TEST_COOKIE_FILE_OUT_ABS_PATH = TEST_COOKIE_FILE_ABS_PATH
TEST_PAGE_OUT_ABS_PATH_BASE = os.path.join(ROOT_DIR, htmlOutputFolderName + os.sep + 'test_page_')