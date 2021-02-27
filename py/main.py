from .InputHandler import InputHandler
from .WebAnalyzer import WebAnalyzer
from .WebSessionHandler import WebSessionHandler
from .config import urls, COOKIE_FILE_ABS_PATH

def run():
    # inputHandler = InputHandler(COOKIE_FILE_ABS_PATH)
    cookieDict = InputHandler.readStringifiedCookie(COOKIE_FILE_ABS_PATH)
    webSessionHandler = WebSessionHandler(cookieDict, urls)
    resPagesHTMLStrArray = webSessionHandler.handler()

    # webAnalyzer = WebAnalyzer(cookieDict, urls)
    # resultsStrArray = webAnalyzer.handler() 

    # print(resPagesHTMLStrArray)

run()

