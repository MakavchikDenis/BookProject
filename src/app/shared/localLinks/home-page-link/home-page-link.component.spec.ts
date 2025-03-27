import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageLinkComponent } from './home-page-link.component';

describe('HomePageLinkComponent', () => {
  let component: HomePageLinkComponent;
  let fixture: ComponentFixture<HomePageLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
