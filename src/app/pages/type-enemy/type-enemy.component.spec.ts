import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEnemyComponent } from './type-enemy.component';

describe('TypeEnemyComponent', () => {
  let component: TypeEnemyComponent;
  let fixture: ComponentFixture<TypeEnemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEnemyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
