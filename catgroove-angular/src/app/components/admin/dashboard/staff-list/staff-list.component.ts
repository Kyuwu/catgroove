import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import Club from 'src/app/shared/models/club';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  type = "Staff";
  types = "Staff";
  clubs: Club[];
  displayedColumns: string[] = ['club', 'name', 'role', 'bio', 'action'];
  dataSource = new MatTableDataSource();
  constructor(public db: StaffService, public club: ClubService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditStaffComponent > ) { }
  ngOnInit(): void {
    this.club.setClubs();
    this.retrieveList();
  }

  refreshList(): void {
    this.retrieveList();
    // this.applyFilter("Spectrum");
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
      this.dataSource.data = data;
    });
  }

  retrieveClubs(): void {
    this.club.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      )
    ).subscribe(data => {
      this.clubs = data;
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddStaffComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.add(`Added ${this.type}`, '');
      }
      this.refreshList();
    });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditStaffComponent, {
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
