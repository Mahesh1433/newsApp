import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoeryPage } from './news-categoery.page';

describe('NewsCategoeryPage', () => {
  let component: NewsCategoeryPage;
  let fixture: ComponentFixture<NewsCategoeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCategoeryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCategoeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
