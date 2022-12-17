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
  type = "Dancers";
  constructor(private db: DancerService) { }
  datas!: Dancer[];
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
      console.log(data);
        this.datas = data;
    });
  }

}
