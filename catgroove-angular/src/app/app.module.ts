import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { VerifyComponent } from './components/admin/verify/verify.component';
import { DancerListComponent } from './components/admin/dashboard/dancer-list/dancer-list.component';
import { StaffListComponent } from './components/admin/dashboard/staff-list/staff-list.component';
import { AddDancerComponent } from './components/admin/dashboard/dancer-list/add-dancer/add-dancer.component';
import { EditDancerComponent } from './components/admin/dashboard/dancer-list/edit-dancer/edit-dancer.component';
import { DancerCardComponent } from './components/dancers/dancer-card/dancer-card.component';
import { AddStaffComponent } from './components/admin/dashboard/staff-list/add-staff/add-staff.component';
import { EditStaffComponent } from './components/admin/dashboard/staff-list/edit-staff/edit-staff.component';
import { TwitchComponent } from './components/admin/dashboard/home/twitch/twitch.component';
import { HomeAdminComponent } from './components/admin/dashboard/home/home.component';
import { ManagementListComponent } from './components/admin/dashboard/management-list/management-list.component';
import { AddManagementComponent } from './components/admin/dashboard/management-list/add-management/add-management.component';
import { EditManagementComponent } from './components/admin/dashboard/management-list/edit-management/edit-management.component';
import { AddServiceComponent } from './components/admin/dashboard/services-list/add-service/add-service.component';
import { EditServiceComponent } from './components/admin/dashboard/services-list/edit-service/edit-service.component';
import { ServicesListComponent } from './components/admin/dashboard/services-list/services-list.component';
import { ThemeComponent } from './components/admin/dashboard/home/home-theme/theme.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============
import { Providers } from './provider.module';
import { TwitchPlayerComponent } from './components/home/twitch-player/twitch-player.component';
import { ClubListComponent } from './components/admin/dashboard/staff-list/club-list/club-list.component';
import { AddClubComponent } from './components/admin/dashboard/staff-list/club-list/add-club/add-club.component';
import { EditClubComponent } from './components/admin/dashboard/staff-list/club-list/edit-club/edit-club.component';
import { CustomMaterialComponent } from './shared/components/custom-material/custom-material.component';



@NgModule({
  declarations: [
    //front
    AppComponent,
    LoaderComponent,
    NavbarComponent,
    HomeAdminComponent,
    //navbar
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
    //admin
    HomeComponent,
    TwitchComponent,
    ThemeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    VerifyComponent,
    //dancer
    DancerListComponent,
    AddDancerComponent,
    EditDancerComponent,
    //staff
    ClubListComponent,
    AddClubComponent,
    EditClubComponent,
    StaffListComponent,
    AddStaffComponent,
    EditStaffComponent,
    //management
    ManagementListComponent,
    AddManagementComponent,
    EditManagementComponent,
    //service
    ServicesListComponent,
    AddServiceComponent,
    EditServiceComponent,
    //home
    TwitchPlayerComponent,
    //shared
    CustomMaterialComponent,
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(), // <============ Don't forget to call 'forRoot()'!
    BrowserAnimationsModule,
    FlexLayoutModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,
  ],
  providers: [
    Providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
