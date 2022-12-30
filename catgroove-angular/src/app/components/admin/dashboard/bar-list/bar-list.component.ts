import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { BarService } from 'src/app/shared/services/firebase/bar.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddBarComponent } from './add-bar/add-bar.component';
import { EditBarComponent } from './edit-bar/edit-bar.component';

@Component({
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss']
})
export class BarListComponent implements OnInit {

  type = "Recipe";
  types = "Barmenu";
  displayedColumns: string[] = ['name', 'description','recipe','price', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private db: BarService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditBarComponent > ) {}
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
    this.dialog.open(AddBarComponent).afterClosed().subscribe(result => {
      this.refreshList();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditBarComponent, {
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
      this.db.delete(data.key, data.name)
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
