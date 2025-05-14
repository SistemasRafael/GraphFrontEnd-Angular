import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public readonly nameMaxLength : number = 250;
  public readonly lastNameMaxLength : number = 250;
  public readonly emailMaxLength : number = 100;
  public readonly passwordMaxLength : number = 100;
  public readonly Title_Id : string = 'Title-Id';
  public readonly Email_Id : string = 'Email-Id';
  public readonly Password_Id : string = 'Password-Id';
  public readonly Confirm_Password_Id : string = 'Confirm_Password-Id';
  public hidePassword = true;
  public hideConfirmPassword = true;
  public profileForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  private userService = inject(UserService);
  private authService = inject(AuthService);

   get nameControl(): AbstractControl {
    return this.profileForm.get('name')!;
  }

  get lastNameControl(): AbstractControl {
    return this.profileForm.get('lastName')!;
  }

  get emailControl(): AbstractControl {
    return this.profileForm.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.profileForm.get('password')!;
  }

  get confirmPasswordControl(): AbstractControl {
    return this.profileForm.get('confirmPassword')!;
  }
  
  constructor() {
    this.profileForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.maxLength(this.nameMaxLength)]),
      lastName: new FormControl<string | null>('', Validators.maxLength(this.lastNameMaxLength)),
      age: new FormControl<number | null>(null),
      email: new FormControl<string>('', [
        Validators.required, Validators.email, 
        Validators.maxLength(this.emailMaxLength),
        
      ]),
    });
  }

  ngOnInit(){
    const userId = this.authService.getUserId()!;
    this.userService.getByUserId(userId).subscribe((user: User) => {
      this.setValuesToFormGroup(user);
    });
  }

  private setValuesToFormGroup(user : User){
    this.profileForm.get('name')!.setValue(user.name);
    this.profileForm.get('lastName')!.setValue(user.lastName);
    this.profileForm.get('age')!.setValue(user.age);
    this.profileForm.get('email')!.setValue(user.email);
  }
}
