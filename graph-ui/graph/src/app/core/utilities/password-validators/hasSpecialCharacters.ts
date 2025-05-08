import { MessageFunctionType } from '../../types/MessageFunctionType';
import { Result } from './Result';
import { isString } from './isString';

export interface HasSpecialCharactersErrors {
  TARGET_ARGUMENT_NOT_A_STRING: MessageFunctionType;
}

export const HAS_SPECIAL_CHARACTERS_ERRORS: HasSpecialCharactersErrors =
{
  TARGET_ARGUMENT_NOT_A_STRING: (arr?: string[]) => {
    return `The target argument ${arr![0]} is not a string.`;
  }
};

export function hasSpecialCharacters(target : string, min : number) : Result<boolean|undefined>  {
  const regex = RegExp(`([#*.!@$%^&(){}[\\]:;<>,.?/~_+\\-=|\\\\].*){${min},}`);

  if (!isString(target).value) 
  {
    return new Result(undefined, HAS_SPECIAL_CHARACTERS_ERRORS.TARGET_ARGUMENT_NOT_A_STRING, [target])
  }
  return new Result((regex.test(target)));
}