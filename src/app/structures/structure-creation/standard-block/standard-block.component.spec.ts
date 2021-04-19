import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardBlockComponent } from './standard-block.component';

describe('StandardBlockComponent', () => {
  let component: StandardBlockComponent;
  let fixture: ComponentFixture<StandardBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
