import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleButton } from './capsule-button';

describe('CapsuleButton', () => {
  let component: CapsuleButton;
  let fixture: ComponentFixture<CapsuleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapsuleButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapsuleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
