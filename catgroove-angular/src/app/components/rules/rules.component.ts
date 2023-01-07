import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Rule from 'src/app/shared/models/rule';
import { RulesService } from 'src/app/shared/services/firebase/rules.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {


  type = "Rules";
  constructor(private db: RulesService) { }
  datas!: Rule[];
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
