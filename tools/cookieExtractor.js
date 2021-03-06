/** 
 * Auto downloading the cookie within the scope of the current window. 
 * Usage: copy & paste the following script to the console of an open browser window to run.
 */

/**
 * Get the Domain name of the current page(domain name of the cookie)
 * window.location.hostname === www.abc.example.com
 * returns: 'example.com'
 */
function getDomainName(hostName)
{
    return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
}
let dm = getDomainName(window.location.hostname)

/** Get the cookies */
function getCookies() {
  const cookiesRaw = document.cookie.split(";");
  let cookiesObj = {};
  for (const entryStr of cookiesRaw) {
    const entry = entryStr.split('=')
    const key = entry[0].trim()
    // const val = unescape(entry.slice(1).join('='))
    const val = entry.slice(1).join('=')
    cookiesObj[key] = val
  }
  return cookiesObj;
}

let cookieObjStringified = JSON.stringify(getCookies())

/**
 * Download a string to txt File
 * usage: autoDownloadToCSV('anything')
 */
function autoDownloadToTXT(stringToDownload) {
  const fileName = 'tgt_cookies.txt'
  const a = document.createElement('a');
  a.download = fileName
  /** parse without BOM */
  const data = 'data:text/txt;charset=UTF-8,' + encodeURIComponent(stringToDownload)
  a.href = data
  a.click()
}
let strToDownload = dm + '\n' + cookieObjStringified

autoDownloadToTXT(strToDownload)

