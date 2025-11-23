import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurLightComponent } from './blur-light.component';

describe('BlurLightComponent', () => {
  let component: BlurLightComponent;
  let fixture: ComponentFixture<BlurLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlurLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
