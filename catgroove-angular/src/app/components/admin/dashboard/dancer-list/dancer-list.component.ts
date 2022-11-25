import {
  DataSource
} from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AngularFireDatabase
} from '@angular/fire/compat/database';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  map,
  Observable,
  ReplaySubject
} from 'rxjs';
import {
  DancerService
} from 'src/app/shared/services/dancer.service';
import {
  Dancer
} from 'src/app/shared/services/dancer';


const dancers: Dancer[] = [{}];
const dancers2: Dancer[] = [{ key: "1",
name: 'Chocola',
age: 22,
language: 'Dutch/English',
nsfw: true,
orientation: "Bisexual",
pref: "Giga sub",
services: "all services",
bio: "kitten that wants to be filled"}];


@Component({
  selector: 'app-dancer-list',
  templateUrl: './dancer-list.component.html',
  styleUrls: ['./dancer-list.component.scss']
})
export class DancerListComponent implements AfterViewInit {

  currDancer ? : Dancer;
  currIndex = -1;
  displayedColumns: string[] = ['key', 'name', 'age', 'language', 'nsfw', 'orientation', 'sexual preference', 'services', 'bio/description'];
  dataSource = new MatTableDataSource();
  constructor(private db: DancerService, private changeDetectorRefs: ChangeDetectorRef) {
    // this.dataToDisplay.push(this.db.object('tutorial'));
  }

  submit() {
    this.db.create({
      key: "1",
      name: 'Chocola',
      age: 22,
      language: 'Dutch/English',
      nsfw: true,
      orientation: "Bisexual",
      pref: "Giga sub",
      services: "all services",
      bio: "kitten that wants to be filled"
    });
  }
  ngOnInit(): void {
    this.retrieveDancers();
  }

  refreshList(): void {
    this.currDancer = undefined;
    this.currIndex = -1;
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
        this.dataSource.data = data;
    });
  }

  // add() {
  //   this.dialog.open(LanguageAddComponent, {
  //     data: { user: this.user },
  //   }).afterClosed().subscribe(result => {
  //     this.refresh();
  //   });
  // }

  setActiveDancer(dancer: Dancer, index: number): void {
    this.currDancer = dancer;
    this.currIndex = index;
  }

  removeAllDancers(): void {
    this.db.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
