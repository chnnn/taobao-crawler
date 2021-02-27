from .InputHandler import InputHandler
from .WebAnalyzer import WebAnalyzer
from .WebSessionHandler import WebSessionHandler
from .Config import urls, COOKIE_FILE_ABS_PATH, EXTRA_URL_PARAM, COOKIE_FILE_OUT_ABS_PATH
from .Helper import Helper

def run():
    # inputHandler = InputHandler(COOKIE_FILE_ABS_PATH)
    cookieDict = InputHandler.readStringifiedCookie(COOKIE_FILE_ABS_PATH)
    queryURLs = Helper.appendSearchParamToURLs(urls, EXTRA_URL_PARAM)
    webSessionHandler = WebSessionHandler(cookieDict, queryURLs, COOKIE_FILE_OUT_ABS_PATH)
    resPagesHTMLStrArray = webSessionHandler.handler()

    # webAnalyzer = WebAnalyzer(cookieDict, urls)
    # resultsStrArray = webAnalyzer.handler() 

    # print(resPagesHTMLStrArray)


run()