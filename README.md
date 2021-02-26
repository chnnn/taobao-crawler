# taobao-crawler
A web crawler targeting Taobao(淘宝). 
# features, or what it does:
1. Fetch items-info from specified shops.
2. Parse the result, group by "shop", order by "selling volume".
3. Write the result to file.

# bootstrap
python3 -m venv .env
## macOS && Linux
source .env/bin/active
## Windows
.\env\Scripts\activate

# package list
browser-cookie3 0.12.0