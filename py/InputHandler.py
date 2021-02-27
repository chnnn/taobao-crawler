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
            cookieDict = { "domain": domain, "cookies": json.loads(content)}
        return cookieDict