/**
 * 1. Await user login.
 * 2. After 40s, search for the target shopName, and open the tabs to the main page of the shops.
 * The shopName must be the exact match, case sensitive. For example, 'IKEA宜家家居官方旗舰店'
 */
import { Browser, LaunchOptions, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

export default async function puppetHandler() {
  const shopNames: string[] = [
    'ikea宜家家居官方旗舰店',
    '得力官方旗舰店',
  ]

  // const browser = await puppeteer.launch({headless: false, executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'} as LaunchOptions);
  const browser = await puppeteer.launch({ headless: false } as LaunchOptions) as Browser;
  const page: Page = await browser.newPage()
  await page.goto('https://www.taobao.com/', {
    waitUntil: 'networkidle2',
  })
  await sleep(40)
  shopNames.forEach(async (shopName, index) => {
    if (index > 0) {
      await sleep(10)
    }
    await browseShopHome(browser, shopName)
  })
}

const browseShopHome = async (browser: Browser, shopNameToSearch: string): Promise<any> => {
  const page: Page = await browser.newPage()
  await page.goto('https://www.taobao.com/', {
    waitUntil: 'networkidle2',
  })
  const shopName = shopNameToSearch || ''
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
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 })
  } catch (err) {
    console.warn('page.click: button does not exist')
    return
  }

  await sleep(1)

  /** enter the main page of the shop */
  await page.$$eval('.shop a.shopname', (eList, shopName) => {
    const a = eList.find(e => e.textContent.trim() === shopName) as any
    try {
      /** pop-up, no need to await navigation */
      a.click()
    } catch (err) {
      console.warn('theShowHandler does not exist')
    }
  }, shopName)
  await page.close()
}

const sleep = (seconds: number) => new Promise(res => setTimeout(res, seconds * 1000));