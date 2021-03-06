// import puppeteer from 'puppeteer'
import { SELECTORS_MISC, SELECTORS_PRIME, SELECTORS_SUB, SELECTOR_GOLDEN_BUTTON, URLS, URL_EXTRA_PARAM } from '@/appConfig'
import { autoScrollToBottom, fetchImgToFile, parseURLs, scrollToSelector, sleep, writeJSONArrToFile } from '@/src/helper'
import { Browser, LaunchOptions, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

type ItemInfo = {
  /** 180x180 pic */
  itemPicUrl: string
  // itemPicArrayBuffer: FetchImgBinaryData | null,
  itemName: string
  itemLink: string
  /** price in CNY '8.00' */
  itemPrice: string
  /** '总销量: 1' */
  itemSalesVolume: string
  /** '评价: 2' */
  itemRating: string
}
export type BrowseResult = { shopName: string, shopURL: string, itemsInfo: ItemInfo[] }
const ERRSTR = 'error'
export default async function puppetHandler() {
  // const browser = await puppeteer.launch({headless: false, executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'} as LaunchOptions);
  const browser = await puppeteer.launch({ headless: false } as LaunchOptions) as Browser;
  const page: Page = await browser.newPage()

  // preload(page)
  page.setCacheEnabled(false)
  page.deleteCookie()
  await page.goto('https://www.taobao.com/', {
    // await page.goto('https://www.google.com/', {
    waitUntil: 'networkidle2',
  })
  await sleep(40000)
  const urlsToBrowse = parseURLs(URLS, URL_EXTRA_PARAM)
  const browseResultArr: BrowseResult[] = []
  const itemsInfo = await browse(page)
}

const browse = async (page: Page): Promise<any> => {
  const shopName = '得力官方旗舰店'
  /**
   * await page.$eval('input[type="text"]', (e, shopName) =>  e['value'] = shopName , shopName)
   */
  await page.$$eval('.search input', (eList, shopName) => {
    /** the Taobao searchBox spec */
    const searchBox = eList.find(e => e['accessKey'] === 's')
    if (searchBox) {
      searchBox['value'] = shopName
    }
  }, shopName)

  try {
    await page.click('input[type="submit"]')
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  } catch (err) {
    console.warn('page.click: button does not exist')
    return
  }

  await page.$$eval('.shop a.shopname', (eList, shopName) => {
    const a = eList.find(e => e.textContent.trim() === shopName) as any
    try {
      a.click()
    } catch (err) {
      console.warn('theShowHandler does not exist')
    }
  }, shopName)
  await page.waitForNavigation({ waitUntil: 'networkidle2' })
}