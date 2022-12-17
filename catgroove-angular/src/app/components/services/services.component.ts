import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Service from 'src/app/shared/models/service';
import { ServicesService } from 'src/app/shared/services/firebase/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  type = "Services";
  constructor(private db: ServicesService) { }
  datas!: Service[];
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
