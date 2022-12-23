import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { ManagementService } from 'src/app/shared/services/firebase/management.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddManagementComponent } from './add-management/add-management.component';
import { EditManagementComponent } from './edit-management/edit-management.component';

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.scss']
})
export class ManagementListComponent implements OnInit {

  type = "Management";
  types = "Management";
  displayedColumns: string[] = ['name', 'role', 'bio', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private db: ManagementService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditManagementComponent > ) {}
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
    const dialogRef = this.dialog.open(AddManagementComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.add(`Added ${this.type}`, '');
      }
      this.refreshList();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditManagementComponent, {
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
