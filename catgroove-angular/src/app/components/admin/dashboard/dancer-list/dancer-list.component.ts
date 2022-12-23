import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  map
} from 'rxjs';
import {
  DancerService
} from 'src/app/shared/services/firebase/dancer.service';
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
  displayedColumns: string[] = ['name', 'age', 'language', 'nsfw', 'orientation', 'preference', 'services', 'bio/description', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private db: DancerService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditDancerComponent > ) {}
  ngOnInit(): void {
    this.retrieveList();
  }

  refreshList(): void {
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
      this.dataSource.data = data;
    });
  }

  add() {
    this.dialog.open(AddDancerComponent).afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditDancerComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.update(`Updated ${this.type}: ${data.name}`, '');
      }
      this.refreshList();
    });
  }

  delete(data: any) {
    if (data.key) {
      this.db.delete(data.key)
        .then(() => {
          this.snackbar.delete(`Deleted  ${this.type}: ${data.name}`, '');
        })
        .catch(err => console.log(err));
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
