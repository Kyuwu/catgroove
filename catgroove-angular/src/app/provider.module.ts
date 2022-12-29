import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GALLERY_CONFIG } from 'ng-gallery';
import { AuthService } from './shared/services/auth.service';
import { FileuploadService } from './shared/services/fileupload.service';
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
  {
    provide: GALLERY_CONFIG,
    useValue: {
      dots: true,
      imageSize: 'cover'
    }
  },
  AuthService,
  DancerService,
  ManagementService,
  ServicesService,
  FileuploadService
];
