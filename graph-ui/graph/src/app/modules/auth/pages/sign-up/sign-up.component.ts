import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidationService } from '../../../../shared/services/password-validation.service';
import { User } from '../../../../core/models/user.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  public readonly Title_Id : string = 'Title-Id';
  public readonly Email_Id : string = 'Email-Id';
  public readonly Password_Id : string = 'Password-Id';
  public readonly Confirm_Password_Id : string = 'Confirm_Password-Id';
  public readonly nameMaxLength : number = 250;
  public readonly lastNameMaxLength : number = 250;
  public readonly emailMaxLength : number = 100;
  public readonly passwordMaxLength : number = 100;

  public signUpform: FormGroup;
  public hidePassword = true;
  public hideConfirmPassword = true;
  public matcher = new MyErrorStateMatcher();

  private authService = inject(AuthService);
  private router = inject(Router);
  public passwordValidationService = inject(PasswordValidationService);
  

  get nameControl(): AbstractControl {
    return this.signUpform.get('name')!;
  }

  get lastNameControl(): AbstractControl {
    return this.signUpform.get('lastName')!;
  }

  get emailControl(): AbstractControl {
    return this.signUpform.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.signUpform.get('password')!;
  }

  get confirmPasswordControl(): AbstractControl {
    return this.signUpform.get('confirmPassword')!;
  }

  constructor() {
    this.signUpform = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.maxLength(this.nameMaxLength)]),
      lastName: new FormControl<string | null>('', Validators.maxLength(this.lastNameMaxLength)),
      age: new FormControl<number | null>(null),
      email: new FormControl<string>('', [Validators.required, Validators.email, Validators.maxLength(this.emailMaxLength)]),
      password: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(this.passwordMaxLength),
        this.passwordValidationService.lowerCaseLettersValidator(),
        this.passwordValidationService.specialCharactersLettersValidator(),
        this.passwordValidationService.numericCharactersLettersValidator(),
        this.passwordValidationService.upperCaseCharactersLettersValidator()
        
      ]),
      confirmPassword: new FormControl<string>('', Validators.compose([Validators.required]))
    },
    this.passwordValidationService.passwordMatch('password', 'confirmPassword'));
  }

  ngOnInit(): void {
    this.signUpform.markAllAsTouched();
  }

  onCreate(): void {
    const user = {
      name : this.signUpform.get('name')?.value,
      lastName : this.signUpform.get('lastName')?.value,
      age : this.signUpform.get('age')?.value,
      email : this.signUpform.get('email')?.value,
      password : this.signUpform.get('password')?.value
    } as User;
    
    this.authService.signUp(user).subscribe((userData : User) => {
      this.router.navigate(['admin/dashboard']);
    });
  }
}
