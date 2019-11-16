import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDetailPage } from './articles-detail.page';

describe('ArticlesDetailComponent', () => {
  let component: ArticlesDetailPage;
  let fixture: ComponentFixture<ArticlesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
