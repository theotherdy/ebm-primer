import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NnttComponent } from './nntt.component';

describe('NnttComponent', () => {
  let component: NnttComponent;
  let fixture: ComponentFixture<NnttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NnttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NnttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
