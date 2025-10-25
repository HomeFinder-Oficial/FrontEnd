import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDashboard } from './properties-dashboard';

describe('PropertiesDashboard', () => {
  let component: PropertiesDashboard;
  let fixture: ComponentFixture<PropertiesDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
