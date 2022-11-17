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


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NavbarComponent,
    HomeComponent,
    ManagementComponent,
    StaffComponent,
    DancersComponent,
    ServicesComponent,
    VipComponent,
    BarMenuComponent,
    RulesComponent,
    PartnersComponent,
    DiscordComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
