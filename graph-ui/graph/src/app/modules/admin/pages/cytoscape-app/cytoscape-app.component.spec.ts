import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapeAppComponent } from './cytoscape-app.component';

describe('CytoscapeAppComponent', () => {
  let component: CytoscapeAppComponent;
  let fixture: ComponentFixture<CytoscapeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CytoscapeAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CytoscapeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
