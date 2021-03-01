//TODO read file
import puppeteer from 'puppeteer'

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