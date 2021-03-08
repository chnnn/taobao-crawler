/** locating an item */
const SELECTORS_PRIME = {
    item: 'dl.item'
}

const SELECTORS_SUB = {
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
const SELECTORS_MISC = {
    /** .textContent is the shopName */
    shopName: '#header .slogo .slogo-shopname'
}

/** extract the necessary data from a store's ranking page */

function extractTop10() {
    const limit = 10
    const ERRSTR = 'error'
    const items = document.querySelectorAll(SELECTORS_PRIME.item)
    const itemsList = []
    items.forEach((item) => { itemsList.push(item) })
    /** shopName */
    const shopNameSelect = document.querySelector(SELECTORS_MISC.shopName)
    const shopName = shopNameSelect ? shopNameSelect.textContent : ERRSTR

    /** top 10 */
    const targetItems = itemsList.slice(0, 10)

    const itemsInfo: ItemInfo[] = []
    let itemRanking = 0
    for (const item of targetItems) {
        const imgSelect = item.querySelector(SELECTORS_SUB.itemPic)
        const imgURL = imgSelect ? imgSelect['src'] as string : ERRSTR
        const nameAndLinkSelect = item.querySelector(SELECTORS_SUB.itemNameAndLink)
        const name = nameAndLinkSelect ? nameAndLinkSelect.textContent : ERRSTR
        const link = nameAndLinkSelect ? nameAndLinkSelect['href'] as string : ERRSTR
        const priceSelect = item.querySelector(SELECTORS_SUB.itemPrice)
        const price = priceSelect ? priceSelect.textContent : ERRSTR
        const ratingSelect = item.querySelector(SELECTORS_SUB.itemRating)
        const rating = ratingSelect ? ratingSelect.textContent : ERRSTR
        const salesVolumeSelect = item.querySelector(SELECTORS_SUB.itemSalesVolume)
        const salesVolume = salesVolumeSelect ? salesVolumeSelect.textContent : ERRSTR
        if (imgURL) {
            try {
                new Promise((resolve) => {
                    downloadURI(imgURL, shopName + ' ' + padding2(itemRanking) + ' ' + name)
                    resolve(null)
                })
            } catch (err) {
                console.error(err)
            }
        }
        itemsInfo.push({
            itemName: name,
            itemLink: link,
            itemPrice: price,
            itemRating: rating,
            itemSalesVolume: salesVolume,
        })
        itemRanking += 1
    }
    const csvStr = convertItemInfoArrToCSVStr(itemsInfo)
    autoDownloadToCSV(csvStr, shopName)
}

function convertItemInfoArrToCSVStr(itemsInfo: ItemInfo[]) {
    const rows: string[] = []
    /** headers */
    let headerRow = ' '
    for (const columnHeader of Object.keys(itemsInfo)) {
        headerRow += columnHeader + ', '
    }
    /** remove the head && trailing spaces, and the last comma */
    rows.push(headerRow.trim().slice(0, -1))
    /** data */
    for (const itemInfo of itemsInfo) {
        let row = ' '
        for (const columnVal of Object.values(itemsInfo)) {
            row += columnVal + ', '
        }
        rows.push(row.trim().slice(0, -1))
    }
    return rows.join('\n')
}
type ItemInfo = {
    /** 180x180 pic */
    itemName: string
    itemLink: string
    /** price in CNY '8.00' */
    itemPrice: string
    /** '总销量: 1' */
    itemSalesVolume: string
    /** '评价: 2' */
    itemRating: string
}

/** download a uri, as `${name}.autoSuffix` */
function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function padding2(i) {
    let t
    try {
        t = parseInt(i)
    } catch (err) {
        return
    }
    if (t < 10) {
        return '0' + t
    }
    return t
}

/**
 * Download a string to csv
 * usage: autoDownloadToCSV('anything')
 */
function autoDownloadToCSV(stringToDownload, fileName) {
    const fName = `${fileName}.csv`
    const a = document.createElement('a');
    a.download = fileName
    /** parse without BOM */
    const data = 'data:text/txt;charset=UTF-8,%EF%BB%BF' + encodeURIComponent(stringToDownload)
    a.href = data
    a.click()
}