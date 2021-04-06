import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesPaginationComponent } from './jokes-pagination.component';

describe('JokesPaginationComponent', () => {
  let component: JokesPaginationComponent;
  let fixture: ComponentFixture<JokesPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokesPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
