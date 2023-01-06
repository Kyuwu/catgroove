import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule, MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  OverlayModule,
  PortalModule,
  MatTooltipModule,
  MatDialogModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  imports: [
    CommonModule,
    materialModules
  ],
  exports: [
    materialModules,
  ],
  providers: [
    MatSnackBarConfig,
    { 
      provide: MatDialogRef,
      useValue: []
       }, 
      { 
      provide: MAT_DIALOG_DATA, 
      useValue: [] 
      }
  ]
})
export class AngularMaterialModule { }
