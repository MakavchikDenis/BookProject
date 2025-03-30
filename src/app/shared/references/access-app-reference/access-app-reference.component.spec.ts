import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAppReferenceComponent } from './access-app-reference.component';

describe('AccessAppReferenceComponent', () => {
  let component: AccessAppReferenceComponent;
  let fixture: ComponentFixture<AccessAppReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessAppReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessAppReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
