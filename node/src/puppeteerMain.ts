import puppeteer from 'puppeteer'
import { readJSONFileToObj, autoScrollToBottom, scrollToSelector } from '@/src/helper'

type Page = puppeteer.Page
export default async function puppetHandler() {
  // const browser = await puppeteer.launch({headless: false, executablePath: '/usr/bin/chromium'});
  const browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await browse(page)
  // TODO close browser
}

const browse = async (page: Page) => {
  await page.goto('https://example.com', {
    // waitUntil:'networkidle0'
    waitUntil: 'networkidle2'
  });

  await page.setViewport({
    width: 640,
    height: 480,
    deviceScaleFactor: 1,
  });

  await autoScrollToBottom(page)

  await scrollToSelector(page, '')

  const cookiesObj = readJSONFileToObj()
  for (const [name, val] of Object.entries(cookiesObj.cookies)) {
    await page.setCookie({ name: name, value: val })
  }

  await page.waitForNavigation({
    waitUntil: 'load'
  })
  await page.screenshot({ path: 'example.png' });
  // TODO extract info from 
}