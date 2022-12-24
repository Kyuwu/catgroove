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
  player;
  constructor(private db: TwitchService) { 

  }

  ngOnInit(): void {
    this.retrieveList();   
    this.player == new TwitchEmbed("player",{
      width: 1280,
      height: 720,
      channel: 'kyuwu'
    });
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
      console.log(data);
        // const embed = new TwitchEmbed('player', {
        //   width: 1280,
        //   height: 720,
        //   channel: `${data[0].channel}`,
        //   layout: TwitchEmbedLayout.VIDEO_WITH_CHAT
        // });
    });
  }
  setPlayer(data: string) {
    this.player.setChannel(data)
  }
}
