import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snaccy: MatSnackBar) { }
  delete(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
       panelClass: ['red-snackbar-styling']
    });
  }
  edit(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
       panelClass: ['orange-snackbar-styling']
    });
  }
  update(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
       panelClass: ['blue-snackbar-styling']
    });
  }
  add(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
       panelClass: ['green-snackbar-styling']
    });
  }
}
