import { fetchImgToFile } from '@/src/helper'
import jest from 'jest'


describe('fetchImgToFile', () => {
    it('does file write', async () => {
        await fetchImgToFile('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg', 'testPic01', '.png')
    });
});
