import { fetchImgToFile, cleanDir, readCookiesFileToObj, parseURLs } from '@/src/helper'
import { DIR_OUT_ABS } from '@/appConfig'
import path from 'path'

const TEST_COOKIES_FILE_ABS = path.resolve(__dirname, 'test_tgt_cookies.txt')

describe('fetchImgToFile', () => {
    it(`should write Img File to ${DIR_OUT_ABS}`, async () => {
        await fetchImgToFile('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg', 'testPic01', '.png')
    });
});

describe('cleanDir', () => {
    it.skip('should rm -rf Dir', () => {
        cleanDir(DIR_OUT_ABS)
    })
});

describe('readCookiesFile', () => {
    it('should read cookies', () => {
        const rtn = readCookiesFileToObj(TEST_COOKIES_FILE_ABS)
        expect(rtn.domain).toStrictEqual('stackoverflow.com')
        expect(rtn.cookies).toStrictEqual({
            prov: "fb6b1ce2-1590-cc75-c3d7-cf4c7e74e5d6",
            _a: "abc"
        })
    });
});

describe('parseURLs', () => {
    it('should parseURL with question mark', () => {
        expect(parseURLs(['https://example.com/'], 'a.htm?')).toStrictEqual(['https://example.com/a.htm?'])
        
    });
    
});