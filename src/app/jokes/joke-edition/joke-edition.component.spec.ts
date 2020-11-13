import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeEditionComponent } from './joke-edition.component';

describe('JokeDetailsComponent', () => {
  let component: JokeEditionComponent;
  let fixture: ComponentFixture<JokeEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokeEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
