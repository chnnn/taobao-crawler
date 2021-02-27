
import json
from .config import COOKIE_FILE_ABS_PATH
class OutputHandler:
    fileName = ''
    def __init__(self, fileNameIn):
        self.fileName = fileNameIn
        return

    def handler(self, byteDataIn):
        '''
        Write the result to file.
        '''
        return writeFile(byteDataIn, self.fileName)


    @staticmethod
    def modifyTheCookieFile(currentCookies):
        '''
        Parse the currentCookies to JSON.stringify() string.
        Then update the original cookie file.
        '''
        byteData = json.dumps(currentCookies).encode('utf-8')
        OutputHandler.writeFile(byteData, COOKIE_FILE_ABS_PATH)
        return
    
    @staticmethod
    def writeFile(byteData, fileNameIn):
        '''
        Complete overwrite the content of the file.
        '''
        with open(fileNameIn, 'rb+') as f:
            content = f.read()
            f.seek(0)
            f.write(byteData)
            f.truncate()
        return