import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSelectedTypesComponent } from './card-selected-types.component';

describe('CardSelectedTypesComponent', () => {
  let component: CardSelectedTypesComponent;
  let fixture: ComponentFixture<CardSelectedTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSelectedTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSelectedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
