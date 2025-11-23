import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecommendedListComponent } from './card-recommended-list.component';

describe('CardRecommendedListComponent', () => {
  let component: CardRecommendedListComponent;
  let fixture: ComponentFixture<CardRecommendedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecommendedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecommendedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
