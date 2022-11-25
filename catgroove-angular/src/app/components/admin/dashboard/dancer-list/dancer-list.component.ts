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
import { MatDialog } from '@angular/material/dialog';
import { AddDancerComponent } from './add-dancer/add-dancer.component';
import Dancer from 'src/app/shared/services/dancer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dancer-list',
  templateUrl: './dancer-list.component.html',
  styleUrls: ['./dancer-list.component.scss']
})
export class DancerListComponent implements AfterViewInit {

  currDancer ? : Dancer;
  currIndex = -1;
  displayedColumns: string[] = ['key', 'name', 'age', 'language', 'nsfw', 'orientation', 'sexual preference', 'services', 'bio/description','action'];
  dataSource = new MatTableDataSource();
  constructor(private db: DancerService, public dialog: MatDialog, public snackbar: MatSnackBar) {
    // this.dataToDisplay.push(this.db.object('tutorial'));
  }
  submit() {
    dancer: Dancer
    this.db.create({
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

  add(element: number) {
    this.dialog.open(AddDancerComponent, {
      data: { user: this },
    }).afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  edit(element: number) {
    this.dialog.open(AddDancerComponent, {
      data: { user: this },
    }).afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  delete(dancer: Dancer) {
    if (dancer.key) {
      this.db.delete(dancer.key)
        .then(() => {
          this.snackbar.open("Deleted");
        })
        .catch(err => console.log(err));
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
