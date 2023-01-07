import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Club from 'src/app/shared/models/club';
import { ClubService } from 'src/app/shared/services/firebase/club.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  type = "Clubs/staff";
  constructor(private db: ClubService) { }
  datas!: Club[];
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
