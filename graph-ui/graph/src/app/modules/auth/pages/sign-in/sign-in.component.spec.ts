import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignInComponent } from './sign-in.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const EMAIL_SUCCESS: string  = 'email@test.com';
  const EMAIL_FAILED: string  = 'emailtest.com';
  const PASSWORD_SUCCESS: string  = '123456789';
  // let valueServiceMock: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);

    await TestBed.configureTestingModule({
      // providers: [{provide: ValueService, useValue: valueServiceSpy}],
      declarations: [SignInComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule
      ]
    })
    .compileComponents();

    // valueServiceMock = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;

    component.signInform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "Sign In"', () => {
    const _nativeElement: HTMLElement = fixture.nativeElement;
    const titleElement = _nativeElement.querySelector('mat-card-title')!;
    expect(titleElement.textContent).toEqual('Sign In');
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

});
