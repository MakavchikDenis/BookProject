import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAppButtonComponent } from './access-app-button.component';

describe('HomePageComponent', () => {
  let component: AccessAppButtonComponent;
  let fixture: ComponentFixture<AccessAppButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessAppButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessAppButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
