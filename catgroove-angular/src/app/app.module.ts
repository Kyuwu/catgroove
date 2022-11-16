import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    FlexLayoutModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
