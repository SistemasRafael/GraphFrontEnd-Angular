import { MessageFunctionType } from '../../types/MessageFunctionType';
import { Result } from './Result';
import { isString } from './isString';

export interface HasLowerCaseCharactersErrors {
  TARGET_ARGUMENT_NOT_A_STRING: MessageFunctionType;
}

export const HAS_LOWERCASE_CHARACTERS_ERRORS: HasLowerCaseCharactersErrors =
{
  TARGET_ARGUMENT_NOT_A_STRING: (arr?: string[]) => {
    return `The target argument ${arr![0]} is not a string.`;
  }
};

export function hasLowerCaseCharacters(target : string, min : number) : Result<boolean|undefined>  {
  const regex : RegExp = new RegExp(`([a-z].*){${min},}`);
  
  if (!isString(target).value) 
  {
    return new Result(undefined, HAS_LOWERCASE_CHARACTERS_ERRORS.TARGET_ARGUMENT_NOT_A_STRING, [target])
  }
  
  const result = target.replace(/[^a-z]+/g, "").length >= min
  return new Result(result);
}