import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeCreationComponent } from './joke-creation.component';

describe('JokeCreationComponent', () => {
  let component: JokeCreationComponent;
  let fixture: ComponentFixture<JokeCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokeCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
