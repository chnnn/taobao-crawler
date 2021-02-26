from util.InputHandler import InputHandler
# import requests

def run():
    inputHandler = InputHandler('tgt_cookies.txt')
    cookieDict = inputHandler.handler()

run()

