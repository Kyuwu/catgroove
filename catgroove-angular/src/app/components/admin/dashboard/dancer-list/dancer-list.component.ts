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
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import {
  AddDancerComponent
} from './add-dancer/add-dancer.component';
import {
  EditDancerComponent
} from './edit-dancer/edit-dancer.component';
import Dancer from 'src/app/shared/services/dancer';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  SnackbarService
} from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-dancer-list',
  templateUrl: './dancer-list.component.html',
  styleUrls: ['./dancer-list.component.scss']
})
export class DancerListComponent implements AfterViewInit {

  type = "Dancer";
  types = "Dancers";
  currDancer ? : Dancer;
  currIndex = -1;
  displayedColumns: string[] = ['key', 'name', 'age', 'language', 'nsfw', 'orientation', 'sexual preference', 'services', 'bio/description', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private db: DancerService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditDancerComponent > ) {}
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

  add() {
    this.dialog.open(AddDancerComponent).afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  edit(dancer: Dancer) {
    console.log(dancer);
    const dialogRef = this.dialog.open(EditDancerComponent, {
      data: dancer
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.update(`Updated ${this.type}: ${dancer.name}`, '');
      }
      this.refreshList();
    });
  }

  delete(dancer: Dancer) {
    if (dancer.key) {
      this.db.delete(dancer.key)
        .then(() => {
          this.snackbar.delete(`Deleted  ${this.type}: ${dancer.name}`, '');
        })
        .catch(err => console.log(err));
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
