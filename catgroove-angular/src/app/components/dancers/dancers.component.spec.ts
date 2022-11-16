import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DancersComponent } from './dancers.component';

describe('DancersComponent', () => {
  let component: DancersComponent;
  let fixture: ComponentFixture<DancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DancersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
