import { MessageFunctionType } from '../../types/MessageFunctionType';
import { Result } from './Result';
import { isString } from './isString';

export interface HasNumericCharactersErrors {
  TARGET_ARGUMENT_NOT_A_STRING: MessageFunctionType;
}

export const HAS_NUMERIC_CHARACTERS_ERRORS: HasNumericCharactersErrors =
{
  TARGET_ARGUMENT_NOT_A_STRING: (arr?: string[]) => {
    return `The target argument ${arr![0]} is not a string.`;
  }
};

export function hasNumericCharacters(target:string, min:number):Result<boolean|undefined>  {
  if (!isString(target).value) 
  {
    return new Result(undefined, HAS_NUMERIC_CHARACTERS_ERRORS.TARGET_ARGUMENT_NOT_A_STRING, [target])
  }
  
  const stripped = target.replace(/\D+/g, "")
  return stripped.length >= min ? new Result(true) : new Result(false) 
}