import { Component, inject   } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  public readonly Title_Id : string = 'Title-Id';
  public readonly Email_Id : string = 'Email-Id';
  public readonly Password_Id : string = 'Password-Id';
  public readonly SignIn_button_Id : string = 'Sign-In-Button-Id';
  

  public signInform: FormGroup;
  public hidePassword = true;
  public matcher = new MyErrorStateMatcher();

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.signInform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    });
  }

  onSignIn(): void {
    const email : string = this.signInform.get('email')?.value;
    const password : string = this.signInform.get('password')?.value;
    
    this.authService.signIn(email, password).subscribe((userData : User) => {
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
