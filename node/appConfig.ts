import path from 'path'
/** locating an item */
export const SELECTORS_PRIME = {
    item: 'dl.item'
}

export const SELECTORS_SUB = {
    /** ItemPicSelector.src is the url string to the 180x180 item img */
    itemPic: 'dt.photo img',
    /** .textContent is the item name. href is the item link */
    itemNameAndLink: 'dd.detail > a',
    // itemCurrency = 'dd.detail > div.attribute > div.cprice-area > .symbol'
    /** price in CNY. (.textContent == '8.00') */
    itemPrice: 'dd.detail > div.attribute > div.cprice-area > .c-price',
    /** (.textContent = '总销量: 1') */
    itemSalesVolume: 'dd.detail > div.attribute > div.sale-area',
    /** (.textContent = '评价: 2') */
    itemRating: 'dd.rates a',
}

export const SELECTORS_MISC = {
    /** .textContent is the shopName */
    shopName: '#header .slogo .slogo-shopname'
}

export const PROJ_ROOT_ABS = path.resolve(__dirname, '..')

export const DIR_OUT_ABS = path.resolve(PROJ_ROOT_ABS, 'out')

export const COOKIES_FILE_ABS = path.resolve(PROJ_ROOT_ABS, 'in' + path.sep + 'tgt_cookies.txt')

export const URLS = [
    'https://lamy.tmall.com/?spm=a1z10.3-b-s.1997427721.d4918089.6ed95766UVMmEq'
]
export const URL_EXTRA_PARAM = '&search=y&orderType=hotsell_desc'


export const USER_AGENT_LIST = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 2.2) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
]