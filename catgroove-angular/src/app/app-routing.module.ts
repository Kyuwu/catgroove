import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarMenuComponent } from './components/bar-menu/bar-menu.component';
import { DancersComponent } from './components/dancers/dancers.component';
import { DiscordComponent } from './components/discord/discord.component';
import { HomeComponent } from './components/home/home.component';
import { ManagementComponent } from './components/management/management.component';
import { PartnersComponent } from './components/partners/partners.component';
import { RulesComponent } from './components/rules/rules.component';
import { ServicesComponent } from './components/services/services.component';
import { StaffComponent } from './components/staff/staff.component';
import { VipComponent } from './components/vip/vip.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:  HomeComponent},
  { path: 'management', component:  ManagementComponent},
  { path: 'staff', component:  StaffComponent},
  { path: 'dancers', component:  DancersComponent},
  { path: 'services', component:  ServicesComponent},
  { path: 'vip', component:  VipComponent},
  { path: 'bar-menu', component:  BarMenuComponent},
  { path: 'rules', component:  RulesComponent},
  { path: 'partners', component:  PartnersComponent},
  { path: 'discord', component:  DiscordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
