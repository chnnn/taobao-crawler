//TODO read file
import puppeteer from 'puppeteer'
import fs from 'fs'
import fetch from 'node-fetch'
import { sep } from 'path'
import { DIR_OUT_ABS } from '@/src/legacy/appConfig'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { BrowseResult } from './puppeteerMain'

const dirOutAbs = DIR_OUT_ABS
type Page = puppeteer.Page
export type CookiesObj = {
    domain: string,
    cookies: {
        [key: string]: string
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
    createDirIfNotExist(dirOutAbs)
    fs.writeFileSync(dirOutAbs + sep + fileName + suffix, blobDataArrBuffer)
}

export type FetchImgBinaryData = { url: string, arrBuffer: Uint16Array }
export const fetchImgBinary = async (url: string): Promise<FetchImgBinaryData> => {
    const res = await fetch(url)
    const blobDataArrBuffer = new Uint16Array(await res.arrayBuffer())
    return { url: url, arrBuffer: blobDataArrBuffer }
}

export const createDirIfNotExist = (dir: string) => {
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir)
    }
}

/** rm -rf dirAbs */
export const cleanDir = (dirAbs: string) => {
    if (!dirAbs.includes(sep)) {
        console.error('Cautious. Wrong usage of cleanDir, must use ABS path.')
    }
    if (!fs.existsSync(dirAbs)) {
        mkdirp.sync(dirAbs)
        return
    }
    rimraf.sync(dirAbs)
    mkdirp.sync(dirAbs)
    return
}

export const readCookiesFileToObj = (filePath: string): { domain: string, cookies: { [key: string]: string } } => {
    const data = fs.readFileSync(filePath, 'utf-8').split('\n')
    const domain = data[0]
    const cookies = JSON.parse(data[1])
    return { domain: domain, cookies: cookies }
}

export const parseURLs = (urls: string[], extraParam: string): string[] => {
    const parsedURLs: string[] = []
    urls.forEach(e => parsedURLs.push(e + (extraParam || '')))
    return parsedURLs
}

export const writeJSONArrToFile = (objArrIn: BrowseResult[], fileName: string, suffix: string) => {
    createDirIfNotExist(dirOutAbs)
    fs.writeFileSync(dirOutAbs + sep + fileName + suffix, JSON.stringify(objArrIn))
}

export const writeCookieToFile = (page: Page) => {
    page.cookies()
}

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));