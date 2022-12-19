import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  state = 'home';
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
  }
}
