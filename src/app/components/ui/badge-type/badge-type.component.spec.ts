import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeTypeComponent } from './badge-type.component';

describe('BadgeTypeComponent', () => {
  let component: BadgeTypeComponent;
  let fixture: ComponentFixture<BadgeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
