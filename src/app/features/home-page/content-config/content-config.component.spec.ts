import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConfigComponent } from './content-config.component';

describe('ChangeStateHomePageComponent', () => {
  let component: ConfigContentComponent;
  let fixture: ComponentFixture<ConfigContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
