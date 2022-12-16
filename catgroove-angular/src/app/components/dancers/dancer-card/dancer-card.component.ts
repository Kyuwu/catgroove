import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import Dancer from 'src/app/shared/models/dancer';

@Component({
  selector: 'app-dancer-card',
  templateUrl: './dancer-card.component.html',
  styleUrls: ['./dancer-card.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class DancerCardComponent implements OnInit {
  @Input() dancer!: Dancer;
  constructor() { }

  ngOnInit(): void {
  }
  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}
