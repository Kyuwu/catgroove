import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDancerComponent } from './add-dancer.component';

describe('AddDancerComponent', () => {
  let component: AddDancerComponent;
  let fixture: ComponentFixture<AddDancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
