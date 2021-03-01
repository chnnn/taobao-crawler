/** locating first item && screenshot */
export const ItemSelector = 'dl.item'

/** ItemPicSelector.src is the url string to the 180x180 item img*/
export const ItemPicSelector = 'dl.item > dt.photo img'

/** find item detail info(the Item Name is its innerText) */
export const ItemNameSelector = 'dl.item > dd.detail > a'

// export const ItemCurrencySelector = 'dl.item > dd.detail > div.attribute > div.cprice-area > .symbol'

/** price in CNY. (.innerText == '8.00') */
export const ItemPriceSelector = 'dl.item > dd.detail > div.attribute > div.cprice-area > .c-price'

/** (.innerText = '总销量: 1') */
export const ItemSalesVolumeSelector = 'dl.item > dd.detail > div.attribute > div.sale-area'
/** (.innerText = '评价: 2') */
export const ItemRatingSelector = 'dl.item > dd.rates a'
