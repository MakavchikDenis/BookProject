import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateHomePageComponent } from './change-state-home-page.component';

describe('ChangeStateHomePageComponent', () => {
  let component: ChangeStateHomePageComponent;
  let fixture: ComponentFixture<ChangeStateHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStateHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStateHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
