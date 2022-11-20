import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { VerifyComponent } from './components/admin/verify/verify.component';
import {
  BarMenuComponent
} from './components/bar-menu/bar-menu.component';
import {
  DancersComponent
} from './components/dancers/dancers.component';
import {
  DiscordComponent
} from './components/discord/discord.component';
import {
  HomeComponent
} from './components/home/home.component';
import {
  ManagementComponent
} from './components/management/management.component';
import {
  PartnersComponent
} from './components/partners/partners.component';
import {
  RulesComponent
} from './components/rules/rules.component';
import {
  ServicesComponent
} from './components/services/services.component';
import {
  StaffComponent
} from './components/staff/staff.component';
import {
  VipComponent
} from './components/vip/vip.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { routeIdx: 0 }
  },
  {
    path: 'management',
    component: ManagementComponent,
    data: { routeIdx: 1 }
  },
  {
    path: 'staff',
    component: StaffComponent,
    data: { routeIdx: 2 }
  },
  {
    path: 'dancers',
    component: DancersComponent,
    data: { routeIdx: 3 }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { routeIdx: 4 }
  },
  {
    path: 'vip',
    component: VipComponent,
    data: { routeIdx: 5 }
  },
  {
    path: 'bar-menu',
    component: BarMenuComponent,
    data: { routeIdx: 6 }
  },
  {
    path: 'rules',
    component: RulesComponent,
    data: { routeIdx: 7 }
  },
  {
    path: 'partners',
    component: PartnersComponent,
    data: { routeIdx: 8 }
  },
  {
    path: 'discord',
    component: DiscordComponent,
    data: { routeIdx: 9 }
  },
  {
    path: 'admin/register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/verify',
    component: VerifyComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
