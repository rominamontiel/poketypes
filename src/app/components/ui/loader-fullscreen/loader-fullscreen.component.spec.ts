import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderFullscreenComponent } from './loader-fullscreen.component';

describe('LoaderFullscreenComponent', () => {
  let component: LoaderFullscreenComponent;
  let fixture: ComponentFixture<LoaderFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderFullscreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
