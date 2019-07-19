import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsByCategoeryPage } from './news-by-categoery.page';

describe('NewsByCategoeryPage', () => {
  let component: NewsByCategoeryPage;
  let fixture: ComponentFixture<NewsByCategoeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsByCategoeryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsByCategoeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
