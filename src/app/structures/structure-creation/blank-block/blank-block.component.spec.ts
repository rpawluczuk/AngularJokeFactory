import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankBlockComponent } from './blank-block.component';

describe('BlankBlockComponent', () => {
  let component: BlankBlockComponent;
  let fixture: ComponentFixture<BlankBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
