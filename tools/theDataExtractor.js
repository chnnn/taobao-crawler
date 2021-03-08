await (async () => {
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

    async function extractTop15() {
        const limit = 15
        const ERRSTR = 'error'
        const items = document.querySelectorAll(SELECTORS_PRIME.item)
        const itemsList = []
        items.forEach((item) => { itemsList.push(item) })
        /** shopName */
        const shopNameSelect = document.querySelector(SELECTORS_MISC.shopName)
        const shopName = shopNameSelect ? shopNameSelect.textContent : ERRSTR

        /** top 10 */
        const targetItems = itemsList.slice(0, 10)

        const itemsInfo = []
        const promisesList = []
        let itemRanking = 0
        for (const item of targetItems) {
            const imgSelect = item.querySelector(SELECTORS_SUB.itemPic)
            const imgURL = imgSelect ? imgSelect['src'] : ERRSTR
            const nameAndLinkSelect = item.querySelector(SELECTORS_SUB.itemNameAndLink)
            const name = nameAndLinkSelect ? nameAndLinkSelect.textContent : ERRSTR
            const link = nameAndLinkSelect ? nameAndLinkSelect['href'] : ERRSTR
            const priceSelect = item.querySelector(SELECTORS_SUB.itemPrice)
            const price = priceSelect ? priceSelect.textContent : ERRSTR
            const ratingSelect = item.querySelector(SELECTORS_SUB.itemRating)
            const rating = ratingSelect ? ratingSelect.textContent : ERRSTR
            const salesVolumeSelect = item.querySelector(SELECTORS_SUB.itemSalesVolume)
            const salesVolume = salesVolumeSelect ? salesVolumeSelect.textContent : ERRSTR
            if (imgURL) {
                try {
                    promisesList.push(
                        fetchPic(imgURL, shopName + ' ' + padding2(itemRanking) + ' ' + name)
                    )
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
        if (!csvStr) {
            return
        }
        autoDownloadToCSV(csvStr, shopName)
        await Promise.allSettled(promisesList)
    }

    /** @param temsInfo ItemInfo[] */
    function convertItemInfoArrToCSVStr(itemsInfo) {
        const rows = []
        /** headers */
        let headerRow = ' '
        if (!itemsInfo || !itemsInfo[0]) {
            return ''
        }
        for (const columnHeader of Object.keys(itemsInfo[0])) {
            headerRow += columnHeader + ', '
        }
        /** remove the head && trailing spaces, and the last comma */
        rows.push(headerRow.trim().slice(0, -1))
        /** data */
        for (const itemInfo of itemsInfo) {
            let row = ' '
            for (const columnVal of Object.values(itemInfo)) {
                row += columnVal + ', '
            }
            rows.push(row.trim().slice(0, -1))
        }
        return rows.join('\n')
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
        a.download = fName
        /** parse without BOM */
        const data = 'data:text/txt;charset=UTF-8,%EF%BB%BF' + encodeURIComponent(stringToDownload)
        a.href = data
        /**
         * firefox support, according to 
         * https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
         */
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    async function fetchPic(url, name) {
        try {
            /** '.jpg' */
            const suffix = '.' + url.split('.').pop()
            const imgBinReadableStream = await window.fetch(url)
            const imgBinBlob = await imgBinReadableStream.blob()
            const imgBinUri = window.URL.createObjectURL(imgBinBlob)
            const a = document.createElement('a');

            a.href = imgBinUri
            a.download = name + suffix
            document.body.appendChild(a)
            a.click()
            a.remove()
        } catch (err) {
            return Promise.reject(err)
        }
        return Promise.resolve(`img ${name} download success`)
    }

    extractTop15()
})()