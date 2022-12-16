import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Dancer from 'src/app/shared/models/dancer';
import { DancerService } from 'src/app/shared/services/firebase/dancer.service';

@Component({
  selector: 'app-dancers',
  templateUrl: './dancers.component.html',
  styleUrls: ['./dancers.component.scss'],
})
export class DancersComponent implements OnInit {

  constructor(private db: DancerService) { }
  dancers!: Dancer[];
  ngOnInit(): void {
    this.retrieveDancers();
  }

  retrieveDancers(): void {
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
        this.dancers = data;
    });
  }

}
