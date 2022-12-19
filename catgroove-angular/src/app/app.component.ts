import { LocationStrategy } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { stepper } from './shared/util/animation/animations';
import { Spinkit } from 'ng-http-loader';
import { LoaderService } from './shared/services/spinner/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ // <-- add your animations here
  stepper
    // slider,
    // transformer,
  ],
})

export class AppComponent {
  title = 'catgroove-angular';

  private subscription: Subscription | undefined;
  private timer: Observable<any> | undefined;

  public spinkit = Spinkit;
  showLoader = true;

  constructor(public loaderService: LoaderService, public router: Router, public authService: AuthService, private changeDetector: ChangeDetectorRef, public url: LocationStrategy) {}

  ngOnInit(): void {
    // this.setTimer();
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }

  // ngOnDestroy() {
  //   if ( this.subscription && this.subscription instanceof Subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }
  
  // public setTimer(){
  //   this.showLoader = true;
  //   this.timer = timer(2000); 
  //   this.subscription = this.timer.subscribe(() => {
  //       this.showLoader = false;
  //   });
  // }
}

