import json
class InputHandler:
    @staticmethod
    def readStringifiedCookie(fileNameIn):
        '''
        Read the the downloaded txt (JSON.stringify(cookie)),
        Return a python dict which could be used as requests cookie.
        '''
        with open(fileNameIn, 'rb+') as f:
            domain = f.readline().strip()
            content = f.read()
            contentJSON = {}
            try:
                contentJSON = json.loads(content)
            except:
                pass
            cookieDict = { "domain": domain, "cookies": contentJSON}
        return cookieDict