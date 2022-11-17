import { transition, trigger } from '@angular/animations';
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { right, left, fader, stepper } from 'src/app/shared/util/animation/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navLinks: any[];
  constructor(private router: Router, private route: ActivatedRoute) {
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
        index: 2,
        outlet: 'nav'
      },
      {
        label: 'DANCERS',
        link: 'dancers',
        index: 3,
        outlet: 'nav'
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

  animationState: number = 0;
  // @ts-ignore
  onActivate($event) {
    // @ts-ignore
    this.animationState = this.route.firstChild.snapshot.data['routeIdx'];
  }

  ngOnInit(): void {}

  moveToSelectedTab(link: string) {
    this.router.navigate([link]);
  }

}
