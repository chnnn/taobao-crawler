import puppeteer from 'puppeteer'
import { readCookiesFileToObj, autoScrollToBottom, scrollToSelector, parseURLs, fetchImgBinary, FetchImgBinaryData } from '@/src/helper'
import { SELECTORS_PRIME, SELECTORS_SUB, COOKIES_FILE_ABS, URLS, URL_EXTRA_PARAM, SELECTORS_MISC } from '@/appConfig'

type ItemInfo = {
  /** 180x180 pic */
  itemPicUrl: string
  itemPicArrayBuffer?: FetchImgBinaryData,
  itemName: string
  itemLink: string
  /** price in CNY '8.00' */
  itemPrice: string
  /** '总销量: 1' */
  itemSalesVolume: string
  /** '评价: 2' */
  itemRating: string
}
type BrowseResult = { shopName: string, shopURL: string, itemsInfo: ItemInfo[] }
type Page = puppeteer.Page
const ERRSTR = 'error'
export default async function puppetHandler() {
  // const browser = await puppeteer.launch({headless: false, executablePath: '/usr/bin/chromium'});
  const browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await cookiesSetup(page)
  const urlsToBrowse = parseURLs(URLS, URL_EXTRA_PARAM)
  const browseResultArr: BrowseResult[] = []
  for (const url of urlsToBrowse) {
    const itemsInfo = await browse(page, url)
  }

  // TODO close browser
}

const cookiesSetup = async (page: Page) => {
  const cookiesObj = readCookiesFileToObj(COOKIES_FILE_ABS)
  for (const [name, val] of Object.entries(cookiesObj.cookies)) {
    await page.setCookie({ name: name, value: val, domain: cookiesObj.domain })
  }

  await page.waitForNavigation({
    waitUntil: 'load'
  })
}

const browse = async (page: Page, url: string): Promise<BrowseResult> => {
  await page.goto(url, {
    // waitUntil:'networkidle0'
    waitUntil: 'networkidle2'
  });

  await page.setViewport({
    width: 640,
    height: 480,
    deviceScaleFactor: 1,
  });

  await autoScrollToBottom(page)

  await scrollToSelector(page, SELECTORS_PRIME.item)
  const shopNameSelect = document.querySelector(SELECTORS_MISC.shopName)
  const shopName = shopNameSelect ? shopNameSelect.textContent : ERRSTR

  await page.screenshot({ path: `${shopName}_Result.png` })

  const items = document.querySelectorAll(SELECTORS_PRIME.item)
  const itemsList: Element[] = []
  items.forEach((item) => { itemsList.push(item) })

  /** top 10 */
  const targetItems = itemsList.slice(0, 10)

  const itemsInfo: ItemInfo[] = []
  for (const item of targetItems) {
    const imgSelect = item.querySelector(SELECTORS_SUB.itemPic)
    const imgURL = imgSelect ? imgSelect['src'] : ERRSTR
    const nameAndLinkSelect = item.querySelector(SELECTORS_SUB.itemNameAndLink)
    const name = nameAndLinkSelect ? nameAndLinkSelect.textContent : ERRSTR
    const link = nameAndLinkSelect ? nameAndLinkSelect['href'] : ERRSTR
    const priceSelect = item.querySelector(SELECTORS_SUB.itemPrice)
    const price = priceSelect ? priceSelect.textContent : ERRSTR
    const ratingSelect = item.querySelector(SELECTORS_SUB.itemRating)
    const rating = ratingSelect ? ratingSelect.textContent : ERRSTR
    const salesVolumeSelect = item.querySelector(SELECTORS_SUB.itemSalesVolume)
    const salesVolume = salesVolumeSelect ? salesVolumeSelect.textContent : ERRSTR
    const itemPicBinary = imgURL || fetchImgBinary(imgURL)
    itemsInfo.push({
      itemPicUrl: imgURL || '',
      itemPicArrayBuffer: itemPicBinary,
      itemName: name,
      itemLink: link,
      itemPrice: price,
      itemRating: rating,
      itemSalesVolume: salesVolume,
    })
  }
  return { shopName: shopName, shopURL: url, itemsInfo: itemsInfo }
}