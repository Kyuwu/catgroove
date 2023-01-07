import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Partner from 'src/app/shared/models/partner';
import { PartnersService } from 'src/app/shared/services/firebase/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  type = "Partners";
  constructor(private db: PartnersService) { }
  datas!: Partner[];
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
