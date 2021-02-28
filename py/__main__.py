import asyncio
from pyppeteer import launch
from .InputHandler import InputHandler
from .WebAnalyzer import WebAnalyzer
from .WebSessionHandler import WebSessionHandler
from .Config import urls, COOKIE_FILE_ABS_PATH, EXTRA_URL_PARAM, COOKIE_FILE_OUT_ABS_PATH
from .Helper import Helper

async def run():
    # cookieDict = InputHandler.readStringifiedCookie(COOKIE_FILE_ABS_PATH)
    # queryURLs = Helper.appendSearchParamToURLs(urls, EXTRA_URL_PARAM)
    # webSessionHandler = WebSessionHandler(cookieDict, queryURLs, COOKIE_FILE_OUT_ABS_PATH)
    # resPagesHTMLStrArray = webSessionHandler.handler()
    browser = await launch({'headless': False, 'executablePath':'/usr/bin/chromium', 'devtools': True})
    page = await browser.newPage()
    await page.goto('https://www.amazon.com')
    await page.waitForNavigation()
    # await autoScroll(page)
    await page.screenshot({'path': 'example.png'})

asyncio.get_event_loop().run_until_complete(run())

# run()