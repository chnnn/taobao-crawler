from util.InputHandler import InputHandler
from util.WebAnalyzer import WebAnalyzer
from util.WebSessionHandler import WebSessionHandler
from config import urls, cookieFileName

def run():
    inputHandler = InputHandler(cookieFileName)
    cookieDict = inputHandler.handler()

    webAnalyzer = WebAnalyzer(cookieDict, urls)
    resultsStrArray = webAnalyzer.handler() 

    webSessionHandler = WebSessionHandler(cookieDict, urls)
    resPagesHTMLStrArray = webSessionHandler.handler()
    # print(resPagesHTMLStrArray)

run()

