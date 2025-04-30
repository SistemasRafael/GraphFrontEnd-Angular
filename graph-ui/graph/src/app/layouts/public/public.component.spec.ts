import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicComponent } from './public.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

describe('PublicComponent', () => {
  let component: PublicComponent;
  let fixture: ComponentFixture<PublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PublicComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
