import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Bar from 'src/app/shared/models/bar';
import { BarService } from 'src/app/shared/services/firebase/bar.service';

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.scss']
})
export class BarMenuComponent implements OnInit {

  type = "Bar menu";
  constructor(private db: BarService) { }
  datas!: Bar[];
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
