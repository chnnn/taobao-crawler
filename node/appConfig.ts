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
