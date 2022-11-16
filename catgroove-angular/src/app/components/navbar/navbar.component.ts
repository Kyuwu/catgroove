import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navLinks: any[];
  constructor() {
    this.navLinks = [{
        label: 'HOME',
        link: 'home',
        index: 0
      }, {
        label: 'MANAGEMENT',
        link: 'management',
        index: 1
      }, {
        label: 'STAFF',
        link: 'staff',
        index: 2
      },
      {
        label: 'DANCERS',
        link: 'dancers',
        index: 3
      },
      {
        label: 'SERVICES',
        link: 'services',
        index: 4
      },
      {
        label: 'VIP',
        link: 'vip',
        index: 4
      },
      {
        label: 'BAR MENU',
        link: 'bar-menu',
        index: 4
      },
      {
        label: 'RULES',
        link: 'rules',
        index: 4
      },
      {
        label: 'PARTNERS',
        link: 'partners',
        index: 4
      },
      {
        label: 'JOIN DISCORD',
        link: 'discord',
        index: 4
      },
    ];
  }

  ngOnInit(): void {}

}
