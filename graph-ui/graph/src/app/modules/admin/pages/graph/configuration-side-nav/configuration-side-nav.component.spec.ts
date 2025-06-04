import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSideNavComponent } from './configuration-side-nav.component';

describe('ConfigurationSideNavComponent', () => {
  let component: ConfigurationSideNavComponent;
  let fixture: ComponentFixture<ConfigurationSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSideNavComponent]
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
