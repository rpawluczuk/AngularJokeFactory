import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCreationComponent } from './author-creation.component';

describe('AuthorCreationComponent', () => {
  let component: AuthorCreationComponent;
  let fixture: ComponentFixture<AuthorCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
