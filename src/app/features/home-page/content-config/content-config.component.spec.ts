import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConfigComponent } from './content-config.component';

describe('ChangeStateHomePageComponent', () => {
  let component: ContentConfigComponent;
  let fixture: ComponentFixture<ContentConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
