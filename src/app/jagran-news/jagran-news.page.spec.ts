import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JagranNewsPage } from './jagran-news.page';

describe('JagranNewsPage', () => {
  let component: JagranNewsPage;
  let fixture: ComponentFixture<JagranNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JagranNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JagranNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
