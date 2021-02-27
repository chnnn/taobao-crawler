
import json
import os
class OutputHandler:
    @staticmethod
    def writeCookiesOut(cookiesDictIn, filePathIn):
        '''
        Parse the currentCookies to JSON.stringify() string.
        Then update the original cookie file.
        '''
        dmBytes = cookiesDictIn['domain'] + b'\n'
        byteData = dmBytes + json.dumps(cookiesDictIn['cookies']).encode('utf-8')
        OutputHandler.writeFile(byteData, filePathIn)
        return
    
    @staticmethod
    def writeFile(byteData, fileNameIn):
        '''
        Complete overwrite the content of the file.
        '''
        with open(fileNameIn, 'wb+') as f:
            content = f.read()
            f.seek(0)
            f.write(byteData)
            f.truncate()
        return
    
    @staticmethod
    def cleanOrCreateDir(ABSPathToNewDir):
        '''
        delete all non-folder files within the ABSPathToNewDir
        if the dir does not exist, create.
        '''
        fileNameArr = []
        if os.path.isdir(ABSPathToNewDir):
            fileNameArr = os.listdir(ABSPathToNewDir)
            for fileName in fileNameArr:
                os.remove(fileName)
        else:
            os.makedirs(ABSPathToNewDir)
        return