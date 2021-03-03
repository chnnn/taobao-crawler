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

export const PROJ_ROOT_ABS = path.resolve(__dirname, '.')

export const DIR_OUT_ABS = path.resolve(PROJ_ROOT_ABS, 'out')

export const COOKIES_FILE_ABS = path.resolve(PROJ_ROOT_ABS, 'in' + path.sep + 'tgt_cookies.txt')

export const URLS = [
    'https://parkerwyqt.tmall.com/search.htm?spm=a1z10.1-b-s.w4010-22969148287.4.78d66442fYQ7O1',
    'https://lamy.tmall.com/?spm=a1z10.3-b-s.1997427721.d4918089.6ed95766UVMmEq'
]
export const URL_EXTRA_PARAM = '&search=y&orderType=hotsell_desc'