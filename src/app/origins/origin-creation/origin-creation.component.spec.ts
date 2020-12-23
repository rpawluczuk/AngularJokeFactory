import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginCreationComponent } from './origin-creation.component';

describe('OriginCreationComponent', () => {
  let component: OriginCreationComponent;
  let fixture: ComponentFixture<OriginCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
