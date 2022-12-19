import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Theme from 'src/app/shared/models/theme';
import { ThemeService } from 'src/app/shared/services/firebase/theme.service';
import { TwitchEmbed, TwitchEmbedLayout } from 'twitch-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }


}
