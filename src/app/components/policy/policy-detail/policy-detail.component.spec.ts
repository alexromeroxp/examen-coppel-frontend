import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailComponent } from './policy-detail.component';

describe('PolicyDetailComponent', () => {
  let component: PolicyDetailComponent;
  let fixture: ComponentFixture<PolicyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDetailComponent]
    });
    fixture = TestBed.createComponent(PolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
