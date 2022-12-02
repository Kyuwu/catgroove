import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDancerComponent } from './edit-dancer.component';

describe('EditDancerComponent', () => {
  let component: EditDancerComponent;
  let fixture: ComponentFixture<EditDancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
