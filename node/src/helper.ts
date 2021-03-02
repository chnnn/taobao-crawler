//TODO read file
import puppeteer from 'puppeteer'
import fs from 'fs'
import fetch from 'node-fetch'
import { sep } from 'path'
import { DIR_OUT } from '@/appConfig'

const path: string = ''
type Page = puppeteer.Page
export type CookiesObj = {
    domain: string,
    cookies: {
        [key: string]: string
    }
}
export const readJSONFileToObj = (): CookiesObj => {
    return {
        domain: 'taobao.com',
        cookies: {

        }
    }
}
/**
 * AutoScroll to the bottom of page.
 * to handle lazy load.
 */
export const autoScrollToBottom = async (page: Page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve({});
                }
            }, 400);
        });
    });
}

/** 
 * Scroll to the selected location.
 * @param querySelector e.g. '.site-footer', '#footer' 
 */
export const scrollToSelector = async (page: Page, querySelector: string) => {
    await page.evaluate(async () => {
        document.querySelector(querySelector).scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    })

}

/**
 * TODO eval in page or fetch directly?
 * @param suffix '.png', '.jpg', check the tail of the url.
 */
export const fetchImgToFile = async (url: string, fileName: string, suffix: string) => {
    const res = await fetch(url)
    const blobDataArrBuffer = new Uint16Array(await res.arrayBuffer())
    fs.writeFileSync(DIR_OUT + sep + fileName + suffix, blobDataArrBuffer)
}

// TODO
const createDirIfNotExist = (dir: string) => { }

const cleanDir = (dir: string) => { }