import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import TwitchChannel from 'src/app/shared/models/twitch';
import { TwitchService } from 'src/app/shared/services/firebase/twitch.service';
import { TwitchEmbed, TwitchEmbedLayout } from 'twitch-player';


@Component({
  selector: 'app-twitch-player',
  templateUrl: './twitch-player.component.html',
  styleUrls: ['./twitch-player.component.scss']
})

export class TwitchPlayerComponent implements OnInit {
  data: TwitchChannel[];
  constructor(private db: TwitchService) { 

  }

  ngOnInit(): void {
    this.retrieveList();   
  }

  retrieveList(): void {
    this.db.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      )
    ).subscribe(data => {
      this.data = data
    });
  }
}
