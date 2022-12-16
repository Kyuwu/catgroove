import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingIndicatorService } from 'src/app/shared/services/spinner/loading-indicator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  state = 'staff';
  loading: boolean = false;
  constructor(public authService: AuthService, private loadingIndicatorService: LoadingIndicatorService
    ) {
      // change isLoading status whenever notified
      loadingIndicatorService.onLoadingChanged.subscribe(
        (isLoading) => (this.loading = isLoading)
      );
    }

  ngOnInit(): void {
  }

}
