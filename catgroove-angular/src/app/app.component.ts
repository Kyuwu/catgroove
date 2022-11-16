import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catgroove-angular';
  private subscription: Subscription | undefined;
  private timer: Observable<any> | undefined;
  showLoader = true;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.setTimer();
  }
  ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  public setTimer(){
    this.showLoader = true;
    this.timer = timer(2000); 
    this.subscription = this.timer.subscribe(() => {
        this.showLoader = false;
    });
  }
}

