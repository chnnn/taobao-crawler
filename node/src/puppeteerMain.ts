import puppeteer from 'puppeteer'
import { readJSONFileToObj, autoScrollToBottom, scrollToSelector } from '@/src/helper'
import { SELECTORS_PRIME, SELECTORS_SUB } from '@/appConfig'

type ItemInfo = {
  /** 180x180 pic */
  itemPicUrl: string
  itemName: string
  itemLink: string
  /** price in CNY '8.00' */
  itemPrice: string
  /** '总销量: 1' */
  itemSalesVolume: string
  /** '评价: 2' */
  itemRating: string
}
type Page = puppeteer.Page
const ERRSTR = 'error'
export default async function puppetHandler() {
  // const browser = await puppeteer.launch({headless: false, executablePath: '/usr/bin/chromium'});
  const browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await cookiesSetup(page)
  await browse(page)
  // TODO close browser
}
const cookiesSetup = async (page: Page) => {
  const cookiesObj = readJSONFileToObj()
  for (const [name, val] of Object.entries(cookiesObj.cookies)) {
    await page.setCookie({ name: name, value: val })
  }

  await page.waitForNavigation({
    waitUntil: 'load'
  })
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

  await scrollToSelector(page, SELECTORS_PRIME.item)
  const shopName = 's01'
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
    itemsInfo.push({
      itemPicUrl: imgURL || '',
      itemName: name,
      itemLink: link,
      itemPrice: price,
      itemRating: rating,
      itemSalesVolume: salesVolume,
    })
  }
  fetch('')
}