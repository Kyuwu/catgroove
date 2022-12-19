import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { DancerService } from './shared/services/firebase/dancer.service';
import { ManagementService } from './shared/services/firebase/management.service';
import { ServicesService } from './shared/services/firebase/services.service';
import { InterceptorService } from './shared/services/spinner/interceptor.service';

export const Providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  },
  AuthService,
  DancerService,
  ManagementService,
  ServicesService
];
