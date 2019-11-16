import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlocksComponent } from './content-blocks.component';

describe('ContentBlocksComponent', () => {
  let component: ContentBlocksComponent;
  let fixture: ComponentFixture<ContentBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
