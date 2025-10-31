import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomProperties } from './random-properties.component';

describe('RandomProperties', () => {
  let component: RandomProperties;
  let fixture: ComponentFixture<RandomProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomProperties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
