import json
class InputHandler:
    fileName = ''
    def __init__(self, fileNameIn):
        self.fileName = fileNameIn
        return

    def handler(self):
        '''
        Return a dict of cookie.
        '''
        return InputHandler.readStringifiedCookie(self.fileName)
    
    @staticmethod
    def readStringifiedCookie(fileNameIn):
        '''
        Read the the downloaded txt (JSON.stringify(cookie)),
        Return a python dict which could be used as requests cookie.
        '''
        with open(fileNameIn, 'rb+') as f:
            content = f.read()
            cookieDict = json.loads(content)
        return cookieDict