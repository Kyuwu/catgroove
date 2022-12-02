import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DancerCardComponent } from './dancer-card.component';

describe('DancerCardComponent', () => {
  let component: DancerCardComponent;
  let fixture: ComponentFixture<DancerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DancerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DancerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
