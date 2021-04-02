import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesMainViewComponent } from './jokes-main-view.component';

describe('JokesMainViewComponent', () => {
  let component: JokesMainViewComponent;
  let fixture: ComponentFixture<JokesMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokesMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
