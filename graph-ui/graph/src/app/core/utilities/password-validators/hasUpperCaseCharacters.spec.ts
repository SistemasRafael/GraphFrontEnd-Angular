import { TestData } from '../../models/TestData'
import { runtest } from '../test'
import { hasUpperCaseCharacters } from './hasUpperCaseCharacters'

const testdata: TestData[] = [
    {
        it: 'should test hasUppercaseCharacters',
        args: [2],
        valid: ['A2B2'],
        invalid: ['a2']
    }]

it('hasUppercaseCharacters', () => {
    runtest(testdata, hasUpperCaseCharacters)
});