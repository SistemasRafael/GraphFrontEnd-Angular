import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignInComponent } from './sign-in.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../shared/services/auth.service';

describe('SignInComponent', () => {
  const EMAIL_SUCCESS: string  = 'email@test.com';
  const EMAIL_FAILED: string  = 'emailtest.com';
  const PASSWORD_SUCCESS: string  = '123456789';

  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignInComponent
      ],
      imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    })
    .compileComponents();
    
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;

    component.signInform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    });
    
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "Sign In"', () => {
    const _nativeElement: HTMLElement = fixture.debugElement.query(By.css('#' + component.Title_Id)).nativeElement;
    expect(_nativeElement.textContent).toEqual('Sign In');
  });

  it('email value should be successs', () => {
    let input = fixture.debugElement.query(By.css('#' + component.Email_Id));
    let el = input.nativeElement;
    el.value = EMAIL_SUCCESS;
    el.dispatchEvent(new Event('input'));
    
    expect(component.signInform.get('email')?.value).toBe(EMAIL_SUCCESS);
  });

  it('email value should be wrong', () => {
    let input = fixture.debugElement.query(By.css('#' + component.Email_Id));
    let el = input.nativeElement;
    el.value = EMAIL_FAILED;
    el.dispatchEvent(new Event('input'));

    const nameControl = component.signInform.get('email');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    const matError = fixture.nativeElement.querySelector('mat-error');
    expect(matError).toBeTruthy();
    expect(matError.textContent).toBe('Please enter a valid email address');
  });

  it('email value should be null', () => {
    let input = fixture.debugElement.query(By.css('#' + component.Email_Id));
    let el = input.nativeElement;
    el.value = null;
    el.dispatchEvent(new Event('input'));

    const nameControl = component.signInform.get('email');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    const matError = fixture.nativeElement.querySelector('mat-error');
    expect(matError).toBeTruthy();
    expect(matError.textContent).toContain('This field is required');
  });

  it('password value should be successs', () => {
    let input = fixture.debugElement.query(By.css('#' + component.Password_Id));
    let el = input.nativeElement;
    el.value = PASSWORD_SUCCESS;
    el.dispatchEvent(new Event('input'));

    expect(component.signInform.get('password')?.value).toBe(PASSWORD_SUCCESS);
  });

  it('password value should be null', () => {
    let input = fixture.debugElement.query(By.css('#' + component.Password_Id));
    let el = input.nativeElement;
    el.value = null;
    el.dispatchEvent(new Event('input'));

    const nameControl = component.signInform.get('password');
    nameControl?.markAsTouched();
    fixture.detectChanges();
  
    const matError = fixture.nativeElement.querySelector('mat-error');
    expect(matError).toBeTruthy();
    expect(matError.textContent).toContain('This field is required');
  });

  it('should send a login request', () => {
    let elementEmail = fixture.debugElement.query(By.css('#' + component.Email_Id)).nativeElement;
    elementEmail.value = EMAIL_SUCCESS;
    elementEmail.dispatchEvent(new Event('input'));

    let elemenetPassword = fixture.debugElement.query(By.css('#' + component.Password_Id)).nativeElement;
    elemenetPassword.value = PASSWORD_SUCCESS;
    elemenetPassword.dispatchEvent(new Event('input'));

    const emailControl = component.signInform.get('email');
    const passwordControl = component.signInform.get('password');
    emailControl?.markAsTouched();
    passwordControl?.markAsTouched();

    fixture.detectChanges();

    spyOn(component, 'onSignIn');
    const element = fixture.debugElement.nativeElement.querySelector("#" + component.SignIn_button_Id);
    element.click();

    expect(element).toBeTruthy();
    expect(element.textContent).toContain('Sign In');
    expect(component.onSignIn).toHaveBeenCalled();
  });

});
