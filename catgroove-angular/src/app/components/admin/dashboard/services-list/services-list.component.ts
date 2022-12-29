import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { ServicesService } from 'src/app/shared/services/firebase/services.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  type = "Service";
  types = "Services";
  displayedColumns: string[] = ['title', 'description', 'reminder', 'price', 'minutes', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private db: ServicesService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditServiceComponent > ) {}
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
    const dialogRef = this.dialog.open(AddServiceComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.add(`Added ${this.type}`, '');
      }
      this.refreshList();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.update(`Updated ${this.type}: ${data.title}`, '');
      }
      this.refreshList();
    });
  }

  delete(data: any) {
    if (data.key) {
      this.db.delete(data.key, data.name)
        .then(() => {
          this.snackbar.delete(`Deleted  ${this.type}: ${data.title}`, '');
        })
        .catch(err => console.log(err));
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
