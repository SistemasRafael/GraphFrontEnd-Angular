import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { ConfigurationSideNavComponent } from './configuration-side-nav.component';
import {MatTabsModule} from '@angular/material/tabs';

describe('ConfigurationSideNavComponent', () => {
  let component: ConfigurationSideNavComponent;
  let fixture: ComponentFixture<ConfigurationSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ConfigurationSideNavComponent
      ],
      imports: [
        MatTabsModule,
        MatSlideToggleModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
