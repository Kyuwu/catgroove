import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchPlayerComponent } from './twitch-player.component';

describe('TwitchPlayerComponent', () => {
  let component: TwitchPlayerComponent;
  let fixture: ComponentFixture<TwitchPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitchPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
