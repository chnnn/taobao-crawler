from util.InputHandler import InputHandler
from util.WebAnalyzer import WebAnalyzer
from util.WebSessionHandler import WebSessionHandler
from config import urls

def run():
    inputHandler = InputHandler('tgt_cookies.txt')
    cookieDict = inputHandler.handler()

    webAnalyzer = WebAnalyzer(cookieDict, urls)
    resultsStringArray = webAnalyzer.handler() 

    webSessionHandler = WebSessionHandler(cookieDict, urls)
    webSessionHandler.handler()

run()

