import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTypeViewComponent } from './my-type-view.component';

describe('MyTypeViewComponent', () => {
  let component: MyTypeViewComponent;
  let fixture: ComponentFixture<MyTypeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTypeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
