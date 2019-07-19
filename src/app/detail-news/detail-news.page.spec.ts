import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNewsPage } from './detail-news.page';

describe('DetailNewsPage', () => {
  let component: DetailNewsPage;
  let fixture: ComponentFixture<DetailNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
