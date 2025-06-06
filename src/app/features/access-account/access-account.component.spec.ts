import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAccountComponent } from './access-account.component';

describe('AuthComponent', () => {
  let component: AccessAccountComponent;
  let fixture: ComponentFixture<AccessAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
