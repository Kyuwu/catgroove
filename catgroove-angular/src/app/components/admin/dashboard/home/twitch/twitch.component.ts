import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import TwitchChannel from 'src/app/shared/models/twitch';
import { TwitchService } from 'src/app/shared/services/firebase/twitch.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class TwitchComponent implements OnInit {
  
  add: FormGroup;
  data: TwitchChannel;
  constructor(private db: TwitchService, public snackbar: SnackbarService, public fb: FormBuilder) {    
    this.add = this.fb.group({
      channel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.retrieveList();
  }

  refreshList(): void {
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
      this.add.controls['channel'].setValue(data[0].channel);
      this.data = data[0];
    });
  }

  submit() {
    this.db.update(this.data.key, this.add.value);
    this.snackbar.update(`Updated the current channel to: ${this.add.controls['channel'].value}`,'');
  }
}
