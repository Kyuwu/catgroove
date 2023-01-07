import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Vip from 'src/app/shared/models/vip';
import { VipService } from 'src/app/shared/services/firebase/vip.service';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.scss']
})
export class VipComponent implements OnInit {

  type = "VIP";
  constructor(private db: VipService) { }
  datas!: Vip[];
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
