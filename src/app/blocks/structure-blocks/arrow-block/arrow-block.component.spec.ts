import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowBlockComponent } from './arrow-block.component';

describe('ArrowBlockComponent', () => {
  let component: ArrowBlockComponent;
  let fixture: ComponentFixture<ArrowBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
