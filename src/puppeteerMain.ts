// import puppeteer from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Page, LaunchOptions, Browser } from 'puppeteer'
import { readCookiesFileToObj, autoScrollToBottom, scrollToSelector, parseURLs, fetchImgToFile, writeJSONArrToFile, sleep } from '@/src/helper'
import { SELECTOR_GOLDEN_BUTTON, SELECTORS_PRIME, SELECTORS_SUB, COOKIES_FILE_ABS, URLS, URL_EXTRA_PARAM, SELECTORS_MISC, USER_AGENT_LIST, PROJ_ROOT_ABS } from '@/appConfig'
import fs from 'fs'
import path from 'path'
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
  // await page.goto('https://login.taobao.com/', {
  await page.goto('https://www.google.co.jp/', {
    waitUntil: 'networkidle2',
  })
  await sleep(30000)
  const urlsToBrowse = parseURLs(URLS, URL_EXTRA_PARAM)
  const browseResultArr: BrowseResult[] = []
  urlsToBrowse.forEach(async (url, index) => {
    if (index > 0) {
      /** 15s */
      sleep(15000)
    }
    const itemsInfo = await browse(page, url)
    browseResultArr.push(itemsInfo)
  })
  writeJSONArrToFile(browseResultArr, 'data', '.txt')

}
// const preload = async (page: Page) => {
//   const preloadJsAbs = path.resolve(PROJ_ROOT_ABS, 'src/preload.js')
//   const preloadFile = fs.readFileSync(preloadJsAbs, 'utf8');
//   await page.evaluateOnNewDocument(preloadFile);
// }

// const cookiesSetup = async (page: Page) => {
//   const cookiesObj = readCookiesFileToObj(COOKIES_FILE_ABS)
//   for (const [name, val] of Object.entries(cookiesObj.cookies)) {
//     await page.setCookie({ name: name, value: val, domain: cookiesObj.domain })
//   }
// }

const browse = async (page: Page, url: string): Promise<BrowseResult> => {
  try {
    /** GOTO category page */
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 0,
    });

  } catch (err) {
    console.error(err)
    throw err
  }

  // await page.setViewport({
  //   width: 1800,
  //   height: 1200,
  // });

  // await page.waitForNavigation({
  //   waitUntil: 'load'
  // })
  const goldenButtonSelect = await page.evaluate(() => {
    return document.querySelectorAll(SELECTOR_GOLDEN_BUTTON)
  })

  console.log('91:')
  if (!goldenButtonSelect || goldenButtonSelect[1] || goldenButtonSelect[1]['href']) {
    throw new Error('goldenButton not found.')
  }
  const goldenButtonLink: string = goldenButtonSelect[1]['href']

  console.log('97:')
  /** the result page */
  await page.goto(goldenButtonLink, {
    waitUntil: 'networkidle2',
    timeout: 0,
  })


  await autoScrollToBottom(page)

  await scrollToSelector(page, SELECTORS_PRIME.item)

  const shopNameSelect = await page.evaluate(() => {
    return document.querySelector(SELECTORS_MISC.shopName)
  })

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
    const imgURL = imgSelect ? imgSelect['src'] as string : ERRSTR
    const nameAndLinkSelect = item.querySelector(SELECTORS_SUB.itemNameAndLink)
    const name = nameAndLinkSelect ? nameAndLinkSelect.textContent : ERRSTR
    const link = nameAndLinkSelect ? nameAndLinkSelect['href'] as string : ERRSTR
    const priceSelect = item.querySelector(SELECTORS_SUB.itemPrice)
    const price = priceSelect ? priceSelect.textContent : ERRSTR
    const ratingSelect = item.querySelector(SELECTORS_SUB.itemRating)
    const rating = ratingSelect ? ratingSelect.textContent : ERRSTR
    const salesVolumeSelect = item.querySelector(SELECTORS_SUB.itemSalesVolume)
    const salesVolume = salesVolumeSelect ? salesVolumeSelect.textContent : ERRSTR
    // let imgBinaryArrBuffer: FetchImgBinaryData | null = null
    if (imgURL) {
      const str = imgURL.split('.')
      const imgSuffix = '.' + str[str.length - 1]
      try {
        // imgBinary = await fetchImgBinary(imgURL)
        await fetchImgToFile(imgURL, name, imgSuffix)
      } catch (err) {
        console.error(err)
      }
    }
    itemsInfo.push({
      itemPicUrl: imgURL || '',
      // itemPicArrayBuffer: imgBinaryArrBuffer,
      itemName: name,
      itemLink: link,
      itemPrice: price,
      itemRating: rating,
      itemSalesVolume: salesVolume,
    })
  }
  return { shopName: shopName, shopURL: url, itemsInfo: itemsInfo }
}