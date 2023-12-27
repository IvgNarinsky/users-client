import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyModalComponent } from './verify-modal.component';

describe('VerifyModalComponent', () => {
  let component: VerifyModalComponent;
  let fixture: ComponentFixture<VerifyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyModalComponent]
    });
    fixture = TestBed.createComponent(VerifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
