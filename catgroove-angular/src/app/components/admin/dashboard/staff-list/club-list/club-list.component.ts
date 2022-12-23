import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import Staff from 'src/app/shared/models/staff';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddClubComponent } from './add-club/add-club.component';
import { EditClubComponent } from './edit-club/edit-club.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {

  type = "Club";
  types = "Clubs";
  merged = '';
  staffList: any;
  displayedColumns: string[] = ['name', 'location', 'description', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private db: ClubService, public dialog: MatDialog, public snackbar: SnackbarService, public dialogRef: MatDialogRef < EditClubComponent > ) {}
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
    const dialogRef = this.dialog.open(AddClubComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.add(`Added ${this.type}`, '');
      }
      this.refreshList();
    });
  }
  set(data: any) {
    this.staffList = data;
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(EditClubComponent, {
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
