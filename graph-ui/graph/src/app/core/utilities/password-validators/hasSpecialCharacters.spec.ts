import { TestData } from '../../models/TestData'
import { runtest } from '../test'
import { hasSpecialCharacters } from './hasSpecialCharacters'

const testdata: TestData[] = [
    {
        it: 'should test hasSpecialCharacters',
        args: [2],
        valid: [']]a2a2', '@@a2a2', '@$a2a2', '@a2$a2', '#a2a2a2&'],
        invalid: ['a2']
    }]

it('hasSpecialCharacters', () => {
    runtest(testdata, hasSpecialCharacters)
});