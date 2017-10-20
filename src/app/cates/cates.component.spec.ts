import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatesComponent } from './cates.component';

describe('CatesComponent', () => {
  let component: CatesComponent;
  let fixture: ComponentFixture<CatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
