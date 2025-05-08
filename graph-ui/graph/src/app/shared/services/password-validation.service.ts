import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { hasLowerCaseCharacters } from '../../core/utilities/password-validators/hasLowerCaseCharacters';
import { hasSpecialCharacters } from '../../core/utilities/password-validators/hasSpecialCharacters';
import { hasNumericCharacters } from '../../core/utilities/password-validators/hasNumericCharacters';
import { hasUpperCaseCharacters } from '../../core/utilities/password-validators/hasUpperCaseCharacters';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {
  
  lowerCaseLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) 
      {
        return null;
      }
      const valid = hasLowerCaseCharacters(control.value, 1).value;
      return valid ? null : { invalidPasswordMinLowerCaseLetters: true };
    };
  }

  specialCharactersLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) 
      {
        return null;
      }

      const valid = hasSpecialCharacters(control.value, 1).value;
      return valid ? null : { invalidPasswordMinSpecialCharactersLetters: true };
    };
  }

  numericCharactersLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) 
      {
        return null;
      }

      const valid = hasNumericCharacters(control.value, 1).value;
      return valid ? null : { invalidPasswordMinNumericCharactersLetters: true };
    };
  }

  upperCaseCharactersLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) 
      {
        return null;
      }

      const valid = hasUpperCaseCharacters(control.value, 1).value;
      return valid ? null : { invalidPasswordMinUpperCaseCharactersLetters: true };
    };
  }

 getPasswordError(abstractControl : AbstractControl) {
    const control: AbstractControl = abstractControl;

    return control.hasError('required')
      ? 'Please enter a valid password'
      : control.hasError('minlength')
      ? 'The minimum password length is 8 characters'
      : control.hasError('maxlength')
      ? 'The maximum password length is 32 characters'
      : control.hasError('invalidPasswordMinLowerCaseLetters')
      ? 'The password must have at least 1 lower case letters [a-z]'
      : control.hasError('invalidPasswordMinSpecialCharactersLetters')
      ? 'The password must have at least 1 special character [#*.!@$%^&(){}[\\]:;<>,.?/~_+\\-=|\\\\]'
      : control.hasError('invalidPasswordMinNumericCharactersLetters')
      ? 'The password must have at least 1 mumeric characters [1-9]'
      : control.hasError('invalidPasswordMinUpperCaseCharactersLetters')
      ? 'The password must have at least 1 uppercase  characters [A-Z]'
      : '';
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) 
      {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) 
      {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) 
      {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } 
      else 
      {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
