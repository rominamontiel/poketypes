import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAvoidListComponent } from './card-avoid-list.component';

describe('CardAvoidListComponent', () => {
  let component: CardAvoidListComponent;
  let fixture: ComponentFixture<CardAvoidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAvoidListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAvoidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
