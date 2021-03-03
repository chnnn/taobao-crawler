import { fetchImgToFile, cleanDir } from '@/src/helper'
import { DIR_OUT_ABS } from '@/appConfig'
import jest from 'jest'


describe('fetchImgToFile', () => {
    it('does file write', async () => {
        await fetchImgToFile('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg', 'testPic01', '.png')
    });
});

describe('cleanDir', () => {
    it.skip('try to del', () => {
        cleanDir(DIR_OUT_ABS)
    })
});