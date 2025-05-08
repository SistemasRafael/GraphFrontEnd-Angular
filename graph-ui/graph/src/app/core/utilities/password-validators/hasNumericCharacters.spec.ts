import { TestData } from '../../models/TestData'
import { runtest } from '../test'
import { hasNumericCharacters } from './hasNumericCharacters'

const testdata: TestData[] = [
    {
        it: 'should test hasNumericCharacters',
        args: [2],
        valid: [ '22', 'a2a2'],
        invalid: ['1', 'a2']
    }]
    
it('hasNumericCharacters', () => {
    runtest(testdata, hasNumericCharacters)
});