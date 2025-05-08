import { TestData } from '../../models/TestData'
import { runtest } from '../test'
import { hasLowerCaseCharacters } from './hasLowerCaseCharacters'

const testdata : TestData[] = [
    {
        it: 'should test hasLowercaseCharacters',
        args: [2],
        valid: ['ss', 'a2a2'],
        invalid: ['a2']
    }];

it('hasLowercaseCharacters', () => {
    runtest(testdata, hasLowerCaseCharacters)
});