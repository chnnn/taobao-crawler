import * as puppeteer from 'puppeteer'

type Page = puppeteer.Page
export default async function puppetHandler() {
  const browser = await puppeteer.launch();
  const page: Page = await browser.newPage();
  insertCookiesFromFile()
  browse(page)
  // TODO close browser
}

const insertCookiesFromFile = () => {
  // TODO
}

const browse = async (page: Page) => {
  await page.goto('https://example.com');
  // TODO
  // TODO await all async load.
  // TODO debug: save screen shot to confirm
  // TODO extract info from 
}