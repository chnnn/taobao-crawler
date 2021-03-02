import { fetchImgToBlob } from '@/src/helper'
import jest from 'jest'


it('does file write', async () => {
    await fetchImgToBlob('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
});