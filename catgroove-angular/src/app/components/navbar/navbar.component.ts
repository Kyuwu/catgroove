import {
  AfterViewInit,
  Component,
  OnInit} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    var nav = $('nav');
    var line = $('<div />').addClass('line');

    line.appendTo(nav);

    var active = nav.find('.active');
    var pos = 0;
    var wid = 0;

    if (active.length) {
      pos = active.position().left;
      wid = active.width();
      line.css({
        left: pos,
        width: wid
      });
    }

    nav.find('ul li a').click(function (e) {
      e.preventDefault();
      if (!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {

        nav.addClass('animate');

        var _this = $(this);

        nav.find('ul li').removeClass('active');

        var position = _this.parent().position();
        var width = _this.parent().width();

        if (position.left >= pos) {
          line.animate({
            width: ((position.left - pos) + width)
          }, 300, function () {
            line.animate({
              width: width,
              left: position.left
            }, 150, function () {
              nav.removeClass('animate');
            });
            _this.parent().addClass('active');
          });
        } else {
          line.animate({
            left: position.left,
            width: ((pos - position.left) + wid)
          }, 300, function () {
            line.animate({
              width: width
            }, 150, function () {
              nav.removeClass('animate');
            });
            _this.parent().addClass('active');
          });
        }

        pos = position.left;
        wid = width;
      }
    });
  }

  moveToSelectedTab(link: string) {
    this.router.navigate([link]);
  }

}
