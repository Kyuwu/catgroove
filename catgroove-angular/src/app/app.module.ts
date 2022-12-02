import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ManagementComponent } from './components/management/management.component';
import { StaffComponent } from './components/staff/staff.component';
import { DancersComponent } from './components/dancers/dancers.component';
import { ServicesComponent } from './components/services/services.component';
import { VipComponent } from './components/vip/vip.component';
import { BarMenuComponent } from './components/bar-menu/bar-menu.component';
import { RulesComponent } from './components/rules/rules.component';
import { PartnersComponent } from './components/partners/partners.component';
import { DiscordComponent } from './components/discord/discord.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-mat.module';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { VerifyComponent } from './components/admin/verify/verify.component';
import { DancerListComponent } from './components/admin/dashboard/dancer-list/dancer-list.component';
import { StaffListComponent } from './components/admin/dashboard/staff-list/staff-list.component';
import { AddDancerComponent } from './components/admin/dashboard/dancer-list/add-dancer/add-dancer.component';
import { DancerService } from './shared/services/dancer.service';
import { EditDancerComponent } from './components/admin/dashboard/dancer-list/edit-dancer/edit-dancer.component';
import { DancerCardComponent } from './components/dancers/dancer-card/dancer-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NavbarComponent,
    HomeComponent,
    ManagementComponent,
    StaffComponent,
    DancersComponent,
    DancerCardComponent,
    ServicesComponent,
    VipComponent,
    BarMenuComponent,
    RulesComponent,
    PartnersComponent,
    DiscordComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    VerifyComponent,
    DancerListComponent,
    AddDancerComponent,
    EditDancerComponent,
    StaffListComponent
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,
  ],
  providers: [AuthService, DancerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
