import { MessageFunctionType } from '../../types/MessageFunctionType';
import { Result } from './Result';
import { isString } from './isString';

export interface HasUpperCaseCharactersErrors {
  TARGET_ARGUMENT_NOT_A_STRING: MessageFunctionType;
}

export const HAS_UPPERCASE_CHARACTERS_ERRORS: HasUpperCaseCharactersErrors =
{
  TARGET_ARGUMENT_NOT_A_STRING: (arr?: string[]) => {
    return `The target argument ${arr![0]} is not a string.`;
  }
};

export function hasUpperCaseCharacters(target : string, min : number):Result<boolean|undefined>  {
  const regex: RegExp = new RegExp(`([A-Z].*){${min},}`);

  if (!isString(target).value) {
    return new Result(undefined, HAS_UPPERCASE_CHARACTERS_ERRORS.TARGET_ARGUMENT_NOT_A_STRING,[target])
  }
  
  return new Result((regex.test(target)));
}