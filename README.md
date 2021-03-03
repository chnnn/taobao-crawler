# taobao-crawler
A web crawler targeting Taobao(淘宝). 

# features, or what it does:
1. Fetch items-info from specified shops.
2. Parse the result, group by "shop", order by "selling volume".
3. Write the result to file.

# usage:
1. open and login to taobao.com
2. open the javascript console window (press F12 in chrome)
3. copy the content of `node/cookieExtractor.js` to the window, press Enter key.
4. a txt file shall be downloaded. Allow the download if any user confirmation is necessary.

5. copy the txt file to the `py` folder
6. run `main.py`, the output will appear in the same folder

# initial setup:
1. Download [NodeJs](https://nodejs.org/)
2. npm install

# dependencies:
- python 3.8+
- pip install requests
- pip install pyppeteer
# bootstrap
python3 -m venv .env
## macOS && Linux
source .env/bin/active
## Windows
.\env\Scripts\activate

# package list
browser-cookie3 0.12.0